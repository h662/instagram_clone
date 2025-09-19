import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { useEffect } from "react";

const OAuth2Callback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAuth } = useAuthStore();

  useEffect(() => {
    const token = searchParams.get("token");
    const refreshToken = searchParams.get("refreshToken");
    const error = searchParams.get("error");

    if (error) {
      navigate("/login");
      return;
    }

    if (token && refreshToken) {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", refreshToken);

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const user = {
          id: payload.id,
          email: payload.email,
          username: payload.username,
          fullName: payload.fullName,
          profileImageUrl: payload.profileImageUrl || null,
          bio: payload.bio || null,
        };

        localStorage.setItem("user", JSON.stringify(user));

        setAuth({
          user,
          isAuthenticated: true,
          loading: false,
          error: null,
        });

        navigate("/");
      } catch (err) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate, setAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-lg font-medium">Logging you in...</p>
      </div>
    </div>
  );
};

export default OAuth2Callback;
