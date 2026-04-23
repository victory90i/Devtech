"use client";

import React, { useEffect, useState } from "react";
import FilterBar from "@/components/filter-bar";
import RoomCard, { Room } from "@/components/room-card";
import MapView from "@/components/map-view";
import { ChevronDown } from "lucide-react";

export default function ListingsContainer() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await fetch("/api/rooms");
        if (res.ok) {
          const data = await res.json();
          setRooms(data);
        }
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRooms();
  }, []);

  return (
    <>
      <FilterBar />

      {/* Main Content Layout */}
      <main className="flex-1 flex overflow-hidden lg:h-[calc(100vh-124px)]">
        
        {/* Left Side: Scrollable Listing Area */}
        <div className="w-full lg:w-[55%] xl:w-[60%] flex flex-col overflow-y-auto custom-scrollbar relative">
          
          <div className="px-4 pb-12 sm:px-6 lg:px-8 py-4">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
              <h1 className="text-[15px] text-gray-700">
                <span className="font-bold text-gray-900">{rooms.length}</span> rooms to let in Milan in shared flats per month. 
                <span className="text-gray-500 ml-1">Options: bills included | no deposit</span>
              </h1>
              
              <div className="flex items-center text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50 px-2 py-1.5 rounded-md transition-colors">
                Best match
                <ChevronDown className="ml-1.5 w-4 h-4 text-gray-500" />
              </div>
            </div>

            {/* Room Cards Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <div className="bg-gray-200 rounded-2xl aspect-[4/3] w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6 pb-12">
                {rooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
                
                {/* Notice text */}
                <div className="col-span-full py-8 text-center mt-6">
                  <p className="text-gray-500">End of results.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Map Area (Fixed) */}
        <div className="hidden lg:block lg:w-[45%] xl:w-[40%] bg-gray-100 border-l border-gray-200 h-full overflow-hidden">
          <MapView />
        </div>

      </main>
    </>
  );
}
