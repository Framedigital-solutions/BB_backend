// pages/order-confirmation.js
"use-client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/app/constants/images";
import orderConfirmHeader from "/public/product-images/orderConfirmHeader.svg";

const OrderConfirmation = () => {
  // Sample data - in a real application, this would come from your API or state management
  const orderDetails = {
    product: {
      name: "Gold pleated kari bangles",
      description:
        "Lorem ipsum dolor sit amet consectetur. Id id at sed iaculis imperdiet faucibus sagittis. Commodo turpis id vel ornare id mauris. Ornare libero nunc semper sagittis elit sit curabitur.",
      size: "2.6",
      colour: "Rose Gold",
      material: "Rose Gold",
      price: "₹ 2500",
      image: images.orderConfirm?.default?.src, // Make sure to add this image to your public folder
    },
    customer: {
      name: "Jane Doe",
      email: "janedoe@gmail.com",
      phone: "+91 - 8974657302",
      address:
        "Lorem ipsum dolor sit amet consectetur. Id id at sed iaculis imperdiet faucibus sagittis. Commodo turpis id vel ornare id mauris. Ornare libero nunc semper sagittis elit sit curabitur.",
    },
  };

  return (
    <div className="min-h-screen bg-[#FFF6F6] p-4 ">
      <div className="bg-[#FFF6F6] rounded-lg overflow-hidden  p-10 ">
        {/* Header with Icon and Title */}
        <div className="flex items-center mb-8  justify-center">
          <Image src={orderConfirmHeader} height={70} width={70} />
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold text-gray-900 ">
              Order Placed
            </h1>
            <div className="h-0.5 bg-[#E95065] mt-1"></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col gap-6 ">
          {/* Product Section */}
          <div className="flex gap-6 ">
            <div className="flex-none w-48 h-48 rounded-md overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src={orderDetails.product.image}
                  alt={orderDetails.product.name}
                  layout="fill"
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F/PQAJpgOQcYBFPgAAAABJRU5ErkJggg=="
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-4 bg-white px-4 py-2">
              <div>
                <h3 className="text-sm text-gray-500 font-normal">
                  Product name
                </h3>
                <p className="text-base text-gray-900">
                  {orderDetails.product.name}
                </p>
              </div>

              <div>
                <h3 className="text-sm text-gray-500 font-normal">
                  Product description
                </h3>
                <p className="text-base text-gray-900">
                  {orderDetails.product.description}
                </p>
              </div>

              <div className="flex ">
                <div className=" pr-4 py-2">
                  <h3 className="text-md text-gray-500 font-normal">Size</h3>
                  <p className="text-base text-gray-900">
                    {orderDetails.product.size}
                  </p>
                </div>
                <div className="w-px bg-[#FEA3A3] my-4 p-[0.5px]"></div>
                <div className=" px-4 py-2">
                  <h3 className="text-md text-gray-500 font-normal">Colour</h3>
                  <p className="text-base text-gray-900">
                    {orderDetails.product.colour}
                  </p>
                </div>
                <div className="w-px bg-[#FEA3A3] my-4 p-[0.5px]"></div>
                <div className=" pl-4 py-2">
                  <h3 className="text-md text-gray-500 font-normal">
                    Material
                  </h3>
                  <p className="text-base text-gray-900">
                    {orderDetails.product.material}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div className="flex  ">
            <div className="flex flex-col  justify-start w-1/6 px-2">
              <h3 className="text-sm text-gray-500 font-normal  py-1">Price</h3>
              <span className="text-xl font-semibold text-gray-900 mt-1  bg-white ">
                {orderDetails.product.price}
              </span>
            </div>
            <div className="flex flex-col gap-4   p-4 bg-white">
              <div>
                <h3 className="text-sm text-gray-500 font-normal">Name</h3>
                <p className="text-base text-gray-900">
                  {orderDetails.customer.name}
                </p>
              </div>

              <div className="flex">
                <div className="flex-1 ">
                  <h3 className="text-sm text-gray-500 font-normal">Email</h3>
                  <p className="text-base text-gray-900">
                    {orderDetails.customer.email}
                  </p>
                </div>
                <div className="w-px bg-gray-200 mx-4"></div>
                <div className="flex-1">
                  <h3 className="text-sm text-gray-500 font-normal">
                    Phone Number
                  </h3>
                  <p className="text-base text-gray-900">
                    {orderDetails.customer.phone}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm text-gray-500 font-normal">
                  Shipping Address
                </h3>
                <p className="text-base text-gray-900">
                  {orderDetails.customer.address}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Section */}
        </div>

        {/* Footer with Button */}
        <div className="flex justify-center mt-6 mb-4">
          <Link href="/shop">
            <button className="bg-[#8C2B31] hover:bg-[#6b2126] text-white py-2 px-6 rounded-md transition duration-300">
              Back to shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
