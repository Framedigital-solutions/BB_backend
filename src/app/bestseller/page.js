"use client";
import React, { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import { Heart, ShoppingCart } from "lucide-react";

const JewelleryBestSellers = () => {
  const [likedItems, setLikedItems] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const toggleLike = (itemId) => {
    const newLiked = new Set(likedItems);
    if (newLiked.has(itemId)) {
      newLiked.delete(itemId);
    } else {
      newLiked.add(itemId);
    }
    setLikedItems(newLiked);
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await apiFetch('/api/products');
        if (!mounted) return;
        setProducts(data.map((p) => ({ id: p._id, name: p.title, price: `₹${p.price}`, image: p.mainImage || p.images?.[0] || '/product-images/ringProduct.png', description: p.description || '' })));
      } catch (err) {
        console.error('Failed to load products', err);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="bg-pink-50 ">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden mb-12 shadow-lg">
        <div className="w-full h-full lg:h-[1200px]">
          <img
            src="/HeroBest.png"
            alt="Jewellery model"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Best Sellers Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 ml-7">
          Best Sellers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
          {selectedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.isOnSale && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide shadow-md">
                    SALE
                  </div>
                )}
                <button
                  onClick={() => toggleLike(product.id)}
                  className="absolute top-4 right-4 p-2.5 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm bg-opacity-90"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      likedItems.has(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-800">
                    {product.price}
                  </span>

                  <button className="bg-red-700 hover:bg-red-800 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:shadow-md">
                    <ShoppingCart className="w-4 h-4" />
                    Add to bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-10 space-x-4 mb-5">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default JewelleryBestSellers;
