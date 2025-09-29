import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUserStore from "../store/userStore";
import api from "../services/api";
import { FiArrowLeft } from "react-icons/fi";
import Avatar from "../components/common/Avatar";

const FollowList = () => {
  const navigate = useNavigate();
  const { username, type } = useParams();

  const { userProfile, getUserProfile } = useUserStore();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

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
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!userProfile) return;

        const endpoint =
          type === "followers"
            ? `/api/users/${userProfile.id}/followers`
            : `/api/users/${userProfile.id}/following`;

        const response = await api.get(endpoint);

        setUsers(response.data.content || []);
      } catch (err) {
        console.error(err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userProfile]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <header className="bg-white border-b border-gray-300 sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => navigate(`/profile/${userProfile?.username}`)}
              className="text-gray-700 hover:text-black"
            >
              <FiArrowLeft size={24} />
            </button>
            <div className="text-center">
              <h1 className="font-semibold text-lg">{userProfile?.username}</h1>
              <p className="text-sm text-gray-500">
                {type === "followers" ? "Followers" : "Following"}
              </p>
            </div>
            <div className="w-6"></div>
          </div>
        </header>

        <div className="bg-white">
          {users.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {type === "followers"
                  ? "No followers yet"
                  : "Not following anyone yet"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div
                    className="flex items-center space-x-3 flex-1 cursor-pointer"
                    onClick={() => handleUserClick(user)}
                  >
                    <Avatar user={user} size="medium" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{user.username}</p>
                      {user.fullName && (
                        <p className="text-gray-500 text-sm">{user.fullName}</p>
                      )}
                    </div>
                  </div>

                  {/* {currentUser && currentUser.id !== user.id && (
                    <FollowButton
                      userId={user.id}
                      username={user.username}
                      size="small"
                    />
                  )} */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowList;
