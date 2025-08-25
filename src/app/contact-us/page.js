"use client";

import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

import contact from "/public/contact.jpg";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 relative overflow-hidden bg-cover bg-center bg-no-repeat">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-300 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-300 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-orange-300 rounded-full blur-xl"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-red-800 mb-4">
            Contact Us
          </h1>
          <div className="w-50 h-1 bg-red-800 mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12  ">
          {/* Left side - Image */}
          <div className="lg:w-1/2 flex justify-center ">
            <div className="relative">
              <div className="w-80 h-96 md:w-96 md:h-112 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={contact?.src}
                  alt="Traditional Indian woman in beautiful attire"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements around the image */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full opacity-80"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 rounded-full opacity-80"></div>
              <div className="absolute top-1/4 -left-6 w-4 h-4 bg-orange-400 rounded-full opacity-80"></div>
            </div>
          </div>

          {/* Right side - Contact Form and Info */}
          <div className="lg:w-1/2 w-full max-w-md lg:max-w-none flex justify-between pr-10">
            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 bg-red-400 shadow-xl mb-4">
              <div className="space-y-6">
                <div>
                  <div className="block text-gray-700 text-sm font-medium mb-2">
                    Full Name
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-b-2 border-pink-200 bg-transparent focus:border-red-500 focus:outline-none transition-colors duration-300 text-gray-700"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <div className="block text-gray-700 text-sm font-medium mb-2">
                    E-mail
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-b-2 border-pink-200 bg-transparent focus:border-red-500 focus:outline-none transition-colors duration-300 text-gray-700"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <div className="block text-gray-700 text-sm font-medium mb-2">
                    Message
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border-b-2 border-pink-200 bg-transparent focus:border-red-500 focus:outline-none transition-colors duration-300 text-gray-700 resize-none"
                    placeholder="Enter your message"
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Contact Us
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6 p-7">
              {/* Email */}
              <div className="flex items-center space-x-4 bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-md">
                <div className="bg-red-800 p-3 rounded-full">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-800 text-lg">E-mail</h3>
                  <p className="text-gray-700">hi@green.com</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-4 bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-md">
                <div className="bg-red-800 p-3 rounded-full">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-800 text-lg">
                    Based in
                  </h3>
                  <p className="text-gray-700">New York, California, Ohio</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4 bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-md">
                <div className="bg-red-800 p-3 rounded-full">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-800 text-lg">
                    Contact
                  </h3>
                  <p className="text-gray-700">+51 8278932062</p>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-md">
                <h3 className="font-semibold text-red-800 text-lg mb-4">
                  Follow us on
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-red-800 hover:bg-red-900 p-3 rounded-full transition-colors duration-300 transform hover:scale-110"
                  >
                    <Facebook className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="#"
                    className="bg-red-800 hover:bg-red-900 p-3 rounded-full transition-colors duration-300 transform hover:scale-110"
                  >
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="#"
                    className="bg-red-800 hover:bg-red-900 p-3 rounded-full transition-colors duration-300 transform hover:scale-110"
                  >
                    <Twitter className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom decorative pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent"></div>
      {/* Floating jewelry-inspired decorative elements */}
      <div className="absolute top-1/4 right-20 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
      <div className="absolute top-3/4 left-20 w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-300"></div>
      <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-orange-400 rounded-full animate-pulse delay-700"></div>
    </div>
  );
}
