package com.h662.backend.service;

import com.h662.backend.dto.PostResponse;
import com.h662.backend.entity.Bookmark;
import com.h662.backend.entity.Post;
import com.h662.backend.entity.User;
import com.h662.backend.exception.ResourceNotFoundException;
import com.h662.backend.repository.BookmarkRepository;
import com.h662.backend.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.print.Book;

@Service
@RequiredArgsConstructor
@Transactional
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final PostRepository postRepository;
    private final AuthenticationService authenticationService;

    public boolean toggleBookmark(Long postId) {
        User currentUser = authenticationService.getCurrentUser();
        Post post = postRepository.findByIdAndNotDeleted(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found"));

        boolean alreadyBookmarked = bookmarkRepository.existsByUserAndPost(currentUser, post);

        if (alreadyBookmarked) {
            bookmarkRepository.deleteByUserAndPost(currentUser, post);
            return false;
        } else {
            Bookmark bookmark = Bookmark.builder()
                    .user(currentUser)
                    .post(post)
                    .build();
            bookmarkRepository.save(bookmark);
            return true;
        }
    }

    @Transactional(readOnly = true)
    public boolean isBookmarked(Long postId) {
        User currentUser = authenticationService.getCurrentUser();
        Post post = postRepository.findByIdAndNotDeleted(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found"));

        return bookmarkRepository.existsByUserAndPost(currentUser, post);
    }

    @Transactional(readOnly = true)
    public Page<PostResponse> getBookmarkedPosts(Pageable pageable) {
        User currentUser = authenticationService.getCurrentUser();
        Page<Post> bookmarkedPosts = bookmarkRepository.findBookmarkedPostsByUser(currentUser, pageable);

        return bookmarkedPosts.map(PostResponse::fromEntity);
    }
}
