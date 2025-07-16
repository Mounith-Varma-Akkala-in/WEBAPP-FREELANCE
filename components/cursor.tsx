"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useMousePosition } from "@/hooks/use-mouse-position"

type CursorVariant = "default" | "link"

interface CursorProps {
  variant: CursorVariant
}

export function Cursor({ variant }: CursorProps) {
  const mousePosition = useMousePosition()
  const [isVisible, setIsVisible] = useState(false)

  // Show cursor after a delay to prevent initial animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [])

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = "none"

    return () => {
      document.body.style.cursor = "auto"
    }
  }, [])

  // Cursor variants
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(0, 0, 0, 0)",
      border: "2px solid #000",
      mixBlendMode: "difference" as const,
    },
    link: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      backgroundColor: "rgba(255, 0, 0, 0.2)",
      border: "2px solid #ff0000",
      mixBlendMode: "normal" as const,
    },
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
        variants={variants}
        animate={variant}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        style={{ opacity: isVisible ? 1 : 0 }}
      />

      {/* Dot cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 bg-red-600"
        style={{
          height: 8,
          width: 8,
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 28, mass: 0.1 }}
      />
    </>
  )
}
