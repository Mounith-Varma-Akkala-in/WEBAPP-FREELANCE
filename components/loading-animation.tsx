"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface ExplodingShape {
  id: number
  x: number
  y: number
  size: number
  type: "square" | "triangle" | "circle"
  color: string
  delay: number
}

export default function LoadingAnimation() {
  const [shapes, setShapes] = useState<ExplodingShape[]>([])
  const [explode, setExplode] = useState(false)

  useEffect(() => {
    // Generate shapes for explosion
    const newShapes: ExplodingShape[] = []
    const shapeCount = 60

    for (let i = 0; i < shapeCount; i++) {
      newShapes.push({
        id: i,
        x: 50 + (Math.random() - 0.5) * 10,
        y: 50 + (Math.random() - 0.5) * 10,
        size: Math.random() * 20 + 6,
        type: Math.random() > 0.6 ? "circle" : Math.random() > 0.3 ? "square" : "triangle",
        color: Math.random() > 0.5 ? "#FACC15" : "#000000",
        delay: Math.random() * 0.2,
      })
    }

    setShapes(newShapes)

    // Trigger explosion
    const explodeTimer = setTimeout(() => {
      setExplode(true)
    }, 100)

    return () => {
      clearTimeout(explodeTimer)
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 bg-white z-[9999] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Exploding shapes */}
      <div className="absolute inset-0">
        {shapes.map((shape) => (
          <motion.div
            key={shape.id}
            className="absolute"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
            }}
            initial={{
              scale: 0,
              opacity: 0,
              x: 0,
              y: 0,
            }}
            animate={
              explode
                ? {
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                    x: (Math.random() - 0.5) * 1000,
                    y: (Math.random() - 0.5) * 1000,
                    rotate: Math.random() * 360,
                  }
                : {
                    scale: [0, 0.5],
                    opacity: [0, 0.8],
                  }
            }
            transition={{
              duration: explode ? 1.2 : 0.3,
              delay: shape.delay,
              ease: explode ? [0.25, 0.46, 0.45, 0.94] : "easeOut",
            }}
          >
            {shape.type === "square" ? (
              <div className="w-full h-full rounded-lg" style={{ backgroundColor: shape.color }} />
            ) : shape.type === "circle" ? (
              <div className="w-full h-full rounded-full" style={{ backgroundColor: shape.color }} />
            ) : (
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${shape.size / 2}px solid transparent`,
                  borderRight: `${shape.size / 2}px solid transparent`,
                  borderBottom: `${shape.size}px solid ${shape.color}`,
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Overlay for smooth transition */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: explode ? 1 : 0 }}
        transition={{ duration: 0.4, delay: explode ? 0.8 : 0 }}
      />
    </motion.div>
  )
}
