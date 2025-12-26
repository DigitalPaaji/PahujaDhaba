'use client';

import { FaPhone, FaUtensils } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const handleCall = () => {
    window.location.href = 'tel:9888687817';
  };

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full -translate-y-32 translate-x-16 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-200 to-amber-200 rounded-full -translate-x-12 translate-y-12 opacity-30"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-lg"
        >
          {/* Logo Container */}
          <div className="p-4">
            <div className="text-center ">
              <Image 
                src="/logo3.png" 
                alt="Pahuja Vaishno Dhaba" 
                width={400}
                height={200}
                className="w-full h-auto mx-auto"
                priority
              />
            </div>
            
   
          </div>

          {/* Action Buttons */}
          <div className="mx-auto w-fit mb-12">
            <Link href="/menu">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 px-6 mb-4 bg-gradient-to-b from-green-600 to-green-800 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                <FaUtensils className="text-xl" />
                View Full Menu
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCall}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#4E56C0] to-[#4E56C0] text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
            >
              <FaPhone className="text-xl" />
              Call Now: 9888687817
            </motion.button>
          </div>

       
          {/* Footer Note */}
          <div className="mt-10 text-center">
            <p className="text-gray-600 italic">
              Freshly cooked daily with love and care
            </p>
                  <p className="text-gray-600 italic">
              🕒 Operating Hours : 10:00 AM - 10:00 PM
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Family owned • Since 2016 • Perfectly Spiced
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}