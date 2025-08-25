// src/app/components/CategoryGrid.js
"use client";

import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

// categories will be fetched from backend

export default function CategoryGrid() {
  // For demonstration, we'll use placeholder images if real images aren't available
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await apiFetch('/api/categories');
        if (!mounted) return;
        setCategories(data.map((c, i) => ({ id: c._id || i, title: c.name, slug: c.key, image: c.image || '/homeimage/1.png' })));
      } catch (err) {
        console.warn('Failed to load categories', err);
        // fallback to empty array
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    // In a real app, you might want to check if images exist
    setImagesLoaded(true);
  }, []);

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-medium">Shop by category</h2>
          <Link href="/categories" className="text-sm hover:underline">
            View More
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.length === 0 ? (
            // Show placeholders
            [...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-100 aspect-square rounded-md" />
            ))
          ) : (
            categories.map((category) => (
              <Link href={`/category/${category.slug}`} key={category.id} className="block group">
                <div className="relative aspect-square overflow-hidden bg-gray-100 mb-2">
                  {imagesLoaded ? (
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = `/api/placeholder/400/400`;
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                      <span className="text-gray-400">Loading...</span>
                    </div>
                  )}
                </div>
                <h3 className="text-base font-medium">{category.title}</h3>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
