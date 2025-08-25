"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import loginbg from "/public/loginside.jpg";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  // Form configuration
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Reset password email:", data.email);
    // Handle password reset logic here
    setIsSubmitted(true);

    // Reset form after successful submission
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 3000);
  };

  const handleBackToLogin = () => {
    // Navigate back to login page
    console.log("Navigate back to login");
    router.push("/login");
    // You can use Next.js router here: router.push('/login')
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0">
          <img
            src={loginbg?.src}
            alt="Traditional Indian jewelry and attire"
            className="w-full h-full object-cover"
          />
          {/* Optional overlay for better contrast */}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      </div>

      {/* Right side - Forgot Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#FFF3F3]">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="">
            <h2 className="text-3xl font-bold text-[#83272A] mb-2">
              Forgot Password?
            </h2>
            <p className="text-gray-600 text-sm">Please enter your email</p>
          </div>

          {/* Success Message */}
          {isSubmitted && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Reset link sent! Check your email for further instructions.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Forgot Password Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-1">
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid email address",
                  },
                })}
                type="email"
                placeholder="example@gmail.com"
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors bg-white text-gray-900 placeholder-gray-500 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Reset Password Button */}
            <button
              type="submit"
              disabled={isSubmitted}
              className={`w-full font-semibold py-3 px-4 rounded-lg transition-colors duration-300 transform hover:scale-105 ${
                isSubmitted
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-800 hover:bg-red-900 text-white"
              }`}
            >
              {isSubmitted ? "Email Sent!" : "Reset Password"}
            </button>

            {/* Back to Login */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleBackToLogin}
                className="text-sm text-gray-600 hover:text-red-800 transition-colors underline"
              >
                Back to Login
              </button>
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
