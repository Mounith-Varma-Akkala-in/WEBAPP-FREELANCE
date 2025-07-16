"use client"

import { useState, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)

  const galleryImages = [
    {
      src: "/images/gym1.jpg",
      alt: "Functional Training Area with Artificial Grass",
      title: "Functional Training Zone",
    },
    {
      src: "/images/gym2.jpg",
      alt: "Weight Training Area with Motivational Posters",
      title: "Strength Training Section",
    },
    {
      src: "/images/gym3.jpg",
      alt: "Free Weights and Cable Machines",
      title: "Free Weights Area",
    },
    {
      src: "/images/gym4.jpg",
      alt: "Gym Floor with Modern Equipment",
      title: "Main Workout Floor",
    },
    {
      src: "/images/gym5.jpg",
      alt: "Professional Strength Equipment",
      title: "Professional Equipment",
    },
    {
      src: "/images/gym6.jpg",
      alt: "Cardio Section with Natural Light",
      title: "Cardio Zone",
    },
  ]

  const nextImage = useCallback(() => {
    setActiveIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }, [galleryImages.length])

  const prevImage = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }, [galleryImages.length])

  const handleThumbnailClick = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  return (
    <section className="py-20 bg-black text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "url('/images/background.jpg')",
          backgroundSize: "200px 200px",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">OUR GALLERY</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            Take a look at our state-of-the-art facilities and vibrant fitness community
          </p>
        </motion.div>

        <div className="relative" ref={galleryRef}>
          {/* Featured Image */}
          <div className="relative h-[500px] md:h-[600px] rounded-lg overflow-hidden mb-4">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={galleryImages[activeIndex].src || "/placeholder.svg"}
                alt={galleryImages[activeIndex].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                priority={activeIndex === 0}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

            {/* Image Title */}
            <div className="absolute bottom-6 left-6 z-20">
              <h3 className="text-2xl font-bold text-white">{galleryImages[activeIndex].title}</h3>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {galleryImages.map((image, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative h-20 rounded-md overflow-hidden cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                  activeIndex === index ? "ring-2 ring-red-600" : "opacity-70"
                }`}
                onClick={() => handleThumbnailClick(index)}
                aria-label={`View ${image.title}`}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 16vw"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
