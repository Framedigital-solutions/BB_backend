"use client";
import React, { useState } from "react";
import { MapPin, CheckCircle, Circle, Truck } from "lucide-react";

const OrderTracking = () => {
  const [orders] = useState([
    {
      id: 1,
      name: "Silver ring with American diamond",
      size: "11",
      color: "Silver",
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=80&h=80&fit=crop&crop=center",
      deliveryAddress: {
        name: "this address",
        address:
          "Panchajanya Apartment, Street 8, Newtown, Kolkata, WB, Pin code : 716729",
      },
      shippingSteps: [
        {
          status: "Left Warehouse",
          date: "13th May 25 - 16:00pm",
          completed: true,
        },
        {
          status: "Reached Zonal Warehouse",
          date: "14th May 25 - 16:00pm",
          completed: true,
        },
        {
          status: "Reached Delivery Center",
          date: "15th May 25 - 16:00pm",
          completed: true,
        },
        {
          status: "Delivered to you",
          date: "16th May 25 - 16:00pm",
          completed: false,
        },
      ],
    },
    {
      id: 2,
      name: "Silver ring with American diamond",
      size: "11",
      color: "Silver",
      qty: 1,
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=80&h=80&fit=crop&crop=center",
      deliveryAddress: {
        name: "this address",
        address:
          "Panchajanya Apartment, Street 8, Newtown, Kolkata, WB, Pin code : 716729",
      },
      shippingSteps: [
        {
          status: "Left Warehouse",
          date: "13th May 25 - 16:00pm",
          completed: true,
        },
        {
          status: "Reached Zonal Warehouse",
          date: "14th May 25 - 16:00pm",
          completed: true,
        },
        {
          status: "Reached Delivery Center",
          date: "15th May 25 - 16:00pm",
          completed: false,
        },
        {
          status: "Delivered to you",
          date: "16th May 25 - 16:00pm",
          completed: false,
        },
      ],
    },
  ]);

  const recommendations = [
    {
      id: 1,
      name: "Exquisite bangles",
      price: "Rs. 500",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=200&fit=crop&crop=center",
    },
    {
      id: 2,
      name: "Exquisite bangles",
      price: "Rs. 500",
      image:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=200&fit=crop&crop=center",
    },
    {
      id: 3,
      name: "Exquisite bangles",
      price: "Rs. 500",
      image:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=200&fit=crop&crop=center",
    },
    {
      id: 4,
      name: "Exquisite bangles",
      price: "Rs. 500",
      image:
        "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=300&h=200&fit=crop&crop=center",
    },
  ];

  const ShippingProgress = ({ steps }) => {
    return (
      <div className="relative">
        {/* Horizontal Progress Line */}
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                {step.completed ? (
                  <CheckCircle className="w-6 h-6 text-red-600 fill-current bg-white rounded-full" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-300 bg-white rounded-full" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 ${
                    step.completed ? "bg-red-600" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Labels */}
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
              style={{ width: `${100 / steps.length}%` }}
            >
              <p
                className={`text-sm font-medium mb-1 ${
                  step.completed ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {step.status}
              </p>
              <p className="text-xs text-gray-500">{step.date}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-8xl mx-auto p-6 bg-[#FFF3F3] min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-8">
        Track Your Order
      </h1>

      {/* Order Items */}
      <div className="space-y-8">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Product Info */}
              <div>
                <div className="flex gap-4 mb-6">
                  <img
                    src={order.image}
                    alt={order.name}
                    className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {order.name}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Size: {order.size}</p>
                      <p>Color: {order.color}</p>
                      <p>Qty: {order.qty}</p>
                    </div>
                  </div>
                </div>

                {/* Shipping Route */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Shipping Route
                  </h4>
                  <ShippingProgress steps={order.shippingSteps} />
                </div>
              </div>

              {/* Right Side - Delivery Address */}
              <div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <MapPin size={24} className="text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Delivering to {order.deliveryAddress.name}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {order.deliveryAddress.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations Section */}
      <div className="mt-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Recommended for you
          </h2>
          <p className="text-gray-600">Based on your history</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2">{item.name}</h3>
                <p className="text-red-600 font-semibold">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
