import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Input from "../components/ui/Input";
import useAuthStore from "../store/authStore";

const Signup = () => {
  const navigate = useNavigate();

  const { register, loading, error } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isFormValid =
    formData.email &&
    formData.fullName &&
    formData.username &&
    formData.password;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-400 via-pink-500 to-grange-400">
      <div className="max-w-[420px] space-y-6 my-12">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl px-12 py-14">
          <h1 className="text-center mb-6">
            <span className="text-5xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Instagram
            </span>
          </h1>

          <p className="text-center text-gray-600 font-medium mb-10">
            Sign up to see photos and videos from your friends.
          </p>

          <div className="space-y-4 mb-8">
            <Button variant="secondary" icon={<FcGoogle className="w-6 h-6" />}>
              Continue with Google
            </Button>

            <Button variant="secondary" icon={<FaGithub className="w-6 h-6" />}>
              Continue with GitHub
            </Button>
          </div>

          <div className="flex items-center mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <Input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <p className="text-sm text-gray-500 text-center my-6 leading-relaxed">
              People who use our service may have uploaded your contact
              information to Instagram{" "}
              <a
                href="#"
                className="text-pink-500 hover:text-pink-600 transition-colors"
              >
                Learn More
              </a>
            </p>

            <p className="text-sm text-gray-500 text-center my-6 leading-relaxed">
              By signing up, you agree to our{" "}
              <a className="text-pink-500 hover:text-pink-600 transition-colors">
                Terms
              </a>
              ,{" "}
              <a className="text-pink-500 hover:text-pink-600 transition-colors">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a className="text-pink-500 hover:text-pink-600 transition-colors">
                Cookie Policy
              </a>
              .{" "}
            </p>

            <Button type="submit" disabled={loading || !isFormValid}>
              {loading ? "Signing up..." : "Sign up"}
            </Button>
          </form>

          {error && (
            <p className="text-red-500 text-xs text-center mt-4">{error}</p>
          )}
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl px-12 py-8 text-center">
          <p className="text-gray-600">
            Have an account?{" "}
            <Link
              to="/login"
              className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold hover:from-purple-700 hover:to-pink-700 transition-all "
            >
              Log in
            </Link>
          </p>
        </div>

        <div className="text-center mt-8">
          <p className="mb-5 text-white/90 font-medium">Get the app.</p>
          <div className="flex justify-center space-x-4">
            <img
              src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
              alt="Get it on Google Play"
              className="h-12 hover:scale-105 transition-transform cursor-pointer"
            />
            <img
              src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
              alt="Get it from Microsoft"
              className="h-12 hover:scale-105 transition-transform cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
