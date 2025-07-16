"use client"

import { motion } from "framer-motion"

export default function AboutSection() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div variants={itemVariants}>
        <motion.h2
          className="text-3xl font-light mb-6 tracking-tight"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          About <span className="gradient-text font-medium">Us</span>
        </motion.h2>

        <div className="space-y-4 text-base font-light">
          <motion.p variants={itemVariants}>
            At CLOSE IN, we bridge the gap between local businesses and the digital world, empowering enterprises with
            powerful web solutions.
          </motion.p>

          <motion.p variants={itemVariants}>
            We combine technical expertise with creative design to deliver websites that look exceptional and perform
            excellently.
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        className="bg-gray-50 p-8 relative rounded-2xl overflow-hidden group"
        variants={itemVariants}
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black to-yellow-400"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-black to-yellow-400"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        <motion.h3
          className="text-xl font-medium mb-6 tracking-tight"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          Our Expertise
        </motion.h3>

        <ul className="space-y-4 text-sm">
          {[
            "Custom eCommerce Development",
            "Portfolio & Showcase Websites",
            "Responsive Web Design",
            "Local SEO Optimization",
          ].map((item, index) => (
            <motion.li
              key={item}
              className="flex items-start group/item"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ x: 5 }}
            >
              <motion.span
                className="mr-3 text-yellow-400 text-xl"
                whileHover={{ scale: 1.2, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                •
              </motion.span>
              <span className="font-light group-hover/item:text-yellow-600 transition-colors duration-200">{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}
