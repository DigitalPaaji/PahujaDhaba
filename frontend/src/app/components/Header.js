'use client';

import { FaBars, FaShoppingCart, FaUser, FaPhone } from 'react-icons/fa';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-primary text-white p-2 rounded-lg">
              <span className="text-2xl font-bold">PVD</span>
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900">Royal Palm</h1>
              <p className="text-sm text-gray-600">Authentic Indian Food</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button className="flex items-center text-gray-700 hover:text-primary">
              <FaPhone className="mr-2" />
              <span>Call: 98765 43210</span>
            </button>
            <button className="btn-primary flex items-center">
              <FaShoppingCart className="mr-2" />
              <span>View Cart</span>
            </button>
            <button className="flex items-center text-gray-700 hover:text-primary">
              <FaUser className="mr-2" />
              <span>Login</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="space-y-3">
              <button className="flex items-center w-full p-3 hover:bg-gray-100 rounded-lg">
                <FaPhone className="mr-3" />
                <span>Call: 98765 43210</span>
              </button>
              <button className="btn-primary w-full flex items-center justify-center p-3">
                <FaShoppingCart className="mr-2" />
                <span>View Cart</span>
              </button>
              <button className="flex items-center w-full p-3 hover:bg-gray-100 rounded-lg">
                <FaUser className="mr-3" />
                <span>Login</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}