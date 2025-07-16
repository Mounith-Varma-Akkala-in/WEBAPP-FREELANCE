"use client"

import { motion } from "framer-motion"

const projects = [
  {
    id: 1,
    title: "Artisan Bakery",
    category: "eCommerce",
    description: "Online ordering system for a local bakery.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "Architectural Studio",
    category: "Portfolio",
    description: "Minimalist portfolio showcasing architectural projects.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "Local Boutique",
    category: "eCommerce",
    description: "Fashion boutique with inventory management.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "Photography Services",
    category: "Portfolio",
    description: "Photographer's portfolio with booking system.",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function ProjectsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
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
        Our <span className="gradient-text font-medium">Projects</span>
      </motion.h2>

      <motion.p
        className="text-base mb-12 max-w-2xl font-light"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        We've helped numerous local businesses establish their digital presence. Here are some of our recent projects.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500"
            variants={itemVariants}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
          >
            <div className="relative h-[250px] overflow-hidden">
              <motion.div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <motion.div
                className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 text-xs rounded-full z-20 font-light tracking-wider"
                initial={{ opacity: 0, x: -10, scale: 0.8 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                {project.category}
              </motion.div>
            </div>

            <motion.div
              className="p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.h3
                className="text-lg font-medium mb-2 tracking-tight"
                whileHover={{ x: 5, color: "#FACC15" }}
                transition={{ duration: 0.2 }}
              >
                {project.title}
              </motion.h3>
              <p className="text-gray-600 text-sm mb-4 font-light">{project.description}</p>
              <motion.button
                className="text-black text-xs font-light tracking-widest uppercase inline-flex items-center group/btn"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="group-hover/btn:text-yellow-500 transition-colors duration-200">View Project</span>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  whileHover={{ x: 3, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </motion.svg>
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
