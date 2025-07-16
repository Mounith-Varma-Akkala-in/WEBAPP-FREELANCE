"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface StatsCounterProps {
  end: number
  title: string
}

export default function StatsCounter({ end, title }: StatsCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startValue = 0
    const duration = 2000 // 2 seconds
    const frameDuration = 1000 / 60 // 60fps
    const totalFrames = Math.round(duration / frameDuration)
    const increment = end / totalFrames

    let currentFrame = 0

    const counter = setInterval(() => {
      currentFrame++
      startValue += increment

      if (currentFrame === totalFrames) {
        clearInterval(counter)
        setCount(end)
      } else {
        setCount(Math.floor(startValue))
      }
    }, frameDuration)

    return () => clearInterval(counter)
  }, [end])

  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
        className="text-4xl font-bold mb-2"
      >
        {count.toLocaleString()}
      </motion.div>
      <div className="text-sm text-gray-400">{title}</div>
    </div>
  )
}
