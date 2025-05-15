"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface WhatsAppLiveProps {
  phoneNumber?: string;
  message?: string;
}

const WhatsAppLive = ({
  phoneNumber = "+8801518935317",
  message = "Hello, How can I help you? Please message me",
}: WhatsAppLiveProps) => {
  const [isVisible, setIsVisible] = useState(false);

  // Create WhatsApp link with phone number and message
  const whatsappLink = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(
    message
  )}&type=phone_number&app_absent=0`;

  useEffect(() => {
    const handleScroll = () => {
      // Make button visible after scrolling down a bit
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const checkScrollVisibility = () => {
      // Calculate if page is scrollable
      const contentHeight = document.documentElement.scrollHeight;
      const viewportHeight = document.documentElement.clientHeight;

      // If page is tall enough to scroll, add scroll listener
      // Otherwise, just show the button
      if (contentHeight > viewportHeight + 200) {
        handleScroll();
        window.addEventListener("scroll", handleScroll);
      } else {
        setIsVisible(true);
      }
    };

    // Check immediately and set up listeners
    checkScrollVisibility();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed z-50 lg:right-10 lg:bottom-16 right-8 bottom-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
          aria-label="Chat on WhatsApp"
        >
          <div className="relative">
            {/* Pulsing animation */}
            <span className="absolute -z-10 inset-0 flex items-center justify-center">
              <span className="animate-ping absolute w-full h-full rounded-full bg-green-500/30"></span>
            </span>
            
            {/* WhatsApp icon */}
            <motion.div
              className="relative z-10 w-14 h-14 flex items-center justify-center bg-white rounded-full shadow-lg"
            >
              <Image
                src="/whatsapp.png"
                width={50}
                height={50}
                alt="WhatsApp Chat"
                className="w-12 h-12"
              />
            </motion.div>
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppLive;