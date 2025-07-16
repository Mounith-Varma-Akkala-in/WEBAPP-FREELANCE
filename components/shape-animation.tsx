"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Shape {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  type: "square" | "triangle" | "circle" | "dot"
  duration: number
  delay: number
  opacity: number
}

export default function ShapeAnimation() {
  const [shapes, setShapes] = useState<Shape[]>([])

  useEffect(() => {
    // Generate random shapes
    const newShapes: Shape[] = []
    const shapeCount = 60 // Increased from 50 to 60

    for (let i = 0; i < shapeCount; i++) {
      const type =
        Math.random() > 0.8 ? "dot" : Math.random() > 0.6 ? "circle" : Math.random() > 0.3 ? "square" : "triangle"

      const size = type === "dot" ? Math.random() * 4 + 2 : Math.random() * 25 + 10

      newShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        rotation: Math.random() * 360,
        type,
        duration: Math.random() * 25 + 15,
        delay: Math.random() * 5,
        opacity: type === "dot" ? Math.random() * 0.3 + 0.1 : Math.random() * 0.15 + 0.05,
      })
    }

    setShapes(newShapes)
  }, [])

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            opacity: shape.opacity,
          }}
          animate={{
            x: [0, Math.random() * 120 - 60, 0],
            y: [0, Math.random() * 120 - 60, 0],
            rotate: [0, shape.rotation, 0],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {shape.type === "square" ? (
            <div className="w-full h-full bg-black rounded-lg" />
          ) : shape.type === "circle" ? (
            <div className="w-full h-full bg-black rounded-full" />
          ) : shape.type === "dot" ? (
            <div className="w-full h-full bg-yellow-400 rounded-full" />
          ) : (
            <div
              className="w-full h-full"
              style={{
                width: 0,
                height: 0,
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid black`,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}
