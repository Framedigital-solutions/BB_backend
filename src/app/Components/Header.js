"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiMenu,
} from "react-icons/fi";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white text-gray-800 shadow-sm z-10 border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-serif tracking-wider">
              BADSHA BANGAL
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FiMenu className="w-6 h-6" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {[
                ["HOME", "/"],
                ["CATEGORIES", "/categories"],
                ["NEW ARRIVALS", "/new-arrival"],
                ["BESTSELLERS", "/bestseller"],
                ["OFFERS", "/offer"],
                ["CONTACT US", "/contact-us"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="font-medium uppercase hover:text-gray-500"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <Link href="/search" aria-label="Search">
              <FiSearch className="w-5 h-5" />
            </Link> */}
            <Link href="/wishlist" aria-label="Wishlist">
              <FiHeart className="w-5 h-5" />
            </Link>
            <Link href="/cart" aria-label="Cart">
              <FiShoppingCart className="w-5 h-5" />
            </Link>
            <Link href="/login" aria-label="Account">
              <FiUser className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-2">
            <ul className="flex flex-col space-y-2">
              {[
                ["HOME", "/"],
                ["CATEGORIES", "/categories"],
                ["NEW ARRIVALS", "/new-arrival"],
                ["BESTSELLERS", "/bestseller"],
                ["OFFERS", "/offer"],
                ["CONTACT US", "/contact-us"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="block uppercase">
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <div className="flex space-x-4">
                  <Link href="/search" aria-label="Search">
                    <FiSearch className="w-5 h-5" />
                  </Link>
                  <Link href="/wishlist" aria-label="Wishlist">
                    <FiHeart className="w-5 h-5" />
                  </Link>
                  <Link href="/cart" aria-label="Cart">
                    <FiShoppingCart className="w-5 h-5" />
                  </Link>
                  <Link href="/login" aria-label="Account">
                    <FiUser className="w-5 h-5" />
                  </Link>
                </div>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
