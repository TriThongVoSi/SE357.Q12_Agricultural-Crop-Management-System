package org.example.QuanLyMuaVu.DTO.Request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateExpenseRequest {

    @NotBlank(message = "KEY_INVALID")
    @Size(max = 255, message = "KEY_INVALID")
    String itemName;

    @NotNull(message = "KEY_INVALID")
    @DecimalMin(value = "0.0", inclusive = false, message = "KEY_INVALID")
    BigDecimal unitPrice;

    @NotNull(message = "KEY_INVALID")
    @Min(value = 1, message = "KEY_INVALID")
    Integer quantity;

    @NotNull(message = "KEY_INVALID")
    LocalDate expenseDate;
}

