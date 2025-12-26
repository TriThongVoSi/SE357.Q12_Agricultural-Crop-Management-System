package org.example.QuanLyMuaVu.DTO.Request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.validator.constraints.URL;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DocumentRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must not exceed 255 characters")
    String title;

    @NotBlank(message = "URL is required")
    @Size(max = 1000, message = "URL must not exceed 1000 characters")
    @URL(message = "URL must be a valid URL format")
    String url;

    String description;

    @Size(max = 50, message = "Crop must not exceed 50 characters")
    String crop;

    @Size(max = 50, message = "Stage must not exceed 50 characters")
    String stage;

    @Size(max = 50, message = "Topic must not exceed 50 characters")
    String topic;

    Boolean isActive;

    Boolean isPublic;
}
