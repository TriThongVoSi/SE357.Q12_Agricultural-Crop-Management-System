package org.example.QuanLyMuaVu.Service;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.QuanLyMuaVu.Constant.PredefinedRole;
import org.example.QuanLyMuaVu.DTO.Common.PageResponse;
import org.example.QuanLyMuaVu.DTO.Request.FarmerCreationRequest;
import org.example.QuanLyMuaVu.DTO.Request.FarmerUpdateRequest;
import org.example.QuanLyMuaVu.DTO.Request.FarmerUpdateRolesRequest;
import org.example.QuanLyMuaVu.DTO.Request.ResetPasswordRequest;
import org.example.QuanLyMuaVu.DTO.Request.SignUpRequest;
import org.example.QuanLyMuaVu.DTO.Request.UserProfileUpdateRequest;
import org.example.QuanLyMuaVu.DTO.Request.UserStatusUpdateRequest;
import org.example.QuanLyMuaVu.DTO.Response.FarmerResponse;
import org.example.QuanLyMuaVu.Entity.Role;
import org.example.QuanLyMuaVu.Entity.User;
import org.example.QuanLyMuaVu.Enums.UserStatus;
import org.example.QuanLyMuaVu.Exception.AppException;
import org.example.QuanLyMuaVu.Exception.ErrorCode;
import org.example.QuanLyMuaVu.Mapper.FarmerMapper;
import org.example.QuanLyMuaVu.Repository.RoleRepository;
import org.example.QuanLyMuaVu.Repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserService {
	UserRepository userRepository;
	RoleRepository roleRepository;
	FarmerMapper farmerMapper;
	PasswordEncoder passwordEncoder;

    public FarmerResponse createFarmer(FarmerCreationRequest request) {
        User user = farmerMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        if (user.getEmail() == null && request.getUsername() != null && request.getUsername().contains("@")) {
            user.setEmail(request.getUsername().trim());
        }

        HashSet<Role> roles = new HashSet<>();
        roleRepository.findByCode(PredefinedRole.FARMER_ROLE).ifPresent(roles::add);

        if (roles.isEmpty()) {
            throw new AppException(ErrorCode.RESOURCE_NOT_FOUND);
        }

        user.setRoles(roles);
        user.setStatus(UserStatus.ACTIVE);

        try {
            user = userRepository.save(user);
        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        return farmerMapper.toFarmerResponse(user);
    }

    public FarmerResponse createBuyer(FarmerCreationRequest request) {
        User user = farmerMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        if (user.getEmail() == null && request.getUsername() != null && request.getUsername().contains("@")) {
            user.setEmail(request.getUsername().trim());
        }

        HashSet<Role> roles = new HashSet<>();
        roleRepository.findByCode(PredefinedRole.BUYER_ROLE).ifPresent(roles::add);

        if (roles.isEmpty()) {
            throw new AppException(ErrorCode.RESOURCE_NOT_FOUND);
        }

        user.setRoles(roles);
        user.setStatus(UserStatus.ACTIVE);

        try {
            user = userRepository.save(user);
        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        return farmerMapper.toFarmerResponse(user);
    }

    public FarmerResponse signUp(SignUpRequest request) {
        String effectiveUsername = request.getEffectiveUsername();
        if (effectiveUsername == null || effectiveUsername.isBlank()) {
            throw new AppException(ErrorCode.USERNAME_BLANK);
        }

        FarmerCreationRequest creationRequest = FarmerCreationRequest.builder()
                .username(effectiveUsername)
                .password(request.getPassword())
                .build();

        User user = farmerMapper.toUser(creationRequest);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        String email = request.getEmail();
        if (email == null || email.isBlank()) {
            email = effectiveUsername.contains("@") ? effectiveUsername : null;
        }
        if (email != null && !email.isBlank()) {
            user.setEmail(email.trim());
        }

        String fullName = request.getFullName();
        if (fullName != null && !fullName.isBlank()) {
            user.setFullName(fullName.trim());
        }

        String phone = request.getPhone();
        if (phone != null && !phone.isBlank()) {
            user.setPhone(phone.trim());
        }

        HashSet<Role> roles = new HashSet<>();

        String roleCode = request.getRole() != null
                ? request.getRole().trim().toUpperCase()
                : PredefinedRole.FARMER_ROLE;
        if (PredefinedRole.BUYER_ROLE.equals(roleCode)) {
            roleRepository.findByCode(PredefinedRole.BUYER_ROLE).ifPresent(roles::add);
        } else {
            roleRepository.findByCode(PredefinedRole.FARMER_ROLE).ifPresent(roles::add);
        }

        if (roles.isEmpty()) {
            throw new AppException(ErrorCode.RESOURCE_NOT_FOUND);
        }

        user.setRoles(roles);
        user.setStatus(UserStatus.ACTIVE);

        try {
            user = userRepository.save(user);
        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        return farmerMapper.toFarmerResponse(user);
    }

    public FarmerResponse getMyInfo() {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        User user = userRepository.findByUsername(name).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        return farmerMapper.toFarmerResponse(user);
    }

    public FarmerResponse updateProfile(UserProfileUpdateRequest request) {
        var context = SecurityContextHolder.getContext();
        String currentUsername = context.getAuthentication().getName();

        User user = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        if (request.getUsername() != null && !request.getUsername().isBlank()
                && !request.getUsername().equals(user.getUsername())) {
            if (userRepository.existsByUsername(request.getUsername())) {
                throw new AppException(ErrorCode.USERNAME_ALREADY_EXISTS);
            }
            user.setUsername(request.getUsername());
        }

        return farmerMapper.toFarmerResponse(userRepository.save(user));
    }

    public FarmerResponse changeMyPassword(FarmerUpdateRequest request) {
        var context = SecurityContextHolder.getContext();
        String currentUsername = context.getAuthentication().getName();

        User user = userRepository.findByUsername(currentUsername)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        if (request.getPassword() == null || request.getPassword().length() < 8) {
            throw new AppException(ErrorCode.PASSWORD_INVALID);
        }

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        return farmerMapper.toFarmerResponse(userRepository.save(user));
    }

    public FarmerResponse updatePassword(Long farmerId, FarmerUpdateRequest request) {
        User user = userRepository.findById(farmerId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        if (request.getPassword() == null || request.getPassword().length() < 8) {
            throw new AppException(ErrorCode.PASSWORD_INVALID);
        }

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        return farmerMapper.toFarmerResponse(userRepository.save(user));
    }

    public FarmerResponse updateRoles(Long farmerId, FarmerUpdateRolesRequest request) {
        User user = userRepository.findById(farmerId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        if (request == null || request.getRoles() == null || request.getRoles().isEmpty()) {
            throw new AppException(ErrorCode.BAD_REQUEST);
        }

        List<String> normalizedRoles = request.getRoles().stream()
                .filter(role -> role != null && !role.isBlank())
                .map(role -> role.trim().toUpperCase())
                .distinct()
                .toList();

        if (normalizedRoles.isEmpty()) {
            throw new AppException(ErrorCode.BAD_REQUEST);
        }

        var roles = roleRepository.findByCodeIn(normalizedRoles);
        if (roles.size() != normalizedRoles.size()) {
            throw new AppException(ErrorCode.RESOURCE_NOT_FOUND);
        }

        user.setRoles(new HashSet<>(roles));

        return farmerMapper.toFarmerResponse(userRepository.save(user));
    }

    public void deleteFarmer(Long farmerId) {
        if (!userRepository.existsById(farmerId)) {
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }
        userRepository.deleteById(farmerId);
    }

    public List<FarmerResponse> getFarmers() {
        log.info("In method get Farmers");
        return userRepository.findAllByRoles_Code(PredefinedRole.FARMER_ROLE)
                .stream()
                .map(farmerMapper::toFarmerResponse)
                .toList();
    }

    public List<FarmerResponse> getBuyers() {
        log.info("In method get Buyers");
        return userRepository.findAllByRoles_Code(PredefinedRole.BUYER_ROLE)
                .stream()
                .map(farmerMapper::toFarmerResponse)
                .toList();
    }

    public FarmerResponse getFarmer(Long id) {
        return farmerMapper.toFarmerResponse(
                userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND)));
    }

    public void resetPassword(ResetPasswordRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        if (request.getNewPassword() == null || request.getNewPassword().length() < 8) {
            throw new AppException(ErrorCode.PASSWORD_INVALID);
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    public PageResponse<FarmerResponse> searchFarmers(String keyword, String status, int page, int size) {
        return searchUsersByRole(PredefinedRole.FARMER_ROLE, keyword, status, page, size);
    }

    public PageResponse<FarmerResponse> searchBuyers(String keyword, String status, int page, int size) {
        return searchUsersByRole(PredefinedRole.BUYER_ROLE, keyword, status, page, size);
    }

    public FarmerResponse adminUpdateUserProfile(Long userId, UserProfileUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        if (request.getUsername() != null && !request.getUsername().isBlank()
                && !request.getUsername().equals(user.getUsername())) {
            if (userRepository.existsByUsername(request.getUsername())) {
                throw new AppException(ErrorCode.USERNAME_ALREADY_EXISTS);
            }
            user.setUsername(request.getUsername());
        }

        return farmerMapper.toFarmerResponse(userRepository.save(user));
    }

    public FarmerResponse updateUserStatus(Long userId, UserStatusUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        UserStatus newStatus;
        try {
            newStatus = UserStatus.fromCode(request.getStatus());
        } catch (IllegalArgumentException ex) {
            throw new AppException(ErrorCode.BAD_REQUEST);
        }

        user.setStatus(newStatus);
        return farmerMapper.toFarmerResponse(userRepository.save(user));
    }

    private PageResponse<FarmerResponse> searchUsersByRole(
            String roleCode,
            String keyword,
            String status,
            int page,
            int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

        String searchKeyword = keyword != null ? keyword.trim() : "";
        boolean hasKeyword = !searchKeyword.isEmpty();

        UserStatus userStatus = null;
        if (status != null && !status.isBlank()) {
            try {
                userStatus = UserStatus.fromCode(status);
            } catch (IllegalArgumentException ex) {
                throw new AppException(ErrorCode.BAD_REQUEST);
            }
        }

        Page<User> pageData;
        if (userStatus != null && hasKeyword) {
            pageData = userRepository.findAllByRoles_CodeAndStatusAndUsernameContainingIgnoreCase(
                    roleCode, userStatus, searchKeyword, pageable);
        } else if (userStatus != null) {
            pageData = userRepository.findAllByRoles_CodeAndStatus(roleCode, userStatus, pageable);
        } else if (hasKeyword) {
            pageData = userRepository.findAllByRoles_CodeAndUsernameContainingIgnoreCase(
                    roleCode, searchKeyword, pageable);
        } else {
            pageData = userRepository.findAllByRoles_Code(roleCode, pageable);
        }

        List<FarmerResponse> items = pageData.getContent()
                .stream()
                .map(farmerMapper::toFarmerResponse)
                .toList();

        return PageResponse.of(pageData, items);
    }
}
