package org.example.QuanLyMuaVu.DTO.Response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ExpenseResponse {
    Integer id;
    Integer seasonId;
    String userName;
    String seasonName;
    String itemName;
    BigDecimal unitPrice;
    Integer quantity;
    BigDecimal totalCost;
    LocalDate expenseDate;
    LocalDateTime createdAt;
}
