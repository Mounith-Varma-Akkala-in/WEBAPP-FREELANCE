"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Quote, Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  role: string
  content: string
  avatar: string
  index: number
}

export default function TestimonialCard({ name, role, content, avatar, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-yellow-200 relative will-change-transform"
    >
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 text-yellow-500/20 group-hover:text-yellow-500/30 transition-colors duration-300">
        <Quote className="h-12 w-12" />
      </div>

      <div className="p-8 relative">
        {/* Stars */}
        <div className="flex space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        {/* Content */}
        <motion.p
          className="text-gray-700 mb-6 leading-relaxed relative z-10 italic"
          initial={{ opacity: 0.8 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          "{content}"
        </motion.p>

        {/* Profile */}
        <div className="flex items-center">
          <div className="relative h-14 w-14 mr-4 overflow-hidden rounded-full border-3 border-yellow-500 shadow-lg">
            <Image
              src={avatar || "/placeholder.svg"}
              alt={`${name} avatar`}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{name}</h3>
            <p className="text-yellow-600 font-medium">{role}</p>
          </div>
        </div>

        {/* Hover Effect */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}
