"use client";

import { menuData } from "./MenuItems";
import {
  MdLunchDining,
  MdDinnerDining
} from "react-icons/md";
import { GiFlatbread } from "react-icons/gi";
import { FaGlassCheers } from "react-icons/fa";

const icons = {
  GiFlatbread: <GiFlatbread className="text-xl text-orange-600" />,
  MdLunchDining: <MdLunchDining className="text-xl text-green-600" />,
  MdDinnerDining: <MdDinnerDining className="text-xl text-purple-600" />,
  FaGlassCheers: <FaGlassCheers className="text-xl text-blue-600" />
};

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      
      {/* Header */}
      <h1 className="text-2xl font-bold text-center mb-6">
        🍽️ Today’s Menu
      </h1>

      {/* Menu Sections */}
      <div className="space-y-6">
        {menuData.map((section, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-sm p-4"
          >
            {/* Category Title */}
            <div className="flex items-center gap-3 mb-4">
              {icons[section.icon]}
              <h2 className="text-lg font-semibold">
                {section.category}
              </h2>
            </div>

            {/* Items */}
            <ul className="space-y-3">
              {section.items.map((item, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center border-b pb-2 last:border-none"
                >
                  <span className="text-gray-700 text-sm">
                    {item.name}
                  </span>
                  <span className="text-gray-900 font-semibold text-sm">
                    ₹{item.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
