"use client";
import React, { useState, useEffect } from "react";
import { Heart, ShoppingBag, Filter } from "lucide-react";
import { apiFetch } from "@/lib/api";

const JewelryWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState(new Set());
  const [bagItems, setBagItems] = useState(new Set());
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const w = await apiFetch('/api/wishlist');
        setProducts(w.products || []);
        setWishlistItems(new Set((w.products||[]).map(p=>String(p._id||p.id))));
      } catch (err) {
        console.warn('wishlist load', err.message || err);
      }
    })();
  }, []);

  const jewelryProducts = products.length ? products : [
    {
      id: 1,
      name: "Dazzling Bangles",
      price: "₹2500",
      image: "categories/1.png",
      discount: null,
    },
    {
      id: 2,
      name: "Dazzling Bangles",
      price: "₹2500",
      image: "categories/2.png",
      discount: null,
    },
    {
      id: 3,
      name: "Dazzling Bangles",
      price: "₹2500",
      image: "categories/3.png",
      discount: "10% off",
    },
    {
      id: 4,
      name: "Dazzling Bangles",
      price: "₹2500",
      image: "categories/4.png",
      discount: null,
    },
    {
      id: 5,
      name: "Dazzling Bangles",
      price: "₹2500",
      image: "categories/5.png",
      discount: null,
    },
    {
      id: 6,
      name: "Dazzling Bangles",
      price: "₹2500",
      image: "categories/6.png",
      discount: null,
    },
    {
      id: 7,
      name: "Dazzling Bangles",
      price: "₹2500",
      image: "categories/7.png",
      discount: null,
    },
    {
      id: 8,
      name: "Dazzling Bangles",
      price: "₹2500",
      image: "categories/8.png",
      discount: null,
    },
    {
      id: 9,
      name: "Dazzling Bangles",
      price: "₹2500",
      image: "categories/9.png",
      discount: null,
    },
  ];

  const toggleWishlist = async (productId) => {
    try {
      const res = await apiFetch('/api/wishlist/toggle', { method: 'POST', body: JSON.stringify({ productId }) });
      const ids = new Set((res.products || []).map(p => String(p._id || p.id)));
      setWishlistItems(ids);
      setProducts(res.products || []);
    } catch (err) {
      console.error('toggle wishlist', err);
    }
  };

  const toggleBag = (productId) => {
    setBagItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  return (
    <div className=" p-6 bg-gray-50 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800 ml-7">
            Jewellery Box
          </h1>
          <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm">
            ({jewelryProducts.length})
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            <ShoppingBag size={16} />
            Move all to bag
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {jewelryProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Image Container */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />

              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                  {product.discount}
                </div>
              )}

              {/* Heart Icon */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
              >
                <Heart
                  size={20}
                  className={`${
                    wishlistItems.has(product.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-600 hover:text-red-500"
                  } transition-colors`}
                />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
              <p className="text-lg font-bold text-gray-900 mb-3">
                {product.price}
              </p>

              {/* Add to Bag Button */}
              <button
                onClick={() => toggleBag(product.id)}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  bagItems.has(product.id)
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <ShoppingBag size={16} />
                  {bagItems.has(product.id) ? "Added to bag" : "Add to bag"}
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Wishlist items: {wishlistItems.size}</span>
          <span>Items in bag: {bagItems.size}</span>
        </div>
      </div>
    </div>
  );
};

export default JewelryWishlist;
