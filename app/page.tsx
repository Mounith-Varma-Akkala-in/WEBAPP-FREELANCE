"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import { useMousePosition } from "@/hooks/use-mouse-position"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Menu, X, ArrowRight, ExternalLink, Github, Instagram, Linkedin } from "lucide-react"
import { Cursor } from "@/components/cursor"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useMousePosition()
  const { scrollY } = useScroll()

  // Handle initial load animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Handle cursor hover states
  const handleLinkHover = () => setCursorVariant("link")
  const handleLinkLeave = () => setCursorVariant("default")

  // Handle section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "work", "connect"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (!element) return false

        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <Cursor variant={cursorVariant} />

      {/* Initial loader */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 bg-white z-50 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
              className="text-[200px] font-black text-red-600"
            >
              M
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="relative bg-white min-h-screen overflow-hidden" ref={containerRef}>
        {/* Navigation */}
        <header className="fixed top-0 left-0 right-0 z-40 mix-blend-difference">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <Link
              href="/"
              className="text-white font-bold text-2xl"
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              Me!
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {["Projects?", "Work?", "Connect?"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace("?", "")}`}
                  className={cn(
                    "text-white hover:opacity-70 transition-opacity",
                    activeSection === item.toLowerCase().replace("?", "") && "font-bold",
                  )}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  {item}
                </Link>
              ))}
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(true)}
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 bg-black z-50 p-6 flex flex-col"
            >
              <div className="flex justify-end">
                <button
                  className="text-white"
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col items-center justify-center flex-1 gap-8">
                {["Projects?", "Work?", "Connect?"].map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase().replace("?", "")}`}
                    className="text-white text-3xl font-bold hover:text-red-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    onMouseEnter={handleLinkHover}
                    onMouseLeave={handleLinkLeave}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero section with scattered elements */}
        <section id="home" className="min-h-screen relative pt-20">
          {/* Scattered elements */}
          <ScatteredElements />

          {/* Main name display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="relative text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 1.2,
                  duration: 1.5,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-black leading-tight">
                  Mounith Varma
                  <br />
                  <span className="text-red-600">Akkala</span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                className="mt-8 text-center"
              >
                <h2 className="text-xl md:text-2xl font-medium">Full Stack Developer & Designer</h2>
                <h3 className="text-lg md:text-xl text-red-600">Freelancer • AI Enthusiast • Agency Owner</h3>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            <p className="text-sm mb-2">Scroll to explore</p>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
              <ArrowRight className="w-5 h-5 transform rotate-90" />
            </motion.div>
          </motion.div>
        </section>

        {/* Projects section */}
        <section id="projects" className="min-h-screen relative py-24">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-12 relative"
              >
                <span className="text-red-600 absolute -left-12 top-0 text-9xl opacity-20">P</span>
                Projects?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl mb-16 max-w-3xl"
              >
                These are my freelance projects where I've used AI to accelerate development while focusing on design
                and user experience. Each project showcases different aspects of modern web development.
              </motion.p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Rearrare",
                    url: "rearrare.vercel.app",
                    description: "Modern e-commerce platform with AI-powered recommendations",
                    tech: ["nextjs", "typescript", "vercel"],
                    category: "E-commerce",
                  },
                  {
                    name: "SkillQuest95",
                    url: "skillquest95.vercel.app",
                    description: "Interactive learning platform with gamified experience",
                    tech: ["react", "nodejs", "css3"],
                    category: "Education",
                  },
                  {
                    name: "TEDx Web Design",
                    url: "tedx-web-design.vercel.app",
                    description: "Event website with artistic layout and animations",
                    tech: ["nextjs", "figma", "css3"],
                    category: "Event",
                  },
                  {
                    name: "CloseIn",
                    url: "closein.vercel.app",
                    description: "Social networking platform for local communities",
                    tech: ["react", "nodejs", "typescript"],
                    category: "Social",
                  },
                  {
                    name: "Animaker22",
                    url: "animaker22.vercel.app",
                    description: "Animation tool with AI-powered features",
                    tech: ["nextjs", "python", "figma"],
                    category: "Creative Tool",
                  },
                  {
                    name: "GrooveFitness",
                    url: "groovefitness.in",
                    description: "Fitness platform with personalized workout plans",
                    tech: ["react", "nodejs", "css3"],
                    category: "Health & Fitness",
                  },
                ].map((project, index) => (
                  <ProjectCard key={index} project={project} index={index} />
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-16 text-center"
              >
                <div className="bg-black/5 backdrop-blur-sm border border-red-900/20 rounded-xl p-8">
                  <h3 className="text-2xl font-bold mb-4">Built Using AI</h3>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    All projects leverage AI tools for rapid development, while maintaining focus on custom design, user
                    experience, and performance optimization.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Background elements */}
          <div className="absolute top-1/4 left-10 w-20 h-20 bg-red-600"></div>
          <div className="absolute bottom-1/4 right-10 w-40 h-40 border-2 border-black"></div>
        </section>

        {/* Work section */}
        <section id="work" className="min-h-screen relative py-24 bg-black text-white">
          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-16 relative"
            >
              <span className="text-red-600 absolute -left-12 top-0 text-9xl opacity-20">W</span>
              Work?
            </motion.h2>

            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <h3 className="text-3xl font-bold mb-6">Freelancer & Agency Owner</h3>
                  <p className="text-lg leading-relaxed mb-6">
                    I am a freelancer specializing in modern web development and design. I've built an agency of three
                    talented individuals that connects with businesses to provide comprehensive online presence
                    solutions.
                  </p>
                  <p className="text-lg leading-relaxed mb-8">
                    Our team focuses on creating impactful digital experiences that help businesses grow and connect
                    with their audiences effectively.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-600 mr-3"></div>
                      <p>Full-stack web development</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-600 mr-3"></div>
                      <p>UI/UX design and prototyping</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-600 mr-3"></div>
                      <p>AI-powered development solutions</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-600 mr-3"></div>
                      <p>Digital strategy and consulting</p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-square bg-red-600 flex items-center justify-center">
                      <span className="text-4xl font-bold">3</span>
                    </div>
                    <div className="aspect-square bg-white text-black flex items-center justify-center">
                      <span className="text-lg font-bold text-center">
                        Team
                        <br />
                        Members
                      </span>
                    </div>
                    <div className="aspect-square bg-white text-black flex items-center justify-center">
                      <span className="text-lg font-bold text-center">
                        Digital
                        <br />
                        Agency
                      </span>
                    </div>
                    <div className="aspect-square bg-yellow-400 text-black flex items-center justify-center">
                      <span className="text-lg font-bold text-center">
                        Online
                        <br />
                        Presence
                      </span>
                    </div>
                  </div>

                  <div className="absolute -bottom-8 -right-8 bg-white text-black p-6 w-48 h-48 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold">Available</p>
                      <p className="text-sm">For Projects</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Background elements */}
          <div className="absolute top-20 right-10 w-20 h-20 bg-red-600"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 border-2 border-red-600"></div>
        </section>

        {/* Connect section */}
        <section id="connect" className="min-h-screen relative py-24">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-16 relative"
              >
                <span className="text-red-600 absolute -left-12 top-0 text-9xl opacity-20">C</span>
                Connect?
              </motion.h2>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h3 className="text-3xl font-bold mb-4">Let's Work Together</h3>
                  <p className="text-lg leading-relaxed mb-8">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your
                    vision. Let's connect and create something amazing together.
                  </p>

                  <div className="space-y-6">
                    <Link
                      href="https://www.instagram.com/mounith_varma_akkala/?next=%2Fp%2FC6t7qFgNIwx%2F%3Fimg_index%3D1%26igsh%3DdDNpYnlxOWU1NjFx"
                      target="_blank"
                      className="flex items-center gap-4 p-4 border border-red-900/20 rounded-lg hover:border-red-500 transition-colors group"
                      onMouseEnter={handleLinkHover}
                      onMouseLeave={handleLinkLeave}
                    >
                      <Instagram className="w-6 h-6 text-red-600" />
                      <div>
                        <h4 className="font-bold">Instagram</h4>
                        <p className="text-gray-600">@mounith_varma_akkala</p>
                      </div>
                      <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>

                    <Link
                      href="https://github.com/Mounith-varma-akkala"
                      target="_blank"
                      className="flex items-center gap-4 p-4 border border-red-900/20 rounded-lg hover:border-red-500 transition-colors group"
                      onMouseEnter={handleLinkHover}
                      onMouseLeave={handleLinkLeave}
                    >
                      <Github className="w-6 h-6 text-red-600" />
                      <div>
                        <h4 className="font-bold">GitHub</h4>
                        <p className="text-gray-600">Mounith-varma-akkala</p>
                      </div>
                      <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>

                    <Link
                      href="https://www.linkedin.com/in/mounith-varma-akkala-in"
                      target="_blank"
                      className="flex items-center gap-4 p-4 border border-red-900/20 rounded-lg hover:border-red-500 transition-colors group"
                      onMouseEnter={handleLinkHover}
                      onMouseLeave={handleLinkLeave}
                    >
                      <Linkedin className="w-6 h-6 text-red-600" />
                      <div>
                        <h4 className="font-bold">LinkedIn</h4>
                        <p className="text-gray-600">mounith-varma-akkala-in</p>
                      </div>
                      <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-square bg-red-600"></div>
                    <div className="aspect-square bg-black"></div>
                    <div className="aspect-square bg-black"></div>
                    <div className="aspect-square bg-yellow-400"></div>
                  </div>

                  <div className="absolute -bottom-8 -right-8 bg-black text-white p-6 w-48 h-48 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold">Let's</p>
                      <p className="text-2xl font-bold">Connect</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Background elements */}
          <div className="absolute top-1/4 left-10 w-16 h-16 bg-red-600"></div>
          <div className="absolute bottom-1/4 right-10 w-32 h-32 border-2 border-black"></div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Mounith Varma Akkala</h3>
                <p className="text-gray-400 mb-4">
                  Full Stack Developer & Designer creating digital experiences with AI-powered solutions.
                </p>
                <p className="text-gray-400">© 2025 Mounith Varma Akkala. All rights reserved.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Services</h3>
                <p className="text-gray-400 mb-2">Web Development</p>
                <p className="text-gray-400 mb-2">UI/UX Design</p>
                <p className="text-gray-400 mb-2">AI Integration</p>
                <p className="text-gray-400">Digital Strategy</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {["nextjs", "react", "typescript", "nodejs", "python", "figma"].map((tech) => (
                    <div key={tech} className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                      <Image
                        src={`/icons/${tech}.${tech === "nextjs" ? "jpeg" : "png"}`}
                        alt={tech}
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

// Component for scattered elements in hero section
function ScatteredElements() {
  const elements = [
    { top: "10%", left: "5%", width: "80px", height: "80px", bg: "bg-red-600", delay: 0.2 },
    { top: "15%", left: "20%", width: "40px", height: "40px", bg: "bg-black", delay: 0.3 },
    { top: "30%", left: "15%", width: "60px", height: "60px", bg: "bg-red-600", delay: 0.4 },
    { top: "50%", left: "8%", width: "100px", height: "100px", bg: "bg-black", delay: 0.5 },
    { top: "70%", left: "12%", width: "50px", height: "50px", bg: "bg-red-600", delay: 0.6 },
    { top: "85%", left: "5%", width: "70px", height: "70px", bg: "bg-black", delay: 0.7 },
    { top: "5%", right: "10%", width: "60px", height: "60px", bg: "bg-black", delay: 0.8 },
    { top: "25%", right: "5%", width: "90px", height: "90px", bg: "bg-red-600", delay: 0.9 },
    { top: "45%", right: "15%", width: "40px", height: "40px", bg: "bg-black", delay: 1.0 },
    { top: "65%", right: "8%", width: "70px", height: "70px", bg: "bg-red-600", delay: 1.1 },
    { top: "85%", right: "15%", width: "50px", height: "50px", bg: "bg-black", delay: 1.2 },
    { top: "20%", left: "40%", width: "30px", height: "30px", bg: "bg-yellow-400", delay: 1.3 },
    { top: "60%", left: "35%", width: "25px", height: "25px", bg: "bg-yellow-400", delay: 1.4 },
    { top: "30%", right: "30%", width: "35px", height: "35px", bg: "bg-yellow-400", delay: 1.5 },
    { top: "75%", right: "40%", width: "20px", height: "20px", bg: "bg-yellow-400", delay: 1.6 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className={`absolute ${el.bg}`}
          style={{
            top: el.top,
            left: el.left,
            right: el.right,
            width: el.width,
            height: el.height,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: el.delay,
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1],
          }}
        />
      ))}
    </div>
  )
}

// Project card component
function ProjectCard({ project, index }: { project: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * index, duration: 0.6 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-black/5 backdrop-blur-sm border border-red-900/20 rounded-xl p-6 hover:border-red-500 transition-colors h-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold mb-1">{project.name}</h3>
            <span className="text-sm text-red-600 font-medium">{project.category}</span>
          </div>
          <Link
            href={`https://${project.url}`}
            target="_blank"
            className="text-gray-400 hover:text-red-600 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </Link>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech: string) => (
            <div key={tech} className="w-8 h-8 bg-black/10 rounded flex items-center justify-center">
              <Image
                src={`/icons/${tech}.${tech === "nextjs" ? "jpeg" : "png"}`}
                alt={tech}
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
            </div>
          ))}
        </div>

        <Link
          href={`https://${project.url}`}
          target="_blank"
          className="text-red-600 hover:text-red-700 transition-colors flex items-center gap-2 font-medium"
        >
          Visit Project <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <motion.div
        className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 text-sm font-bold"
        animate={{
          width: isHovered ? "auto" : "2rem",
          padding: isHovered ? "0.25rem 0.75rem" : "0.25rem 0.5rem",
        }}
        transition={{ duration: 0.3 }}
      >
        {isHovered ? "AI Built" : index + 1}
      </motion.div>
    </motion.div>
  )
}
