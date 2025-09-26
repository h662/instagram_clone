import { Link } from "react-router-dom";
import Avatar from "../common/Avatar";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import useAuthStore from "../../store/authStore";
import {
  FiBookmark,
  FiEdit2,
  FiHeart,
  FiMessageCircle,
  FiMoreVertical,
  FiTrash,
} from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import usePostStore from "../../store/postStore";
import CreatePost from "./CreatePost";
import axios from "axios";
import useLikeStore from "../../store/likeStore";
import CommentSection from "../comment/CommentSection";
import useBookmarkStore from "../../store/bookmarkStore";

const PostCard = ({ post }) => {
  const { user } = useAuthStore();
  const { deletePost } = usePostStore();
  const { toggleLike } = useLikeStore();
  const { toggleBookmark, getIsBookmarked } = useBookmarkStore();

  const menuRef = useRef(null);

  const [isBookmarked, setIsBookmarked] = useState(false);

  const isOwner = post.user.id == user.id;

  const [showMenu, setShowMenu] = useState(false);
  const [showUpdatePost, setShowUpdatePost] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isLiked, setIsLiked] = useState(post?.liked);
  const [likeCount, setLikeCount] = useState(post?.likeCount);
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(post?.commentCount);

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

  const handleLike = async () => {
    try {
      const response = await toggleLike(post.id);

      setIsLiked(response.isLiked);
      setLikeCount(response.likeCount);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBookmark = async () => {
    try {
      setIsBookmarked(await toggleBookmark(post.id));
    } catch (err) {}
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

  useEffect(() => {
    const getImage = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token || token === "undefined" || token === "null") {
          throw new Error(
            "No valid authenication token found. Please login again."
          );
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/posts/image?url=${
            post.imageUrl
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setImageUrl(response.data.imageUrl);
      } catch (err) {
        console.error(err);
      }
    };

    if (!post.imageUrl) return;

    getImage();
  }, [post]);

  useEffect(() => {
    const loadIsBookmarked = async () => {
      try {
        if (!post) return;

        setIsBookmarked(await getIsBookmarked(post.id));
      } catch (err) {
        console.error(err);
      }
    };
    loadIsBookmarked();
  }, [post, getIsBookmarked]);

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

        {imageUrl && (
          <div className="w-full overflow-hidden">
            <img
              src={imageUrl}
              alt="Post"
              className="w-ful aspect-square object-cover"
            />
          </div>
        )}

        <div className="px-4 pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className={`flex items-center space-x-1 transition-all duration-200 ${
                  isLiked
                    ? "text-red-500"
                    : "text-gray-700/50 hover:text-red-500"
                }`}
                onClick={handleLike}
              >
                <FiHeart
                  size={20}
                  className={`transition-all duration-200 ${
                    isLiked && "fill-current"
                  }`}
                />
                <span className="text-sm font-medium">{likeCount}</span>
              </button>

              <button
                className="flex items-center space-x-1 transition-colors text-gray-700/50 hover:text-blue-500"
                onClick={() => setShowComments(!showComments)}
              >
                <FiMessageCircle size={20} />
                <span className="text-sm font-medium">{commentCount}</span>
              </button>
            </div>

            <button
              className={`transition-all duration-200 ${
                isBookmarked
                  ? "text-gray-900"
                  : "text-gray-700 hover:text-gray-900"
              }`}
              onClick={handleBookmark}
            >
              <FiBookmark
                size={20}
                className={`transition-all duration-200 ${
                  isBookmarked ? "fill-current" : ""
                }`}
              />
            </button>
          </div>
        </div>

        <div className="px-4 pb-2 pt-3">
          <p className="text-sm whitespace-pre-wrap break-words">
            {post.content}
          </p>
        </div>

        {showComments && (
          <div className="px-4">
            <CommentSection
              post={post}
              commentCount={commentCount}
              setCommentCount={setCommentCount}
            />
          </div>
        )}

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
