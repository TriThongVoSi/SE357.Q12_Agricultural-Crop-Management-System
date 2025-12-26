package org.example.QuanLyMuaVu.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.StringJoiner;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import org.example.QuanLyMuaVu.DTO.Request.AuthenticationRequest;
import org.example.QuanLyMuaVu.DTO.Request.IntrospectRequest;
import org.example.QuanLyMuaVu.DTO.Request.LogoutRequest;
import org.example.QuanLyMuaVu.DTO.Request.RefreshRequest;
import org.example.QuanLyMuaVu.DTO.Response.AuthenticationResponse;
import org.example.QuanLyMuaVu.DTO.Response.IntrospectResponse;
import org.example.QuanLyMuaVu.Entity.InvalidatedToken;
import org.example.QuanLyMuaVu.Entity.Role;
import org.example.QuanLyMuaVu.Entity.User;
import org.example.QuanLyMuaVu.Enums.UserStatus;
import org.example.QuanLyMuaVu.Exception.AppException;
import org.example.QuanLyMuaVu.Exception.ErrorCode;
import org.example.QuanLyMuaVu.Repository.InvalidatedTokenRepository;
import org.example.QuanLyMuaVu.Repository.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;

/**
 * Authentication service handling login, logout, token refresh, and
 * introspection.
 * Implements the auth flow as per Feature 0.1 specification:
 * - Accept identifier as either username or email
 * - Verify BCrypt password hash
 * - Check user status == ACTIVE
 * - Load role from user_roles (prefer ADMIN over FARMER if multiple)
 * - Return JWT with userId, role, jti, exp
 */
@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    UserRepository userRepository;
    InvalidatedTokenRepository invalidatedTokenRepository;
    PasswordEncoder passwordEncoder;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    @NonFinal
    @Value("${jwt.valid-duration}")
    protected long VALID_DURATION;

    @NonFinal
    @Value("${jwt.refreshable-duration}")
    protected long REFRESHABLE_DURATION;

    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        var token = request.getToken();
        log.debug("Introspecting token: {}", token.substring(0, Math.min(20, token.length())) + "...");

        boolean isValid = true;

        try {
            verifyToken(token, false);
            log.debug("Token introspection successful - token is valid");
        } catch (AppException e) {
            log.warn("Token introspection failed: {}", e.getMessage());
            isValid = false;
        }

        return IntrospectResponse.builder().valid(isValid).build();
    }

    /**
     * Authenticate user by identifier (email OR username) and password.
     * 
     * Business flow:
     * 1. Accept identifier as either username or email
     * 2. Verify password using BCrypt
     * 3. Check user status == ACTIVE (error 403 USER_LOCKED if not)
     * 4. Load role from user_roles (error 403 ROLE_MISSING if none)
     * 5. If multiple roles, prefer ADMIN over FARMER (or first role)
     * 6. Return JWT + profile + redirectTo
     * 
     * @param request contains identifier/email, password, and optional rememberMe
     *                flag
     * @return AuthenticationResponse with JWT token, profile, and redirect info
     * @throws AppException with IDENTIFIER_REQUIRED if no identifier provided
     * @throws AppException with INVALID_CREDENTIALS (401) if user not found or
     *                      password wrong
     * @throws AppException with USER_LOCKED (403) if user account is not active
     * @throws AppException with ROLE_MISSING (403) if user has no assigned roles
     */
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        // 1. Get effective identifier (supports both 'identifier' and 'email' fields)
        String identifier = request.getEffectiveIdentifier();
        if (identifier == null || identifier.isBlank()) {
            log.warn("Authentication failed - no identifier provided");
            throw new AppException(ErrorCode.IDENTIFIER_REQUIRED);
        }

        log.info("Authentication attempt for identifier: {}", identifier);

        // 2. Find user by identifier (username OR email) with roles eagerly loaded
        User user = userRepository
                .findByIdentifierWithRoles(identifier)
                .orElseThrow(() -> {
                    log.warn("Authentication failed - identifier not found: {}", identifier);
                    return new AppException(ErrorCode.INVALID_CREDENTIALS);
                });

        // 3. Verify password using BCrypt
        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if (!authenticated) {
            log.warn("Authentication failed - invalid password for identifier: {}", identifier);
            throw new AppException(ErrorCode.INVALID_CREDENTIALS);
        }

        // 4. Check user status - must be ACTIVE (per spec: status != ACTIVE -> 403
        // USER_LOCKED)
        if (user.getStatus() != UserStatus.ACTIVE) {
            log.warn("Authentication failed - user not active. Identifier: {}, Status: {}",
                    identifier, user.getStatus());
            throw new AppException(ErrorCode.USER_LOCKED);
        }

        // 5. Check roles - must have at least one role (per spec: no role -> 403
        // ROLE_MISSING)
        if (CollectionUtils.isEmpty(user.getRoles())) {
            log.warn("Authentication failed - no roles assigned to user: {}", identifier);
            throw new AppException(ErrorCode.ROLE_MISSING);
        }

        // 6. Determine primary role (prefer ADMIN over FARMER, or first role)
        String primaryRole = determinePrimaryRole(user);

        // 7. Generate JWT token with required claims
        var token = generateToken(user, primaryRole);
        log.info("Authentication successful for identifier: {} - token generated, role: {}",
                identifier, primaryRole);

        // 8. Build profile info
        AuthenticationResponse.ProfileInfo profile = AuthenticationResponse.ProfileInfo.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .provinceId(user.getProvince() != null ? user.getProvince().getId() : null)
                .wardId(user.getWard() != null ? user.getWard().getId() : null)
                .build();

        // 9. Determine redirect path based on role
        String redirectTo = determineRedirectPath(primaryRole);

        // 10. Build and return response
        return AuthenticationResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .expiresIn(VALID_DURATION)
                .userId(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .roles(user.getRoles().stream().map(Role::getCode).toList())
                .role(primaryRole)
                .profile(profile)
                .redirectTo(redirectTo)
                .build();
    }

    /**
     * Get current user info (for /api/v1/auth/me endpoint).
     * Reads user info from the current security context JWT.
     * 
     * @return AuthenticationResponse with user profile and role info (no token)
     * @throws AppException with UNAUTHENTICATED if no valid session
     */
    public AuthenticationResponse getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        // Get user ID from JWT claims
        Long userId = getCurrentUserId();
        if (userId == null) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        // Reload with roles
        user = userRepository.findByIdentifierWithRoles(user.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        String primaryRole = determinePrimaryRole(user);

        AuthenticationResponse.ProfileInfo profile = AuthenticationResponse.ProfileInfo.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .provinceId(user.getProvince() != null ? user.getProvince().getId() : null)
                .wardId(user.getWard() != null ? user.getWard().getId() : null)
                .build();

        return AuthenticationResponse.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .roles(user.getRoles().stream().map(Role::getCode).toList())
                .role(primaryRole)
                .profile(profile)
                .redirectTo(determineRedirectPath(primaryRole))
                .build();
    }

    /**
     * Get the current authenticated user's ID from JWT claims.
     * 
     * @return user ID or null if not authenticated
     */
    public Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof Jwt jwt) {
            Object userIdClaim = jwt.getClaim("user_id");
            if (userIdClaim instanceof Number num) {
                return num.longValue();
            }
            if (userIdClaim instanceof String str) {
                try {
                    return Long.parseLong(str);
                } catch (NumberFormatException e) {
                    log.warn("Cannot parse user_id from JWT: {}", str);
                }
            }
        }
        return null;
    }

    /**
     * Get the current authenticated user's primary role from JWT claims.
     * 
     * @return role code (e.g., "ADMIN", "FARMER") or null if not authenticated
     */
    public String getCurrentRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof Jwt jwt) {
            Object roleClaim = jwt.getClaim("role");
            if (roleClaim instanceof String role) {
                return role;
            }
        }
        return null;
    }

    /**
     * Determine primary role for a user.
     * Business rule: prefer ADMIN over FARMER, otherwise take first role.
     * 
     * @param user the user to get primary role for
     * @return role code (e.g., "ADMIN", "FARMER")
     */
    private String determinePrimaryRole(User user) {
        List<String> roleCodes = user.getRoles().stream()
                .map(Role::getCode)
                .toList();

        // Prefer ADMIN over FARMER (business rule)
        if (roleCodes.contains("ADMIN")) {
            return "ADMIN";
        }
        if (roleCodes.contains("FARMER")) {
            return "FARMER";
        }
        // Fall back to first role
        return roleCodes.isEmpty() ? null : roleCodes.get(0);
    }

    /**
     * Determine redirect path based on role.
     * 
     * @param role the user's primary role
     * @return redirect path ("/admin" or "/farmer")
     */
    private String determineRedirectPath(String role) {
        if ("ADMIN".equalsIgnoreCase(role)) {
            return "/admin";
        }
        if ("FARMER".equalsIgnoreCase(role)) {
            return "/farmer";
        }
        return "/"; // Default fallback
    }

    public void logout(LogoutRequest request) throws ParseException, JOSEException {
        log.info("Logout attempt for token: {}",
                request.getToken().substring(0, Math.min(20, request.getToken().length())) + "...");

        try {
            var signToken = verifyToken(request.getToken(), true);

            String jit = signToken.getJWTClaimsSet().getJWTID();
            Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();

            InvalidatedToken invalidatedToken = InvalidatedToken.builder().id(jit).expiryTime(expiryTime).build();

            invalidatedTokenRepository.save(invalidatedToken);
            log.info("Token invalidated successfully - JIT: {}", jit);
        } catch (AppException exception) {
            log.info("Logout - Token already expired or invalid");
        }
    }

    public AuthenticationResponse refreshToken(RefreshRequest request) throws ParseException, JOSEException {
        log.info("Token refresh attempt");

        var signedJWT = verifyToken(request.getToken(), true);

        var jit = signedJWT.getJWTClaimsSet().getJWTID();
        var expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        InvalidatedToken invalidatedToken = InvalidatedToken.builder().id(jit).expiryTime(expiryTime).build();

        invalidatedTokenRepository.save(invalidatedToken);
        log.debug("Old token invalidated - JIT: {}", jit);

        // Get email from token claims
        var email = signedJWT.getJWTClaimsSet().getClaim("email");
        String identifier = email != null ? email.toString() : signedJWT.getJWTClaimsSet().getSubject();
        log.debug("Refreshing token for identifier: {}", identifier);

        var user = userRepository.findByIdentifierWithRoles(identifier)
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));

        String primaryRole = determinePrimaryRole(user);
        var token = generateToken(user, primaryRole);
        log.info("Token refreshed successfully for identifier: {}", identifier);

        AuthenticationResponse.ProfileInfo profile = AuthenticationResponse.ProfileInfo.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .provinceId(user.getProvince() != null ? user.getProvince().getId() : null)
                .wardId(user.getWard() != null ? user.getWard().getId() : null)
                .build();

        return AuthenticationResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .expiresIn(VALID_DURATION)
                .userId(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .roles(user.getRoles().stream().map(Role::getCode).toList())
                .role(primaryRole)
                .profile(profile)
                .redirectTo(determineRedirectPath(primaryRole))
                .build();
    }

    /**
     * Generate JWT token with required claims.
     * Claims include: sub (userId), role, user_id, email, username, scope, jti, exp
     */
    private String generateToken(User user, String primaryRole) {
        log.debug("Generating JWT token for user: {}", user.getEmail());

        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(String.valueOf(user.getId())) // Use userId as subject per spec
                .issuer("QuanLyMuaVu")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli()))
                .jwtID(UUID.randomUUID().toString()) // jti for invalidation support
                .claim("user_id", user.getId())
                .claim("username", user.getUsername())
                .claim("email", user.getEmail())
                .claim("role", primaryRole) // Primary role claim
                .claim("scope", buildScope(user))
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            String token = jwsObject.serialize();
            log.debug("JWT token generated successfully for email: {} - expires in {} seconds",
                    user.getEmail(), VALID_DURATION);
            return token;
        } catch (JOSEException e) {
            log.error("Cannot create token for user: {}", user.getEmail(), e);
            throw new RuntimeException(e);
        }
    }

    private SignedJWT verifyToken(String token, boolean isRefresh) throws JOSEException, ParseException {
        log.debug("Verifying token - isRefresh: {}", isRefresh);

        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = (isRefresh)
                ? new Date(signedJWT
                        .getJWTClaimsSet()
                        .getIssueTime()
                        .toInstant()
                        .plus(REFRESHABLE_DURATION, ChronoUnit.SECONDS)
                        .toEpochMilli())
                : signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);

        if (!(verified && expiryTime.after(new Date()))) {
            log.warn("Token verification failed - verified: {}, expired: {}", verified, expiryTime.before(new Date()));
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        if (invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID())) {
            log.warn("Token is invalidated - JIT: {}", signedJWT.getJWTClaimsSet().getJWTID());
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        log.debug("Token verification successful");
        return signedJWT;
    }

    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");

        if (!CollectionUtils.isEmpty(user.getRoles()))
            user.getRoles().forEach(role -> {
                stringJoiner.add("ROLE_" + role.getCode());
            });

        return stringJoiner.toString();
    }
}
