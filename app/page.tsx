"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"
import Navbar from "@/components/navbar"
import ShapeAnimation from "@/components/shape-animation"
import CustomCursor from "@/components/custom-cursor"
import LoadingAnimation from "@/components/loading-animation"
import HomeSection from "@/components/home-section"
import AboutSection from "@/components/about-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import SocialSection from "@/components/social-section"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
    social: useRef<HTMLDivElement>(null),
  }

  const scrollToSection = (section: string) => {
    sectionRefs[section as keyof typeof sectionRefs].current?.scrollIntoView({
      behavior: "smooth",
    })
    setActiveSection(section)
  }

  useEffect(() => {
    // Handle loading animation - optimized timing
    const timer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => {
        setShowContent(true)
      }, 300)
    }, 1500) // Reduced from 2000ms to 1500ms

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      // Update active section
      const scrollPosition = window.scrollY + 100

      Object.entries(sectionRefs).forEach(([section, ref]) => {
        if (
          ref.current &&
          scrollPosition >= ref.current.offsetTop &&
          scrollPosition < ref.current.offsetTop + ref.current.offsetHeight
        ) {
          setActiveSection(section)
        }
      })

      // Calculate scroll progress
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    if (showContent) {
      window.addEventListener("scroll", handleScroll)
    }

    return () => window.removeEventListener("scroll", handleScroll)
  }, [showContent])

  if (isLoading) {
    return <LoadingAnimation />
  }

  return (
    <main className="relative min-h-screen bg-white text-black overflow-hidden">
      <CustomCursor />
      <ShapeAnimation />

      <AnimatePresence>
        {showContent && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

            {/* Scroll Progress Indicator */}
            <motion.div
              className="fixed top-0 left-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 z-50"
              style={{ width: `${scrollProgress}%` }}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            />

            <div className="container mx-auto px-4 pt-20">
              <motion.div
                ref={sectionRefs.home}
                id="home"
                className="min-h-screen py-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <HomeSection />
              </motion.div>

              <motion.div
                ref={sectionRefs.about}
                id="about"
                className="min-h-screen py-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <AboutSection />
              </motion.div>

              <motion.div
                ref={sectionRefs.projects}
                id="projects"
                className="min-h-screen py-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <ProjectsSection />
              </motion.div>

              <motion.div
                ref={sectionRefs.contact}
                id="contact"
                className="min-h-screen py-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <ContactSection />
              </motion.div>

              <motion.div
                ref={sectionRefs.social}
                id="social"
                className="min-h-screen py-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <SocialSection />
              </motion.div>
            </div>

            <motion.button
              onClick={() => scrollToSection("home")}
              className="fixed bottom-6 right-6 p-3 bg-black text-white rounded-full shadow-lg z-50 group"
              aria-label="Scroll to top"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.4, delay: 0.8, ease: "easeOut" }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#FACC15",
                color: "#000000",
                boxShadow: "0 10px 25px -5px rgba(250, 204, 21, 0.4)",
                rotate: -5,
              }}
              whileTap={{ scale: 0.9, rotate: 5 }}
            >
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <ArrowUp size={20} />
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
