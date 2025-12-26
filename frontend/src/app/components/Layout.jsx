import React from 'react';
import { FaUtensils, FaSun, FaUtensilSpoon, FaMoon, FaLeaf } from 'react-icons/fa';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FaUtensils className="text-2xl text-orange-500" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Pahuja Vaishno Dhaba</h1>
                <p className="text-xs text-gray-500">Daily Updated Menu</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                <FaLeaf className="inline mr-1" /> Veg Only
              </span>
            </div>
          </div>
        </div>
      </header>
      <main className="pb-20">
        {children}
      </main>
      <footer className="fixed bottom-0 w-full bg-white border-t border-gray-200 py-3">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center text-orange-500">
            <FaSun className="text-lg" />
            <span className="text-xs mt-1">Breakfast</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <FaUtensilSpoon className="text-lg" />
            <span className="text-xs mt-1">Lunch</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <FaMoon className="text-lg" />
            <span className="text-xs mt-1">Dinner</span>
          </button>
        </div>
      </footer>
    </div>
  );
}