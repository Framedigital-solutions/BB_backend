"use client";
import { useState } from "react";
import { Heart, ShoppingBag, Star, Play, Check } from "lucide-react";
import { images } from "@/app/constants/images";
import {
  FaAward,
  FaCartPlus,
  FaHandshake,
  FaShippingFast,
} from "react-icons/fa";
import { PiArrowsClockwiseBold } from "react-icons/pi";

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("silver");
  const [selectedSize, setSelectedSize] = useState("11");

  const colors = [
    { id: "rose-gold", name: "Rose Gold", class: "bg-[#DEE1E6]" },
    { id: "silver", name: "Silver", class: "bg-[#E6AE87]" },
  ];

  const sizes = ["8", "9", "10", "11", "12", "13", "14"];

  const recommendedProducts = [
    {
      id: 1,
      name: "Exquisite bangles",
      price: "₹1,500",
      image: images?.suggested1,
    },
    {
      id: 2,
      name: "Exquisite bangles",
      price: "₹1,800",
      image: images.suggested2,
    },
    {
      id: 3,
      name: "Exquisite bangles",
      price: "₹2,200",
      image: images.suggested3,
    },
    {
      id: 4,
      name: "Exquisite bangles",
      price: "₹1,600",
      image: images.suggested4,
    },
  ];

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images Section */}
          <div className="space-y-4">
            <div className="relative bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={images.ring3?.default?.src}
                alt="Luxury Charms Ring"
                className="w-full h-auto object-cover"
              />
              <button className="absolute bottom-4 right-4 bg-white/70 rounded-full p-2 hover:bg-white">
                <Play size={24} fill="currentColor" className="text-red-800" />
              </button>
            </div>
            <div className="grid grid-cols-3 items-center  gap-5">
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={images.ring2?.default?.src}
                  alt="Ring angle 1"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={images.ring4?.default?.src}
                  alt="Ring angle 2"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            <h1 className="text-2xl font-medium uppercase text-stone-900">
              LUXURY CHARMS RING
            </h1>
            <p className="text-3xl font-bold text-[#83272A]">₹2500</p>

            <div className="space-y-6">
              {/* Color Selection */}
              <div>
                <p className="text-sm font-medium mb-2 text-stone-900">
                  Color: Silver
                </p>
                <div className="flex space-x-2">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      className={`w-8 h-8 rounded-full ${color.class} ${
                        selectedColor === color.id
                          ? "ring-2 ring-red-800 ring-offset-2"
                          : ""
                      }`}
                      onClick={() => setSelectedColor(color.id)}
                      aria-label={`Select ${color.name} color`}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="">
                <div className="flex justify-between">
                  <p className="text-sm font-bold mb-2 text-stone-900">
                    Size - 11
                  </p>
                  <span className="font-medium underline text-base text-stone-400 cursor-pointer">
                    What is my size?
                  </span>
                </div>
                <div className="flex space-x-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`w-8 h-8 rounded-sm text-xs flex items-center justify-center border ${
                        selectedSize === size
                          ? "border-red-800 bg-red-800 text-white"
                          : "border-gray-300 text-stone-900 hover:border-red-800"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div>
                <p className="text-sm font-bold mb-2 text-stone-900">
                  Quantity
                </p>
                <div className="flex  items-center border border-gray-300 w-28">
                  <button
                    className="w-8 h-8  flex items-center justify-center border-r border-gray-300 text-stone-900"
                    onClick={decrementQuantity}
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-stone-900">
                    {quantity}
                  </span>
                  <button
                    className=" text-stone-900 w-8 h-8 flex items-center justify-center border-l border-gray-300"
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="flex-1 rounded-xl px-4 py-2 border border-red-800 text-red-800 hover:bg-red-800 hover:text-white transition-colors">
                  <div className="flex justify-center gap-2">
                    <FaCartPlus size={22} color="#2C1720DB" />
                    ADD TO BAG
                  </div>
                </button>
                <button className="flex-1 rounded-xl bg-red-800 text-white py-2 hover:bg-red-900 transition-colors">
                  BUY NOW
                </button>
              </div>

              {/* Product Tags */}
              <div className="flex justify-center flex-col items-center bg-[#FFDEDE] p-3 gap-1">
                <p className="text-sm text-stone-900">
                  Make this purchase with more than 6 interest free options
                </p>
                <span className="font-bold text-sm text-stone-900 underline underline-offset-1 cursor-pointer">
                  Learn More
                </span>
              </div>

              {/* Product Benefits */}
              <div className="space-y-2">
                <div className="flex items-center  space-x-2">
                  <FaShippingFast size={25} color="#83272A" />
                  <p className="text-sm text-[#83272A]">
                    FREE standard shipping
                  </p>
                </div>
                <div className="flex items-center  space-x-2">
                  <FaHandshake size={25} color="#83272A" />
                  <p className="text-sm text-[#83272A]">2 year warranty</p>
                </div>
                <div className="flex items-center  space-x-2">
                  <PiArrowsClockwiseBold size={25} color="#83272A" />
                  <p className="text-sm text-[#83272A]">
                    Easy exchange and return conditions
                  </p>
                </div>
                <div className="flex items-ccenter  space-x-2 ">
                  <FaAward size={25} color="#83272A" />
                  <p className="text-sm text-[#83272A]">
                    Crafted from certified high quality materials
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description Tabs */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <div className="flex space-x-8 border-b border-gray-200">
            <button className="text-sm uppercase font-medium pb-2 border-b-2 border-red-800 text-red-800">
              Description
            </button>
            <button className="text-sm uppercase font-medium pb-2 text-stone-900 hover:text-red-800">
              Details & Care
            </button>
            <button className="text-sm uppercase font-medium pb-2 text-stone-900 hover:text-red-800">
              Shipping & Return
            </button>
            <button className="text-sm uppercase font-medium pb-2 text-stone-900 hover:text-red-800">
              Information
            </button>
          </div>

          <div className="py-6">
            <p className="text-stone-900">
              Lorem ipsum dolor sit amet consectetur. Aliquet gravida ut dolor
              massa diam. Sit accumsan pulvinar vel habitant accumsan. Massa
              elementum sit cras consectetur.
            </p>
            <ul className="space-y-3 text-sm">
              {[1, 2, 3, 4]?.map(() => (
                <li className="flex space-x-2">
                  <span className="text-stone-900">•</span>
                  <p className="text-stone-900">
                    Lorem ipsum dolor sit amet consectetur. Aliquet gravida ut
                    dolor massa diam. Sit accumsan pulvinar vel habitant
                    accumsan. Massa elementum sit cras consectetur.
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-16  flex flex-col justify-center items-center">
          <span className="text-4xl font-medium text-rose-700">
            Recommended for you
          </span>
          <span className="mb-6 text-gray-500">Based on your history</span>
          <div className="flex items-center md:grid-cols-3 lg:grid-cols-5 gap-4">
            {recommendedProducts.map((product) => {
              console.log(
                "image url " + JSON.stringify(product?.image, null, 2)
              );
              return (
                <div key={product.id} className="group flex flex-col ">
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={product.image?.default?.src}
                      alt={product.name}
                      className="w-full h-auto object-cover aspect-[4/5]"
                    />
                  </div>
                  <div className="mt-2">
                    <h3 className="text-sm font-medium text-stone-900">
                      {product.name}
                    </h3>
                    <p className="text-sm text-stone-900">{product.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
