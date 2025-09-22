import { Link } from "react-router-dom";
import Avatar from "../common/Avatar";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import useAuthStore from "../../store/authStore";
import { FiEdit2, FiMoreVertical, FiTrash } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import usePostStore from "../../store/postStore";
import CreatePost from "./CreatePost";

const PostCard = ({ post }) => {
  const { user } = useAuthStore();
  const { deletePost } = usePostStore();

  const menuRef = useRef(null);

  const isOwner = post.user.id == user.id;

  const [showMenu, setShowMenu] = useState(false);
  const [showUpdatePost, setShowUpdatePost] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(post.id);
      } catch (err) {
        alert("Failed to delete post. Please try again.");
      } finally {
        setShowMenu(false);
      }
    }
  };

  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutSide);
      return () => {
        document.removeEventListener("mousedown", handleClickOutSide);
      };
    }
  }, [showMenu]);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between p-4">
          <Link
            to={`/profile/${post.user.username}`}
            className="flex items-center space-x-3"
          >
            <Avatar user={post.user} size="medium" />
            <div>
              <p className="font-semibold text-sm">{post.user.username}</p>
            </div>
          </Link>

          {isOwner && (
            <div className="relative" ref={menuRef}>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setShowMenu(!showMenu)}
              >
                <FiMoreVertical size={20} />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-full mt-1 w-24 bg-white shadow-lg z-50 py-0.5 border border-gray-200">
                  <button
                    className="flex items-center space-x-1 px-2 py-1 hover:bg-gray-50 w-full text-left transition-colors text-sm"
                    onClick={() => setShowUpdatePost(true)}
                  >
                    <FiEdit2 size={14} />
                    <span>Edit</span>
                  </button>
                  <button
                    className="flex items-center space-x-1 px-2 py-1 hover:bg-red-50 text-red-600 w-full text-left transition-colors text-sm"
                    onClick={handleDelete}
                  >
                    <FiTrash size={14} />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="px-4 pb-2 pt-3">
          <p className="text-sm whitespace-pre-wrap break-words">
            {post.content}
          </p>
        </div>

        <div className="px-4 pb-3 pt-2">
          <p className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
              locale: ko,
            })}
          </p>
        </div>
      </div>
      {showUpdatePost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <CreatePost post={post} onClose={() => setShowUpdatePost(false)} />
        </div>
      )}
    </>
  );
};

export default PostCard;
