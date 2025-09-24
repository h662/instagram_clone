import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState([]);

  return (
    <div className="mt-4">
      <CommentForm postId={post.id} />

      <CommentList
        postId={post.id}
        comments={comments}
        setComments={setComments}
      />
    </div>
  );
};

export default CommentSection;
