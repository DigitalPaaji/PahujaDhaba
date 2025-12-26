'use client';

import { FaSearch } from 'react-icons/fa';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for dishes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
      />
      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
}