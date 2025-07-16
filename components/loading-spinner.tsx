"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative h-16 w-16 rounded-full overflow-hidden border-4 border-yellow-500 shadow-2xl bg-white/10 backdrop-blur-sm mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Image src="/images/new-logo.png" alt="Gravity Fitness Logo" fill className="object-contain p-2" priority />
        </motion.div>
        <motion.p
          className="text-white mt-4 font-bold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          GRAVITY FITNESS
        </motion.p>
      </motion.div>
    </div>
  )
}
