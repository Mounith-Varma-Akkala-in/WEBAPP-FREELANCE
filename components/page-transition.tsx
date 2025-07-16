"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Reset ready state on route change
    setIsReady(false)

    // Use requestAnimationFrame for smoother transitions
    const timer = requestAnimationFrame(() => {
      setIsReady(true)
    })

    return () => cancelAnimationFrame(timer)
  }, [pathname])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
          delay: isReady ? 0 : 0.1,
        }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
