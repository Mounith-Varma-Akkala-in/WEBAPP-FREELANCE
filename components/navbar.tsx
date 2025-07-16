"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface NavbarProps {
  activeSection: string
  scrollToSection: (section: string) => void
}

export default function Navbar({ activeSection, scrollToSection }: NavbarProps) {
  const navItems = ["home", "about", "projects", "contact", "social"]

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md z-50 py-4 px-4 border-b border-gray-100/50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="container mx-auto flex justify-center items-center">
        <ul className="flex items-center space-x-6 md:space-x-10">
          {navItems.slice(0, 2).map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
            >
              <motion.button
                onClick={() => scrollToSection(item)}
                className={`text-sm uppercase tracking-widest transition-all duration-300 relative ${
                  activeSection === item ? "font-medium text-yellow-500" : "font-light hover:text-yellow-400"
                }`}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
                {activeSection === item && (
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-400"
                    layoutId="activeIndicator"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </motion.button>
            </motion.li>
          ))}

          <motion.li
            className="mx-2 md:mx-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/" className="text-2xl md:text-3xl font-medium tracking-tighter">
              <motion.div
                className="relative inline-block group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  animate={{
                    textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 10px rgba(250,204,21,0.3)", "0 0 0px rgba(0,0,0,0)"],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  CLOSE
                </motion.span>
                <motion.span
                  className="text-yellow-400 ml-1"
                  animate={{
                    opacity: [0.8, 1, 0.8],
                    y: [0, -1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  IN
                </motion.span>
              </motion.div>
            </Link>
          </motion.li>

          {navItems.slice(2).map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 + index * 0.05 }}
            >
              <motion.button
                onClick={() => scrollToSection(item)}
                className={`text-sm uppercase tracking-widest transition-all duration-300 relative ${
                  activeSection === item ? "font-medium text-yellow-500" : "font-light hover:text-yellow-400"
                }`}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
                {activeSection === item && (
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-400"
                    layoutId="activeIndicator"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  )
}
