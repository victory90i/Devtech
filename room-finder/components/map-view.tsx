"use client";

import React, { useState } from 'react';

export default function MapView() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full bg-blue-50/50">
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full mb-3"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
      )}
      
      {/* OpenStreetMap Embed */}
      <iframe
        width="100%"
        height="100%"
        className="w-full h-full border-0 grayscale-[0.2] contrast-[1.1] opacity-90"
        src="https://www.openstreetmap.org/export/embed.html?bbox=9.1200,45.4400,9.2100,45.5100&layer=mapnik"
        onLoad={() => setIsLoaded(true)}
      />
      
      {/* Overlay label */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
         <div className="bg-blue-900 border border-blue-800 text-white font-medium py-2 px-6 rounded-lg shadow-xl text-sm shadow-blue-900/20">
           View map
         </div>
      </div>
    </div>
  );
}
