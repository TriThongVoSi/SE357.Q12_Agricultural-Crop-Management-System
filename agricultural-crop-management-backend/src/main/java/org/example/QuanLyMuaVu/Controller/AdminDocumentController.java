package org.example.QuanLyMuaVu.Controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.QuanLyMuaVu.DTO.Common.ApiResponse;
import org.example.QuanLyMuaVu.DTO.Request.DocumentRequest;
import org.example.QuanLyMuaVu.DTO.Response.DocumentResponse;
import org.example.QuanLyMuaVu.Service.DocumentService;
import org.example.QuanLyMuaVu.Util.CurrentUserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Admin endpoints for creating, updating and deleting global documents
 * and knowledge base content.
 */
@RestController
@RequestMapping("/api/v1/admin/documents")
@RequiredArgsConstructor
public class AdminDocumentController {
    private final DocumentService documentService;
    private final CurrentUserService currentUserService;

    /**
     * Create new document
     * POST /api/v1/admin/documents
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ApiResponse<DocumentResponse> create(@Valid @RequestBody DocumentRequest request) {
        Long adminUserId = currentUserService.getCurrentUserId();
        return ApiResponse.success(documentService.create(request, adminUserId));
    }

    /**
     * Update document
     * PUT /api/v1/admin/documents/{id}
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ApiResponse<DocumentResponse> update(@PathVariable Integer id, @Valid @RequestBody DocumentRequest request) {
        return ApiResponse.success(documentService.update(id, request));
    }

    /**
     * Delete document
     * DELETE /api/v1/admin/documents/{id}
     */
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Integer id) {
        documentService.delete(id);
        return ApiResponse.success(null);
    }

    /**
     * Toggle document active status
     * PATCH /api/v1/admin/documents/{id}/active
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/active")
    public ApiResponse<DocumentResponse> setActive(@PathVariable Integer id, @RequestBody Map<String, Boolean> body) {
        Boolean isActive = body.get("isActive");
        return ApiResponse.success(documentService.setActive(id, isActive));
    }
}
