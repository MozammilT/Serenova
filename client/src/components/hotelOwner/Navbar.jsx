import { UserButton } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
      <Link to="/" className="flex gap-2 items-center justify-center">
        <img src="/favicon.svg" alt="logo" className="h-9 invert opacity-80" />
        <p className="text-3xl text-white tracking-tight text-balance invert opacity-80">
          Serenova
        </p>
      </Link>
      <UserButton />
    </div>
  );
}

export default Navbar;
