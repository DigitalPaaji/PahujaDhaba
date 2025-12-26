'use client';

import { FaStar, FaLeaf, FaFire } from 'react-icons/fa';

export default function MenuItem({ item }) {
  return (
    <div className="card overflow-hidden hover:scale-[1.02] transition-transform">
      <div className="relative">
        {item.image ? (
          <img 
            src={`http://localhost:5000${item.image}`} 
            alt={item.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <span className="text-white text-4xl">{item.category === 'breakfast' ? '🍳' : 
              item.category === 'lunch' ? '🍛' : 
              item.category === 'dinner' ? '🍽️' : '🥗'}</span>
          </div>
        )}
        
        <div className="absolute top-2 right-2 flex space-x-2">
          {item.type === 'veg' && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded flex items-center">
              <FaLeaf className="mr-1" /> Veg
            </span>
          )}
          {item.rating > 4 && (
            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded flex items-center">
              <FaStar className="mr-1" /> {item.rating}
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg truncate">{item.name}</h3>
          <span className="text-xl font-bold text-primary">₹{item.price}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 capitalize">{item.category}</span>
          <button className="btn-primary text-sm px-4 py-2">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}