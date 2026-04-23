"use client";

import React from 'react';
import { ChevronDown, X, Bell } from 'lucide-react';

export default function FilterBar() {
  return (
    <div className="sticky top-16 z-40 w-full bg-white border-b border-gray-200 shadow-sm py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left side filters */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors">
            Availability
            <ChevronDown className="ml-2 w-4 h-4 text-gray-500" />
          </button>
          
          <button className="flex items-center px-4 py-2 border border-blue-100 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors">
            Rooms
            <ChevronDown className="ml-2 w-4 h-4 text-blue-500" />
          </button>
          
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors">
            Budget
            <ChevronDown className="ml-2 w-4 h-4 text-gray-500" />
          </button>
          
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors">
            Filters
          </button>
          
          <button className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors">
            Clear filters
            <X className="ml-2 w-4 h-4" />
          </button>
        </div>

        {/* Right side actions */}
        <div>
          <button className="flex items-center px-5 py-2 bg-[#ff6b4a] text-white rounded-md text-sm font-medium hover:bg-[#e85a3c] transition-colors shadow-sm">
            <Bell className="w-4 h-4 mr-2" fill="currentColor" />
            Save my search
          </button>
        </div>
      </div>
    </div>
  );
}
