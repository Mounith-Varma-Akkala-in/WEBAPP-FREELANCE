"use client"

import { motion } from "framer-motion"
import { MapPin, Mail, Phone } from "lucide-react"

export default function ContactSection() {
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
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.h2 className="text-3xl font-light mb-6 tracking-tight" variants={itemVariants} whileHover={{ x: 5 }}>
        Contact <span className="gradient-text font-medium">Us</span>
      </motion.h2>

      <motion.p className="text-base mb-12 max-w-2xl font-light" variants={itemVariants}>
        Ready to elevate your business's online presence? Get in touch with us today.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div variants={itemVariants} className="relative">
          <motion.div
            className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-30"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {["name", "email"].map((field, index) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.input
                    type={field === "email" ? "email" : "text"}
                    className="w-full p-3 bg-white/80 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-xl text-sm font-light transition-all duration-300"
                    placeholder={`Your ${field}`}
                    whileFocus={{ scale: 1.02, borderColor: "#FACC15" }}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.input
                type="text"
                className="w-full p-3 bg-white/80 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-xl text-sm font-light transition-all duration-300"
                placeholder="Subject"
                whileFocus={{ scale: 1.02, borderColor: "#FACC15" }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.textarea
                rows={4}
                className="w-full p-3 bg-white/80 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-xl text-sm font-light transition-all duration-300"
                placeholder="Your message"
                whileFocus={{ scale: 1.02, borderColor: "#FACC15" }}
              />
            </motion.div>

            <motion.button
              type="submit"
              className="px-8 py-3 bg-black text-white text-xs font-light tracking-widest uppercase rounded-full relative overflow-hidden group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
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
                Send Message
              </motion.span>
            </motion.button>
          </form>
        </motion.div>

        <motion.div className="space-y-8" variants={itemVariants}>
          {[
            {
              title: "Our Location",
              icon: MapPin,
              content: (
                <p className="text-sm font-light">
                  123 Web Design Street
                  <br />
                  Digital District, Tech City
                </p>
              ),
            },
            {
              title: "Contact Information",
              icon: null,
              content: (
                <div className="space-y-3">
                  <motion.div className="flex items-center" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Mail className="mr-3 h-5 w-5 text-yellow-400" />
                    <a
                      href="mailto:info@closein.com"
                      className="hover:text-yellow-500 transition-colors text-sm font-light"
                    >
                      info@closein.com
                    </a>
                  </motion.div>
                  <motion.div className="flex items-center" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Phone className="mr-3 h-5 w-5 text-yellow-400" />
                    <a href="tel:+1234567890" className="hover:text-yellow-500 transition-colors text-sm font-light">
                      (123) 456-7890
                    </a>
                  </motion.div>
                </div>
              ),
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ x: 5, scale: 1.02 }}
              className="p-6 bg-white/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <motion.h3
                className="text-lg font-medium mb-3 tracking-tight flex items-center"
                whileHover={{ color: "#FACC15" }}
                transition={{ duration: 0.2 }}
              >
                {item.icon && <item.icon className="mr-3 h-5 w-5 text-yellow-400" />}
                {item.title}
              </motion.h3>
              {item.content}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
