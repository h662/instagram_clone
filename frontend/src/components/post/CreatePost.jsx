import { FiX } from "react-icons/fi";
import Avatar from "../common/Avatar";
import usePostStore from "../../store/postStore";
import { useState } from "react";

const CreatePost = ({ onClose }) => {
  const { createPost, loading, error } = usePostStore();

  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      return;
    }

    if (content.length > 2200) {
      return;
    }

    try {
      await createPost({
        content: content.trim(),
      });

      setContent("");
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Create New Post</h2>
        <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
          <FiX size={24} />
        </button>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex items-start space-x-3">
          <Avatar size="medium" />
          <div className="flex-1">
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="What's on yout mind?"
              rows="4"
              maxLength={2200}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {content.length}/2200
            </div>
          </div>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            disabled={loading || !content.trim()}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
