"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900">
              spotahome
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/landlord" 
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
            >
              I am a Landlord
            </Link>
            
            <Link href="/how-it-works" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              How it works
            </Link>
            
            <Link href="/favourites" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Favourites
            </Link>
            
            <div className="text-sm font-medium text-gray-700">
              <Link href="/signup" className="hover:text-gray-900">Sign up</Link>
              <span className="mx-1">|</span>
              <Link href="/login" className="hover:text-gray-900">Login</Link>
            </div>
            
            <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
              Help
              <ChevronDown className="ml-1 w-4 h-4" />
            </button>
            
            <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
              En
              <ChevronDown className="ml-1 w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <Link href="/landlord" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50">
              I am a Landlord
            </Link>
            <Link href="/how-it-works" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50">
              How it works
            </Link>
            <Link href="/favourites" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50">
              Favourites
            </Link>
            <Link href="/login" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50">
              Sign up | Login
            </Link>
            <Link href="/help" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50">
              Help
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
