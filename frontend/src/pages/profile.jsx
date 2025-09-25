import { FiArrowLeft, FiBookmark, FiGrid, FiLock } from "react-icons/fi";
import Avatar from "../components/common/Avatar";
import useFollowStore from "../store/followStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();

  const { followStatus, getFollowStatus } = useFollowStore();

  useEffect(() => {
    const loadFollowStatus = async () => {
      try {
        const status = await getFollowStatus(8);
        if (status) {
          console.log(status);
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadFollowStatus();
  }, [getFollowStatus]);

  return (
    <div className="bg-gray-50">
      <div className="bg-white min-h-screen max-w-2xl mx-auto">
        <header className="border-b border-gray-300 sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 py-4">
            <button className="text-gray-700 hover:text-black">
              <FiArrowLeft size={24} />
            </button>
            <h1 className="font-semibold text-lg">profileUser.username</h1>
            <div className="w-6"></div>
          </div>
        </header>

        <div className="p-4 border-b border-gray-300">
          <div className="flex items-start space-x-4">
            <Avatar size="large" />

            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">profileUser.username</h2>
                <button className="px-4 py-1 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50">
                  Follow
                </button>
              </div>

              <p className="font-semibold text-sm">profileUser.fullName</p>
              <p className="text-sm mt-1">profileUser.bio</p>
            </div>
          </div>
        </div>

        <div className="flex justify-around mt-6 pt-4">
          <div className="text-center">
            <p className="font-semibold">000</p>
            <p className="text-gray-500 text-sm">posts</p>
          </div>
          <button className="text-center hover:opacity-70 transition-opacity cursor-pointer">
            <p className="font-semibold">000</p>
            <p className="text-gray-500 text-sm">followers</p>
          </button>
          <button className="text-center hover:opacity-70 transition-opacity cursor-pointer">
            <p className="font-semibold">000</p>
            <p className="text-gray-500 text-sm">following</p>
          </button>
        </div>

        <div className="border-b border-gray-300">
          <div className="flex justify-center">
            <button className="flex-1 py-3 flex items-center justify-center border-b-2 border-black text-black">
              <FiGrid size={20} />
            </button>
            <button className="flex-1 py-3 flex items-center justify-center text-gray-500">
              <FiBookmark size={20} />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div>
            <div className="text-center py-12">
              <FiLock size={40} className="mx-auto mb-2 text-gray-400" />
              <p className="text-gray-500">This is Private</p>
              <p className="text-sm text-gray-400 mt-1">
                Only the owner can see saved posts
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
