"use client"

import { motion } from "framer-motion"

export default function HomeSection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.h1
          className="text-6xl md:text-8xl mb-2 tracking-tighter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            CLOSE
          </motion.span>{" "}
          <motion.span
            className="text-yellow-400"
            initial={{ opacity: 0, x: 20, rotate: -10 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.5 },
            }}
          >
            IN
          </motion.span>
        </motion.h1>

        <motion.div
          className="absolute -z-10 w-full h-full top-0 left-0 opacity-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div
            className="w-full h-full bg-yellow-400 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <motion.h2
          className="text-xl md:text-2xl mb-6 font-light tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Building Digital Presence for Local Businesses
        </motion.h2>

        <motion.p
          className="text-base mb-10 leading-relaxed font-light opacity-80 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          Custom ecommerce solutions and portfolio websites that help local businesses establish a powerful online
          presence.
        </motion.p>

        <motion.button
          className="px-8 py-3 bg-black text-white text-sm font-light tracking-widest uppercase rounded-full relative overflow-hidden group"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 1.1 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 bg-yellow-400 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span className="relative z-10" whileHover={{ color: "#000000" }} transition={{ duration: 0.2 }}>
            Our Work
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  )
}
