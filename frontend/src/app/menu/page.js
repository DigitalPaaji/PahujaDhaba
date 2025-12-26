'use client';

import { useState } from 'react';

import MenuSection from '../components/MenuItems';
import menuData from '../../../public/MenuData.json';
import { FaSun, FaUtensilSpoon, FaMoon, FaFilter, FaLeaf } from 'react-icons/fa';
import Layout from '../components/Layout';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('breakfast');
  const [date] = useState(new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));

  const categories = [
    { id: 'breakfast', label: 'Breakfast', icon: <FaSun /> },
    { id: 'lunch', label: 'Lunch', icon: <FaUtensilSpoon /> },
    { id: 'dinner', label: 'Dinner', icon: <FaMoon /> }
  ];

  return (
    <Layout>
      {/* Date Display */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-3 border-b border-orange-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Today's Menu</h2>
            <p className="text-sm text-gray-600">{date}</p>
          </div>
          <button className="flex items-center space-x-1 px-3 py-1.5 bg-white rounded-full border border-gray-300 text-sm">
            <FaFilter className="text-gray-500" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex border-b border-gray-200 bg-white overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-3 min-w-max ${
              activeCategory === category.id
                ? 'border-b-2 border-orange-500 text-orange-600 bg-orange-50'
                : 'text-gray-500'
            }`}
          >
            <span className={`text-lg ${activeCategory === category.id ? 'text-orange-500' : 'text-gray-400'}`}>
              {category.icon}
            </span>
            <span className="font-medium">{category.label}</span>
          </button>
        ))}
      </div>

      {/* Menu Content */}
      <div className="px-4 py-6">
        {activeCategory === 'breakfast' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
              <h3 className="text-xl font-bold text-gray-800">Breakfast Special</h3>
            </div>
            <MenuSection title="Parathas" items={menuData.breakfast.parathas} />
            <MenuSection title="Accompaniments" items={menuData.breakfast.others} />
          </div>
        )}

        {activeCategory === 'lunch' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-1 h-6 bg-green-500 rounded-full"></div>
              <h3 className="text-xl font-bold text-gray-800">Lunch Special</h3>
            </div>
            <MenuSection title="Sabji" items={menuData.lunch.sabji} />
            <MenuSection title="Rice" items={menuData.lunch.rice} />
          </div>
        )}

        {activeCategory === 'dinner' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
              <h3 className="text-xl font-bold text-gray-800">Dinner Special</h3>
            </div>
            <MenuSection title="Combos" items={menuData.dinner.combos} />
            <MenuSection title="Rice" items={menuData.dinner.rice} />
          </div>
        )}
      </div>

      {/* Veg Indicator */}
      <div className="fixed bottom-20 right-4">
        <div className="bg-green-500 text-white p-3 rounded-full shadow-lg">
          <FaLeaf className="text-xl" />
        </div>
      </div>
    </Layout>
  );
}