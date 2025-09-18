import React from "react";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-red-100">
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default Home;
