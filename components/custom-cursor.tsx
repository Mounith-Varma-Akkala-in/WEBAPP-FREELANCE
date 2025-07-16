"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show cursor only after it's positioned correctly to avoid jumps
    setTimeout(() => {
      setIsVisible(true)
    }, 500)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        const isClickable =
          e.target.tagName === "BUTTON" ||
          e.target.tagName === "A" ||
          e.target.closest("button") ||
          e.target.closest("a") ||
          e.target.classList.contains("clickable") ||
          e.target.closest(".clickable")

        setIsHovering(!!isClickable)
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    // Hide default cursor
    document.documentElement.style.cursor = "none"

    // Add clickable class to interactive elements
    document.querySelectorAll("button, a, input, textarea, select").forEach((el) => {
      el.classList.add("clickable")
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.documentElement.style.cursor = "auto"
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      <motion.div
        className="fixed rounded-full z-[9999] pointer-events-none mix-blend-difference"
        style={{
          backgroundColor: isHovering ? "#FACC15" : "#000000",
          width: isHovering ? "36px" : "12px",
          height: isHovering ? "36px" : "12px",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          x: mousePosition.x - (isHovering ? 18 : 6),
          y: mousePosition.y - (isHovering ? 18 : 6),
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 150,
          mass: 0.1,
        }}
      />
      <motion.div
        className="fixed rounded-full border border-black opacity-20 z-[9998] pointer-events-none"
        style={{
          width: "30px",
          height: "30px",
          opacity: isVisible ? 0.2 : 0,
        }}
        animate={{
          x: mousePosition.x - 15,
          y: mousePosition.y - 15,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 100,
          mass: 0.1,
          delay: 0.02,
        }}
      />
    </>
  )
}
