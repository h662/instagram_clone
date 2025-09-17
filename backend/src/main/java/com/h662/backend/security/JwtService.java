package com.h662.backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    @Value("${JWT_SECRET}")
    private String secretKey;
}
