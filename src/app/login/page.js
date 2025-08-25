"use client";

import { useState } from "react";
import { apiFetch, setToken } from "@/lib/api";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import loginside from "/public/loginside.jpg";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Form configuration
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  // Input field configurations
  const loginFields = [
    {
      name: "username",
      type: "text",
      placeholder: "Username",
      validation: {
        required: "Username is required",
        minLength: {
          value: 3,
          message: "Username must be at least 3 characters",
        },
      },
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      validation: {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
      },
    },
  ];

  const signupFields = [
    {
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      validation: {
        required: "First name is required",
        minLength: {
          value: 2,
          message: "First name must be at least 2 characters",
        },
      },
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      validation: {
        required: "Last name is required",
        minLength: {
          value: 2,
          message: "Last name must be at least 2 characters",
        },
      },
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email Address",
      validation: {
        required: "Email is required",
        pattern: {
          value: /^\S+@\S+$/i,
          message: "Please enter a valid email address",
        },
      },
    },
    {
      name: "username",
      type: "text",
      placeholder: "Username",
      validation: {
        required: "Username is required",
        minLength: {
          value: 3,
          message: "Username must be at least 3 characters",
        },
      },
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      validation: {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters",
        },
        pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        },
      },
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      validation: {
        required: "Please confirm your password",
        validate: (value) => {
          const password = watch("password");
          return value === password || "Passwords do not match";
        },
      },
    },
  ];

  const currentFields = isSignup ? signupFields : loginFields;

  const onSubmit = (data) => {
    (async () => {
      try {
        if (isSignup) {
          const payload = { username: data.username, email: data.email, password: data.password, displayName: `${data.firstName} ${data.lastName}` };
          const res = await apiFetch('/api/auth/signup', { method: 'POST', body: JSON.stringify(payload) });
          if (res.token) {
            setToken(res.token);
            window.location.href = '/';
          }
        } else {
          const payload = { username: data.username, password: data.password };
          const res = await apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) });
          if (res.token) {
            setToken(res.token);
            window.location.href = '/';
          }
        }
      } catch (err) {
        console.error('auth error', err);
        alert(err?.data?.error || err.message || 'Auth failed');
      }
    })();
  };

  const handleModeToggle = () => {
    setIsSignup(!isSignup);
    reset(); // Clear form when switching modes
    setShowPassword(false);
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Handle Google login logic here
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login clicked");
    // Handle Facebook login logic here
  };

  const forgotPasswordHandler = () => {
    router.push("/forgot-password");
  };

  const renderInputField = (field) => {
    const isPasswordField = field.type === "password";

    return (
      <div key={field.name} className="space-y-1">
        <div className="relative">
          <input
            {...register(field.name, field.validation)}
            type={isPasswordField && showPassword ? "text" : field.type}
            placeholder={field.placeholder}
            className={`w-full px-4 py-3 ${
              isPasswordField ? "pr-12" : ""
            } border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors bg-white text-gray-900 placeholder-gray-500 ${
              errors[field.name] ? "border-red-500" : ""
            }`}
          />
          {isPasswordField && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
        {errors[field.name] && (
          <p className="text-red-500 text-sm">{errors[field.name].message}</p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0">
          <img
            src={loginside?.src}
            alt="Traditional Indian jewelry and attire"
            className="w-full h-full object-cover"
          />
          {/* Optional overlay for better contrast */}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#FFF3F3]">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="">
            <h2 className="text-3xl font-bold text-[#83272A] mb-2">
              {isSignup ? "Sign Up" : "Login"}
            </h2>
            <p className="text-gray-600">
              {isSignup ? "Create your account" : "Glad you're back!"}
            </p>
          </div>

          {/* Auth Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Dynamic Input Fields */}
            <div className="space-y-4">
              {currentFields.map(renderInputField)}
            </div>

            {/* Remember Me (only for login) */}
            {!isSignup && (
              <div className="flex items-center">
                <input
                  {...register("rememberMe")}
                  type="checkbox"
                  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Remember me
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-800 hover:bg-red-900 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300 transform hover:scale-105"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>

            {/* Forgot Password (only for login) */}
            {!isSignup && (
              <div className="text-center">
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-red-800 transition-colors"
                  onClick={forgotPasswordHandler}
                >
                  Forgot password ?
                </a>
              </div>
            )}

            {/* Divider */}
            <div className=" flex items-center">
              <div className="flex-1 h-[2px] bg-[#4D4D4D]"></div>
              <div className="px-4 text-[#4D4D4D]">Or</div>
              <div className="flex-1 h-[2px] bg-[#4D4D4D]"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex space-x-4 justify-center">
              {/* Google Login */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </button>

              {/* Facebook Login */}
              <button
                type="button"
                onClick={handleFacebookLogin}
                className="flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
            </div>

            {/* Toggle Login/Signup */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {isSignup
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={handleModeToggle}
                  className="text-red-800 hover:text-red-900 font-medium transition-colors underline"
                >
                  {isSignup ? "Login" : "Signup"}
                </button>
              </p>
            </div>

            {/* Footer Links */}
            <div className="flex justify-center space-x-6 text-xs text-gray-500 pt-4">
              <a href="#" className="hover:text-gray-700 transition-colors">
                Terms & Conditions
              </a>
              <a href="#" className="hover:text-gray-700 transition-colors">
                Support
              </a>
              <a href="#" className="hover:text-gray-700 transition-colors">
                Customer Care
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile background overlay */}
      <div className="lg:hidden absolute inset-0 -z-10">
        <img
          src="/api/placeholder/400/800"
          alt="Traditional Indian jewelry and attire"
          className="w-full h-full object-cover opacity-10"
        />
      </div>
    </div>
  );
}
