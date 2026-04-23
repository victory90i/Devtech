import React from "react";
import Navbar from "@/components/navbar";
import ListingsContainer from "@/components/listings-container";

export default function ListingsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <ListingsContainer />
    </div>
  );
}
