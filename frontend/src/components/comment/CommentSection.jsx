import CommentForm from "./CommentForm";

const CommentSection = ({ post }) => {
  return (
    <div className="mt-4">
      <CommentForm postId={post.id} />
    </div>
  );
};

export default CommentSection;
