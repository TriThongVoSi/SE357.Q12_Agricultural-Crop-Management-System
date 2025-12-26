package org.example.QuanLyMuaVu.Controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.example.QuanLyMuaVu.DTO.Common.ApiResponse;
import org.example.QuanLyMuaVu.DTO.Response.UserSummaryReportResponse;
import org.example.QuanLyMuaVu.Service.AdminUserReportService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/reports/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserReportController {

    AdminUserReportService adminUserReportService;

    @Operation(
            summary = "Get user account summary",
            description = "Returns total number of user accounts, number of active accounts, and number of locked accounts."
    )
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Summary retrieved successfully"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "401", description = "Unauthorized"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Forbidden")
    })
    @GetMapping("/summary")
    public ApiResponse<UserSummaryReportResponse> getUserSummaryReport() {
        UserSummaryReportResponse result = adminUserReportService.getUserSummary();
        // TODO: externalize "USER_REPORT_SUMMARY_SUCCESS" into a centralized message code if needed.
        return ApiResponse.success("USER_REPORT_SUMMARY_SUCCESS", result);
    }
}
