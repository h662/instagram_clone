import React, { useState } from "react";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import Avatar from "../components/common/Avatar";
import PostList from "../components/post/PostList";
import CreatePost from "../components/post/CreatePost";

const Home = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();

  const [activeTab, setActiveTab] = useState("home");
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="bg-red-100 max-w-[470px] w-full relative">
        <header className="bg-white border-b border-gray-300 fixed top-0 max-w-[470px] w-full z-40">
          <div className="flex items-center justify-between px-4 py-4">
            <h1 className="text-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Instagram
            </h1>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-black transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <main className="pt-16 pb-20">
          <div className="p-4">
            <PostList />
          </div>
        </main>

        <nav className="bg-white border-t border-gray-300 fixed bottom-0 w-full max-w-[470px] z-40">
          <div className="flex items-center justify-around py-3">
            <button
              onClick={() => setActiveTab("home")}
              className={activeTab === "home" ? "text-black" : "text-gray-500"}
            >
              <svg
                className="w-6 h-6"
                fill={activeTab === "home" ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </button>

            <button
              onClick={() => setActiveTab("search")}
              className={
                activeTab === "search" ? "text-black" : "text-gray-500"
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <button
              onClick={() => setShowCreatePost(true)}
              className="text-gray-700"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>

            <button
              onClick={() => setActiveTab("reels")}
              className={activeTab === "reels" ? "text-black" : "text-gray-500"}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>

            <button
              onClick={() => {
                setActiveTab("profile");
                navigate(`/profile/${user?.username}`);
              }}
              className={
                activeTab === "profile" ? "text-black" : "text-gray-500"
              }
            >
              <Avatar
                user={user}
                size="extra-small"
                showBorder={activeTab === "profile"}
                borderColor="black"
              />
            </button>
          </div>
        </nav>

        {showCreatePost && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <CreatePost onClose={() => setShowCreatePost(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
