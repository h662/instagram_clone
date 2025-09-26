import { FiArrowLeft, FiBookmark, FiGrid, FiLock } from "react-icons/fi";
import Avatar from "../components/common/Avatar";
import useFollowStore from "../store/followStore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useUserStore from "../store/userStore";
import useAuthStore from "../store/authStore";
import usePostStore from "../store/postStore";
import PostList from "../components/post/PostList";

const Profile = () => {
  const { username } = useParams();

  const { followStatus, getFollowStatus, toggleFollow } = useFollowStore();
  const { userProfile, getUserProfile } = useUserStore();
  const { user: currentUser } = useAuthStore();
  const { userPosts, userPostCount, getUserPosts, getUserPostCount } =
    usePostStore();

  const [activeTab, setActiveTab] = useState("posts");

  const isOwnProfile = currentUser?.username === userProfile?.username;

  const handleFollow = async () => {
    try {
      if (!userProfile) return;

      await toggleFollow(userProfile.id);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        await getUserProfile(username);
      } catch (err) {
        console.error(err);
      }
    };
    loadUserProfile();
  }, [getUserProfile]);

  useEffect(() => {
    const loadFollowStatus = async () => {
      try {
        if (!userProfile) return;

        await getFollowStatus(userProfile.id);
      } catch (err) {
        console.error(err);
      }
    };
    loadFollowStatus();
  }, [userProfile, getFollowStatus]);

  useEffect(() => {
    const loadPosts = async () => {
      if (!userProfile) return;

      getUserPosts(0, userProfile.id);
    };

    loadPosts();
  }, [userProfile, getUserPosts]);

  useEffect(() => {
    const loadUserPostCount = async () => {
      try {
        if (!userProfile) return;

        await getUserPostCount(userProfile.id);
      } catch (err) {
        console.error(err);
      }
    };
    loadUserPostCount();
  }, [userProfile, getUserPostCount]);

  useEffect(() => console.log(activeTab === "posts"), [activeTab]);
  useEffect(() => console.log(isOwnProfile), [isOwnProfile]);

  return (
    <div className="bg-gray-50">
      <div className="bg-white min-h-screen max-w-2xl mx-auto flex flex-col">
        <header className="border-b border-gray-300 sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 py-4">
            <Link className="text-gray-700 hover:text-black" to="/">
              <FiArrowLeft size={24} />
            </Link>
            <h1 className="font-semibold text-lg">{userProfile?.username}</h1>
            <div className="w-6"></div>
          </div>
        </header>

        <div className="p-4 border-b border-gray-300">
          <div className="flex items-start space-x-4">
            <Avatar user={userProfile} size="large" />

            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">
                  {userProfile?.username}
                </h2>
                {isOwnProfile ? (
                  <button className="px-4 py-1 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50">
                    Edit Profile
                  </button>
                ) : (
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
                )}
              </div>

              <p className="font-semibold text-sm">{userProfile?.fullName}</p>
              <p className="text-sm mt-1">{userProfile?.bio}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-around mt-6 pt-4">
          <div className="text-center">
            <p className="font-semibold">{userPostCount || 0}</p>
            <p className="text-gray-500 text-sm">posts</p>
          </div>
          <button className="text-center hover:opacity-70 transition-opacity cursor-pointer">
            <p className="font-semibold">{followStatus?.followersCount || 0}</p>
            <p className="text-gray-500 text-sm">followers</p>
          </button>
          <button className="text-center hover:opacity-70 transition-opacity cursor-pointer">
            <p className="font-semibold">{followStatus?.followingCount || 0}</p>
            <p className="text-gray-500 text-sm">following</p>
          </button>
        </div>

        <div className="border-b border-gray-300">
          <div className="flex justify-center">
            <button
              className={`flex-1 py-3 flex items-center justify-center ${
                activeTab === "posts"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("posts")}
            >
              <FiGrid size={20} />
            </button>
            <button
              className={`flex-1 py-3 flex items-center justify-center ${
                activeTab === "bookmark"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("bookmark")}
            >
              <FiBookmark size={20} />
            </button>
          </div>
        </div>

        <div className="p-4 grow flex flex-col justify-center">
          {activeTab === "posts" && (
            <>
              {userPostCount === 0 ? (
                <div className="flex justify-center">작성된 글이 없습니다.</div>
              ) : (
                <div className="grow">
                  <PostList posts={userPosts} />
                </div>
              )}
            </>
          )}
          {activeTab === "bookmark" && (
            <>
              {isOwnProfile ? (
                <div className="flex justify-center">Bookmark List</div>
              ) : (
                <div>
                  <div className="text-center py-12">
                    <FiLock size={40} className="mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-500">This is Private</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Only the owner can see saved posts
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
