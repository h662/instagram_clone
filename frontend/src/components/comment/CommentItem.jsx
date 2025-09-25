import Avatar from "../common/Avatar";

const CommentItem = ({ comment, error }) => {
  return (
    <div className="flex space-x-3 py-2">
      <Avatar user={comment.user} size="small" />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-sm">
                {comment.user.username}
              </span>
              <span className="text-sm break-words">{comment.content}</span>
            </div>
          </div>
        </div>

        {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
      </div>
    </div>
  );
};

export default CommentItem;
