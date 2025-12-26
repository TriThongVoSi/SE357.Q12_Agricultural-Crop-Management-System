package org.example.QuanLyMuaVu.Controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.QuanLyMuaVu.DTO.Common.ApiResponse;
import org.example.QuanLyMuaVu.DTO.Request.VarietyRequest;
import org.example.QuanLyMuaVu.DTO.Response.VarietyResponse;
import org.example.QuanLyMuaVu.Service.VarietyService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/varieties")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class VarietyController {

    VarietyService varietyService;

    @Operation(summary = "Create crop variety", description = "Create a new variety for a crop")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Success"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Bad request"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Forbidden")
    })
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ApiResponse<VarietyResponse> create(@Valid @RequestBody VarietyRequest request) {
        return ApiResponse.success(varietyService.create(request));
    }

    @Operation(summary = "Update crop variety", description = "Update an existing crop variety")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ApiResponse<VarietyResponse> update(
            @PathVariable Integer id,
            @Valid @RequestBody VarietyRequest request
    ) {
        return ApiResponse.success(varietyService.update(id, request));
    }

    @Operation(summary = "Delete crop variety", description = "Delete a crop variety by id")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Integer id) {
        varietyService.delete(id);
        return ApiResponse.success(null);
    }

    @Operation(summary = "Get crop variety", description = "Get a single crop variety by id")
    @PreAuthorize("hasAnyRole('ADMIN','FARMER')")
    @GetMapping("/{id}")
    public ApiResponse<VarietyResponse> get(@PathVariable Integer id) {
        return ApiResponse.success(varietyService.get(id));
    }

    @Operation(summary = "List varieties of crop", description = "List all varieties belonging to a crop")
    @PreAuthorize("hasAnyRole('ADMIN','FARMER')")
    @GetMapping("/by-crop/{cropId}")
    public ApiResponse<List<VarietyResponse>> listByCrop(@PathVariable Integer cropId) {
        return ApiResponse.success(varietyService.listByCrop(cropId));
    }
}

