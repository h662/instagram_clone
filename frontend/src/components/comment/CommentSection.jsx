import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const CommentSection = ({ post, commentCount, setCommentCount }) => {
  const [comments, setComments] = useState([]);

  return (
    <div className="mt-4">
      <CommentForm
        postId={post.id}
        commentCount={commentCount}
        setCommentCount={setCommentCount}
      />

      <CommentList
        postId={post.id}
        comments={comments}
        setComments={setComments}
      />
    </div>
  );
};

export default CommentSection;
