import axios from "axios";
import { useEffect, useState } from "react";

const BookmarkCard = ({ bookmarkedPost }) => {
  const [imageUrl, setImageUrl] = useState("");

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
            bookmarkedPost.imageUrl
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

    if (!bookmarkedPost.imageUrl) return;

    getImage();
  }, [bookmarkedPost]);

  return (
    <div className="aspect-square bg-gray-100 cursor-pointer hover:opacity-80">
      {imageUrl ? (
        <img src={imageUrl} alt="Post" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center p-2">
          <p className="text-xs text-gray-600 text-center line-clamp-3">
            {bookmarkedPost.content}
          </p>
        </div>
      )}
    </div>
  );
};

export default BookmarkCard;
