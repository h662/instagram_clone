package com.h662.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthRequest {
    private String username;
    private String email;

    @NotBlank(message = "Password is required")
    private String password;
}
