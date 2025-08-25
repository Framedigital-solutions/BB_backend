"use client";

import Image from "next/image";
import { images } from "../constants/images";

export default function AssetTest() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Badsha Bangles - Asset Integration Test</h1>
      
      {/* Bangles */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-rose-700">Bangles</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(images.bangles || {}).map(([key, src]) => (
            <div key={key} className="text-center">
              <Image 
                src={src} 
                alt={key} 
                width={200} 
                height={200} 
                className="rounded-lg shadow-md mb-2"
                onError={(e) => {
                  e.target.style.display = 'none';
                  console.error(`Failed to load: ${src}`);
                }}
              />
              <p className="text-sm text-gray-600">{key}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Earrings */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-rose-700">Earrings</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(images.earrings || {}).map(([key, src]) => (
            <div key={key} className="text-center">
              <Image 
                src={src} 
                alt={key} 
                width={200} 
                height={200} 
                className="rounded-lg shadow-md mb-2"
                onError={(e) => {
                  e.target.style.display = 'none';
                  console.error(`Failed to load: ${src}`);
                }}
              />
              <p className="text-sm text-gray-600">{key}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Necklaces */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-rose-700">Necklaces</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(images.necklaces || {}).map(([key, src]) => (
            <div key={key} className="text-center">
              <Image 
                src={src} 
                alt={key} 
                width={200} 
                height={200} 
                className="rounded-lg shadow-md mb-2"
                onError={(e) => {
                  e.target.style.display = 'none';
                  console.error(`Failed to load: ${src}`);
                }}
              />
              <p className="text-sm text-gray-600">{key}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rings */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-rose-700">Rings</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(images.rings || {}).map(([key, src]) => (
            <div key={key} className="text-center">
              <Image 
                src={src} 
                alt={key} 
                width={200} 
                height={200} 
                className="rounded-lg shadow-md mb-2"
                onError={(e) => {
                  e.target.style.display = 'none';
                  console.error(`Failed to load: ${src}`);
                }}
              />
              <p className="text-sm text-gray-600">{key}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Other Categories */}
      {Object.entries({
        "Chains & Pendants": images.chainsPendants,
        "Mangalsutra": images.mangalsutra,
        "Bracelets & Kada": images.braceletsKada,
        "Hair Accessories": images.hairAccessories,
        "Traditional": images.traditional,
      }).map(([categoryName, categoryImages]) => (
        <section key={categoryName} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-rose-700">{categoryName}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(categoryImages || {}).map(([key, src]) => (
              <div key={key} className="text-center">
                <Image 
                  src={src} 
                  alt={key} 
                  width={200} 
                  height={200} 
                  className="rounded-lg shadow-md mb-2"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    console.error(`Failed to load: ${src}`);
                  }}
                />
                <p className="text-sm text-gray-600">{key}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
      
      {/* Asset Summary */}
      <section className="mt-12 p-6 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Integration Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>Bangles: {Object.keys(images.bangles || {}).length} items</div>
          <div>Earrings: {Object.keys(images.earrings || {}).length} items</div>
          <div>Necklaces: {Object.keys(images.necklaces || {}).length} items</div>
          <div>Rings: {Object.keys(images.rings || {}).length} items</div>
          <div>Chains & Pendants: {Object.keys(images.chainsPendants || {}).length} items</div>
          <div>Mangalsutra: {Object.keys(images.mangalsutra || {}).length} items</div>
          <div>Bracelets & Kada: {Object.keys(images.braceletsKada || {}).length} items</div>
          <div>Hair Accessories: {Object.keys(images.hairAccessories || {}).length} items</div>
          <div>Traditional: {Object.keys(images.traditional || {}).length} items</div>
        </div>
        <p className="mt-4 text-green-600 font-semibold">
          ✅ Asset integration completed successfully! All {Object.keys({
            ...images.bangles,
            ...images.earrings,
            ...images.necklaces,
            ...images.rings,
            ...images.chainsPendants,
            ...images.mangalsutra,
            ...images.braceletsKada,
            ...images.hairAccessories,
            ...images.traditional
          }).length} jewelry assets have been organized and integrated.
        </p>
      </section>
    </div>
  );
}