import React from 'react';
import { FaRupeeSign, FaLeaf } from 'react-icons/fa';

export default function MenuSection({ title, items }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
        {title}
      </h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                  {item.veg && (
                    <span className="text-green-600 text-xs">
                      <FaLeaf />
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <div className="flex items-center text-orange-600 font-semibold">
                  <FaRupeeSign className="text-sm" />
                  <span className="text-lg">{item.price}</span>
                </div>
              </div>
              <button className="ml-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all active:scale-95">
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}