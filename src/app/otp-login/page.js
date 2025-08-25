"use client";

import { useState, useRef, useEffect } from "react";
import loginbg from "/public/loginside.jpg";

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const inputRefs = useRef([]);

  // Initialize refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  // Countdown timer for resend OTP
  useEffect(() => {
    let interval = null;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      clearInterval(interval);
      setIsResending(false);
    }
    return () => clearInterval(interval);
  }, [countdown]);

  const handleInputChange = (index, value) => {
    // Only allow single digit
    if (value.length > 1) return;

    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If current input is empty, focus previous input
        inputRefs.current[index - 1]?.focus();
      }
    }

    // Handle paste
    if (e.key === "v" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then((text) => {
        const pastedOtp = text.replace(/\D/g, "").slice(0, 6).split("");
        const newOtp = [...otp];
        pastedOtp.forEach((digit, i) => {
          if (i < 6) newOtp[i] = digit;
        });
        setOtp(newOtp);

        // Focus last filled input or next empty input
        const lastIndex = Math.min(pastedOtp.length - 1, 5);
        inputRefs.current[lastIndex]?.focus();
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setError("Please enter complete OTP");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      console.log("OTP submitted:", otpString);
      // Handle OTP verification logic here

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success - redirect or show success message
      console.log("OTP verified successfully");
    } catch (error) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (isResending || countdown > 0) return;

    setIsResending(true);
    setCountdown(60); // 60 second countdown
    setError("");

    try {
      console.log("Resending OTP...");
      // Handle resend OTP logic here

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("OTP resent successfully");
    } catch (error) {
      setError("Failed to resend OTP. Please try again.");
      setCountdown(0);
      setIsResending(false);
    }
  };

  const handleBackToLogin = () => {
    // Navigate back to login page
    console.log("Navigate back to login");
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

      {/* Right side - OTP Verification Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#FFF3F3]">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="">
            <h2 className="text-3xl font-bold text-[#83272A] mb-2">
              OTP Verification
            </h2>
            <p className="text-gray-600 text-normal font-bold">
              Just some details to get you in!
            </p>
          </div>

          {/* OTP Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Label */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                OTP
              </label>

              {/* OTP Input Fields */}
              <div className="flex justify-between space-x-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors bg-white text-gray-900 ${
                      error ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            {/* Resend OTP */}
            <div className="">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isResending || countdown > 0}
                className={`text-sm transition-colors ${
                  isResending || countdown > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:text-red-800 underline"
                }`}
              >
                {countdown > 0
                  ? `Resend OTP: ${countdown}sec`
                  : isResending
                  ? "Sending..."
                  : "Resend OTP"}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || otp.join("").length !== 6}
              className={`w-full font-semibold py-3 px-4 rounded-lg transition-colors duration-300 transform hover:scale-105 ${
                isLoading || otp.join("").length !== 6
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-800 hover:bg-red-900 text-white"
              }`}
            >
              {isLoading ? "Verifying..." : "Sign up"}
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
