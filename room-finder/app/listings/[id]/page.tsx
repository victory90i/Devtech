"use client";

import React from "react";
import Navbar from "@/components/navbar";
import { useParams } from "next/navigation";

export default function ListingDetailPage() {
  const params = useParams();
  const id = params?.id;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Listing Details: {id}</h1>
        <p className="text-gray-600">This page is under development. Here we will display the details for room {id}.</p>
      </main>
    </div>
  );
}
