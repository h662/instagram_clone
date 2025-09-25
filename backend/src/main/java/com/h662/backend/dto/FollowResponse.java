package com.h662.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FollowResponse {

    private boolean isFollowing;

    private Long followersCount;

    private Long followingCount;
}
