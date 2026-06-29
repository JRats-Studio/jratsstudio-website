"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntersectionObserver } from "@/hooks";


interface ImageItem {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

interface InteractiveGalleryProps {
  images: ImageItem[];
  accentColor?: string;
}

export const InteractiveGallery: React.FC<InteractiveGalleryProps> = ({
  images,
  accentColor = "#08cb00",
}) => {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(
    images[0] || null
  );
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <div ref={elementRef} className="py-12">
      {/* Main featured image */}
      <motion.div className="relative mb-8 overflow-hidden rounded-2xl aspect-video">
        <AnimatePresence mode="wait">
          {selectedImage && (
            <motion.img
              key={selectedImage.id}
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

        {/* Title overlay */}
        {selectedImage?.title && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-bold">{selectedImage.title}</h2>
          </motion.div>
        )}
      </motion.div>

      {/* Thumbnail carousel */}
      <div className="relative">
        <motion.div
          className="flex gap-4 overflow-x-auto pb-4 px-4"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        >
          {images.map((image, index) => (
            <motion.button
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className={`flex-shrink-0 relative rounded-lg overflow-hidden cursor-pointer transition-all ${
                selectedImage?.id === image.id ? "ring-2" : "opacity-60"
              }`}
              style={{
                width: "140px",
                height: "100px",
              }}
              whileHover={{ opacity: 1, scale: 1.05 }}

              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />

              {/* Active indicator */}
              {selectedImage?.id === image.id && (
                <motion.div
                  className="absolute inset-0 border-2"
                  style={{ borderColor: accentColor }}
                  layoutId="gallery-indicator"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Scroll hint */}
        {images.length > 5 && (
          <motion.div
            className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black pointer-events-none"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
    </div>
  );
};



