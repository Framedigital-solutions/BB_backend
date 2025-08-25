"use client";
import React, { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Edit2,
  Filter,
  ShoppingBag,
  QrCode,
  CreditCard,
  Truck,
  Building,
  Wallet,
  Clock,
} from "lucide-react";

const PaymentPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("upi");
  const [selectedUPIOption, setSelectedUPIOption] = useState("");

  const paymentMethods = [
    {
      id: "upi",
      title: "UPI",
      subtitle: "Google Pay, PhonePe, Paytm and many more",
      icon: <QrCode size={24} />,
    },
    {
      id: "card",
      title: "Credit/Debit Card",
      subtitle: "Visa, Mastercard, American Express and many more",
      icon: <CreditCard size={24} />,
    },
    {
      id: "cod",
      title: "Cash on Delivery",
      subtitle: "Pay at your doorstep",
      icon: <Truck size={24} />,
    },
    {
      id: "netbanking",
      title: "Net Banking",
      subtitle: "Pay through your favourite bank",
      icon: <Building size={24} />,
    },
    {
      id: "bnpl",
      title: "Buy now Pay later",
      subtitle: "Zest money, Simpl and more",
      icon: <Clock size={24} />,
    },
  ];

  const upiOptions = [
    { id: "googlepay", name: "Google Pay", icon: "🟢" },
    { id: "phonepe", name: "PhonePe", icon: "🟣" },
    { id: "upi", name: "UPI", icon: "💳" },
    { id: "paytm", name: "Paytm", icon: "🔵" },
    { id: "cred", name: "Cred", icon: "⚫" },
  ];

  return (
    <div className="max-w-8xl mx-auto p-6 bg-[#FFF3F3] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Payment</h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
            <Filter size={16} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <ShoppingBag size={16} />
            Move All to bag
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Payment Methods */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <MapPin size={24} className="text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">
                    Delivering to Peter Devoski
                  </h3>
                  <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors">
                    <Edit2 size={16} />
                    <span className="text-sm">Edit or Add Address</span>
                  </button>
                </div>
                <p className="text-gray-600 text-sm">
                  Panchajanya Apartment, Street 8, Newtown, Kolkata, WB, Pin
                  code : 716729
                </p>
              </div>
            </div>
          </div>

          {/* Payment Method Options */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Payment Method Options
            </h3>

            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <label className="flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={selectedPaymentMethod === method.id}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="mr-4 text-red-600 focus:ring-red-500"
                    />
                    <div className="flex items-center gap-4 flex-1">
                      <div className="text-gray-600">{method.icon}</div>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {method.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {method.subtitle}
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - UPI Options & Summary */}
        <div className="space-y-6">
          {/* UPI Payment Options */}
          {selectedPaymentMethod === "upi" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Pay with UPI
              </h3>

              {/* QR Code Section */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Scan QR Code</h4>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                    <QrCode size={24} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Use any UPI app on your phone
                    </p>
                    <div className="flex gap-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        GPay
                      </span>
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                        PhonePe
                      </span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Paytm
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
                  Scan & Pay
                </button>
              </div>

              {/* UPI App Options */}
              <div className="space-y-3">
                {upiOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-lg">{option.icon}</span>
                      <span className="text-gray-800">{option.name}</span>
                    </div>
                    <input
                      type="radio"
                      name="upiOption"
                      value={option.id}
                      checked={selectedUPIOption === option.id}
                      onChange={(e) => setSelectedUPIOption(e.target.value)}
                      className="text-red-600 focus:ring-red-500"
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">Bag</span>
                <span className="text-gray-600">2 Items</span>
              </div>

              <hr className="border-gray-200" />

              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">Price</span>
                <span className="font-semibold text-gray-900">₹2500</span>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button onClick={async () => {
              try {
                const shippingAddress = { name: 'Demo User', phone: '9999999999', line1: 'Demo address' };
                const res = await apiFetch('/api/orders', { method: 'POST', body: JSON.stringify({ paymentMethod: selectedPaymentMethod, shippingAddress }) });
                if (res?.order) {
                  // redirect to order-confirm (use tracking id)
                  window.location.href = `/product/order-confirm?order=${res.order._id}`;
                }
              } catch (err) {
                console.error('create order', err);
                if (err.status === 401) window.location.href = '/login';
              }
            }} className="w-full py-4 bg-red-600 text-white rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors">
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
