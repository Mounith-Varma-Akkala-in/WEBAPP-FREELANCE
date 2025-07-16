"use client"

import { motion } from "framer-motion"
import { Instagram, Twitter, Facebook, Linkedin, Github } from "lucide-react"

export default function SocialSection() {
  const socialLinks = [
    { name: "Instagram", icon: Instagram, url: "#" },
    { name: "Twitter", icon: Twitter, url: "#" },
    { name: "Facebook", icon: Facebook, url: "#" },
    { name: "LinkedIn", icon: Linkedin, url: "#" },
    { name: "GitHub", icon: Github, url: "#" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <div>
      <motion.h2
        className="text-3xl font-light mb-6 tracking-tight"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        whileHover={{ x: 5 }}
      >
        Connect <span className="gradient-text font-medium">With Us</span>
      </motion.h2>

      <motion.p
        className="text-base mb-12 max-w-2xl font-light"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        Follow us on social media to stay updated with our latest projects and web design trends.
      </motion.p>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.url}
            className="flex flex-col items-center justify-center p-6 border border-gray-50 hover:border-yellow-200 rounded-xl transition-all duration-300 bg-white/50 hover:bg-white shadow-sm hover:shadow-md group"
            variants={itemVariants}
            whileHover={{
              y: -8,
              scale: 1.05,
              backgroundColor: "#FFFBEB",
              borderColor: "#FACC15",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              whileHover={{
                rotate: [0, -10, 10, -10, 0],
                scale: 1.2,
                transition: { duration: 0.5 },
              }}
            >
              <social.icon className="h-6 w-6 mb-3 text-yellow-400 group-hover:text-yellow-500 transition-colors duration-200" />
            </motion.div>
            <motion.span
              className="text-xs font-light tracking-widest uppercase group-hover:text-yellow-600 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
            >
              {social.name}
            </motion.span>
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <motion.p
          className="text-xs text-gray-400 font-light tracking-wider"
          whileHover={{ scale: 1.05, color: "#FACC15" }}
          transition={{ duration: 0.2 }}
        >
          © {new Date().getFullYear()} CLOSE IN
        </motion.p>
      </motion.div>
    </div>
  )
}
