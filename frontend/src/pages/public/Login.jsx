import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

import {
  FiMail,
  FiLock,
  FiBox,
  FiBarChart2,
  FiClipboard,
  FiUsers,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const {
    user,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && user) {

      toast.success("Welcome back!");

      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/employee");
      }
    }
    dispatch(reset());
  }, [
    user,
    isError,
    isSuccess,
    message,
    navigate,
    dispatch,
  ]);

  const FeatureCard = ({
    icon,
    title,
    description,
  }) => {
    return (
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 flex items-center gap-3 hover:translate-x-2 transition-all duration-300">
        <div className="bg-emerald-500/20 p-3 rounded-xl text-emerald-400">
          {icon}
        </div>

        <div>
          <h3 className="font-semibold text-white">
            {title}
          </h3>

          <p className="text-sm text-slate-400">
            {description}
          </p>
        </div>
      </div>
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row overflow-hidden">

      <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white px-10 py-8 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="bg-emerald-500/20 p-4 rounded-2xl">
              <FiBox
                size={32}
                className="text-emerald-400"
              />
            </div>

            <h1 className="text-3xl font-bold">
              Asset Flow
            </h1>
          </div>

          <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
            Company Asset
            <br />
            <span className="text-emerald-400">
              Management System
            </span>
          </h2>

          <p className="mt-8 mb-12 text-slate-300 text-lg max-w-xl leading-relaxed">
            Streamline your enterprise operations
            with precision tracking, automated
            auditing and real-time inventory
            insights.
          </p>
        </div>

        <div className="relative z-10 mt-8 space-y-4 mb-8">
          <FeatureCard
            icon={<FiClipboard size={22} />}
            title="Asset Tracking"
            description="Real-time asset monitoring and assignments."
          />

          <FeatureCard
            icon={<FiUsers size={22} />}
            title="Employee Management"
            description="Manage employees and permissions."
          />

          <FeatureCard
            icon={<FiBarChart2 size={22} />}
            title="Advanced Reports"
            description="Actionable analytics and reports."
          />
        </div>

        <p className="relative z-10 text-slate-500 text-sm">
          © 2026 Asset Flow. All rights reserved.
        </p>
      </div>

      <div className="hidden lg:flex lg:w-2/5 sticky top-0 h-screen items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-sm bg-white rounded-[32px] shadow-2xl p-8 border border-slate-200">
  
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-3xl mb-5">
              <FiLock
                size={32}
                className="text-emerald-600"
              />
            </div>

            <h2 className="text-3xl font-bold text-slate-800">
              Sign In
            </h2>

            <p className="text-slate-500 mt-2">
              Access your account securely
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>

              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-slate-300 rounded-xl py-3 pl-12 pr-4 bg-slate-50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full border border-slate-300 rounded-xl py-3 pl-12 pr-12 bg-slate-50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? "Signing In..."
                : "Access Dashboard"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Secure access to your company
              assets and reports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;