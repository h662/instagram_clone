package com.h662.backend.dto;

import com.h662.backend.entity.Comment;
import com.h662.backend.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponse {
    private Long id;
    private String content;
    private UserDto user;
    private LocalDateTime createdAt;

    public static CommentResponse fromEntity(Comment comment) {
        return CommentResponse.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .user(UserDto.fromEntity(comment.getUser()))
                .createdAt(comment.getCreatedAt())
                .build();
    }
}
