import { useEffect } from "react";
import useFollowStore from "../../store/followStore";

const FollowButton = ({ user }) => {
  const { getFollowStatus, toggleFollow, getFollowStatusByUserId } =
    useFollowStore();

  const followStatus = getFollowStatusByUserId(user?.id);

  const handleFollow = async () => {
    try {
      if (!user) return;

      await toggleFollow(user.id);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadFollowStatus = async () => {
      try {
        if (!user) return;

        await getFollowStatus(user.id);
      } catch (err) {
        console.error(err);
      }
    };
    loadFollowStatus();
  }, [user, getFollowStatus]);

  useEffect(() => console.log(followStatus), [followStatus]);

  return (
    <button
      className={`px-4 py-1 border border-gray-300 rounded-md text-sm font-medium transition-colors duration-200 
                      ${
                        followStatus?.isFollowing
                          ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          : "bg-pink-500 text-white hover:bg-pink-600"
                      }
                      `}
      onClick={handleFollow}
    >
      {followStatus?.isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
