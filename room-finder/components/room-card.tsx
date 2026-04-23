"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';

export type Room = {
  id: string;
  type: string;
  date: string;
  rating: number;
  reviews: number;
  title: string;
  price: number;
  currency: string;
  images: string[];
  badges: string[];
  discount: string | null;
  checked: boolean;
};

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === room.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));
  };

  return (
    <Link href={`/listings/${room.id}`} className="group flex flex-col gap-3">
      {/* Image Carousel Container */}
      <div 
        className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Images */}
        <div className="absolute inset-0 transition-transform duration-500 ease-in-out">
          <Image
            src={room.images[currentImageIndex]}
            alt={room.title}
            fill
            className="object-cover"
            priority={true}
          />
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          {room.checked ? (
            <div className="bg-white/95 px-2.5 py-1 rounded-full text-[10px] font-bold text-gray-800 shadow-sm">
              CHECKED
            </div>
          ) : (
            <div></div>
          )}
          <button className="p-2bg-white/0 hover:bg-white/20 rounded-full transition-colors group-hover:scale-110 active:scale-95 flex items-center justify-center bg-white shadow-sm p-1.5 rounded-full">
            <Heart className="w-5 h-5 text-gray-700 hover:fill-gray-700" />
          </button>
        </div>

        {/* Carousel Controls */}
        {isHovered && room.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-md text-gray-800 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-md text-gray-800 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Counter */}
        {room.images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm font-medium">
            {currentImageIndex + 1}/{room.images.length}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center text-xs text-gray-600 font-medium uppercase tracking-wide">
          <div className="flex items-center gap-1.5">
            <span>{room.type}</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span>{room.date}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-900 font-semibold">
            <Star className="w-3.5 h-3.5 fill-gray-900 text-gray-900" />
            {room.rating} <span className="text-gray-500 underline font-normal">({room.reviews})</span>
          </div>
        </div>

        <h3 className="text-[17px] font-medium leading-tight text-gray-900 line-clamp-2 mt-1">
          {room.title}
        </h3>

        <div className="flex items-end gap-1 mt-1">
          <span className="text-lg font-bold text-gray-900">{room.price} {room.currency}</span>
          <span className="text-sm text-gray-500 mb-0.5">/month</span>
        </div>

        {/* Features/Badges */}
        <div className="flex flex-wrap items-center gap-2 mt-1.5">
          {room.badges.map((badge, idx) => (
            <span 
              key={idx}
              className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-semibold flex items-center justify-center border border-gray-200"
            >
              {badge}
            </span>
          ))}
          {room.discount && (
            <span className="px-2.5 py-1 bg-pink-50 text-pink-600 rounded-full text-[10px] font-bold">
              {room.discount}
            </span>
          )}
        </div>

        <div className="mt-1">
          <span className="text-sm text-gray-900 underline font-medium">
            +info
          </span>
        </div>
      </div>
    </Link>
  );
}
