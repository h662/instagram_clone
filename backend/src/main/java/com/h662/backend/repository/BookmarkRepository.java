package com.h662.backend.repository;

import com.h662.backend.entity.Bookmark;
import com.h662.backend.entity.Post;
import com.h662.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    boolean existsByUserAndPost(User user, Post post);

    @Query("SELECT b.post FROM Bookmark b WHERE b.user = :user ORDER BY b.createdAt DESC")
    Page<Post> findBookmarkedPostsByUser(@Param("user") User user, Pageable pageable);

    void deleteByUserAndPost(User user, Post post);
}
