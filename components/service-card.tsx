"use client"

import { motion } from "framer-motion"
import {
  Dumbbell,
  Music,
  Brain,
  Activity,
  Apple,
  Scale,
  User,
  Zap,
  Heart,
  Flame,
  BarChart,
  Utensils,
  Clock,
} from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  index: number
}

export default function ServiceCard({ title, description, icon, index }: ServiceCardProps) {
  // Map icon string to Lucide icon component
  const IconComponent = () => {
    switch (icon) {
      case "dumbbell":
        return <Dumbbell className="h-8 w-8" />
      case "music":
        return <Music className="h-8 w-8" />
      case "brain":
        return <Brain className="h-8 w-8" />
      case "activity":
        return <Activity className="h-8 w-8" />
      case "apple":
        return <Apple className="h-8 w-8" />
      case "scale":
        return <Scale className="h-8 w-8" />
      case "user":
        return <User className="h-8 w-8" />
      case "zap":
        return <Zap className="h-8 w-8" />
      case "heart":
        return <Heart className="h-8 w-8" />
      case "flame":
        return <Flame className="h-8 w-8" />
      case "chart":
        return <BarChart className="h-8 w-8" />
      case "food":
        return <Utensils className="h-8 w-8" />
      case "clock":
        return <Clock className="h-8 w-8" />
      default:
        return <Dumbbell className="h-8 w-8" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-yellow-200 will-change-transform"
    >
      <div className="p-8 relative">
        {/* Background Gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon Container */}
        <motion.div
          className="relative mb-6"
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-yellow-500/25 transition-all duration-300">
            <IconComponent />
          </div>
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>

        {/* Hover Effect Line */}
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
