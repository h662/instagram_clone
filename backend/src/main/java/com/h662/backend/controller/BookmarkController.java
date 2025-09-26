package com.h662.backend.controller;

import com.h662.backend.dto.PostResponse;
import com.h662.backend.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookmarks")
@RequiredArgsConstructor
public class BookmarkController {
    private final BookmarkService bookmarkService;

    @PostMapping("/{postId}")
    public ResponseEntity<Boolean> toggleBookmark(@PathVariable Long postId) {
        boolean bookmarked = bookmarkService.toggleBookmark(postId);
        return ResponseEntity.ok(bookmarked);
    }

    @GetMapping("/{postId}/status")
    public ResponseEntity<Boolean> isBookmarked(@PathVariable Long postId) {
        return ResponseEntity.ok(bookmarkService.isBookmarked(postId));
    }

    @GetMapping
    public ResponseEntity<Page<PostResponse>> getBookmarkedPosts(
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
    ) {
        return ResponseEntity.ok(bookmarkService.getBookmarkedPosts(pageable));
    }
}
