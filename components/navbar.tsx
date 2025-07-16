"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Phone, Menu, X, MessageCircle, Mail, Instagram } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useMobile()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 20
    setIsScrolled(scrolled)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Handle mobile back button navigation
  useEffect(() => {
    const handlePopState = () => {
      setIsMenuOpen(false)
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Memberships", path: "/memberships" },
    { name: "About", path: "/about" },
    { name: "Work With Us", path: "/work-with-us" },
    { name: "Contact", path: "/contact" },
  ]

  const handleNavClick = useCallback(
    (path: string) => {
      setIsMenuOpen(false)
      router.push(path)
    },
    [router],
  )

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled || isMenuOpen
            ? "bg-black/95 backdrop-blur-lg shadow-2xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo */}
            <button
              onClick={() => handleNavClick("/")}
              className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg p-1"
              aria-label="Go to homepage"
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/30 to-yellow-600/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Logo Container */}
                <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden border-2 border-yellow-500/70 shadow-xl bg-white/10 backdrop-blur-sm transform transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/new-logo.png"
                    alt="Gravity Fitness Logo"
                    fill
                    className="object-contain p-1"
                    priority
                    sizes="(max-width: 768px) 40px, 48px"
                  />
                  <div className="absolute inset-0 rounded-full border border-yellow-400/30 z-30" />
                </div>
              </div>
              <span className="text-xl md:text-2xl font-bold tracking-wide text-white transform transition-transform duration-300 group-hover:scale-102">
                <span className="font-light">GRAVITY</span>{" "}
                <span className="text-yellow-400 font-extrabold">FITNESS</span>
              </span>
            </button>

            {/* Desktop Navigation */}
            {!isMobile && (
              <nav className="hidden md:flex items-center space-x-8" role="navigation">
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`relative font-semibold tracking-wide hover:text-yellow-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1 ${
                      pathname === link.path ? "text-yellow-500" : "text-white"
                    }`}
                    aria-current={pathname === link.path ? "page" : undefined}
                  >
                    {link.name}
                    {pathname === link.path && (
                      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full" />
                    )}
                  </button>
                ))}
              </nav>
            )}

            {/* Contact Icons - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="tel:+919948614914"
                className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-yellow-600 transition-all duration-300 group transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                aria-label="Call us at +91 9948614914"
              >
                <Phone className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:groovefitness79@gmail.com"
                className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-yellow-600 transition-all duration-300 group transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                aria-label="Email us at groovefitness79@gmail.com"
              >
                <Mail className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://wa.me/919948614914"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-green-600 transition-all duration-300 group transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="WhatsApp us"
              >
                <MessageCircle className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.instagram.com/gravityfitness_myp?igsh=ZDQ1aGVhaDNnajNv"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-pink-600 transition-all duration-300 group transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-500"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className="text-white hover:bg-white/10 border border-white/20 rounded-full transform transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                <div
                  className="transform transition-transform duration-300"
                  style={{ rotate: isMenuOpen ? "180deg" : "0deg" }}
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div className="fixed inset-0 bg-black/95 backdrop-blur-lg">
            <div className="flex flex-col h-full pt-20">
              <div className="container mx-auto px-4 py-8 space-y-6 flex-1">
                <nav className="flex flex-col space-y-4" role="navigation">
                  {navLinks.map((link, index) => (
                    <div
                      key={link.path}
                      className="transform transition-all duration-300"
                      style={{
                        opacity: isMenuOpen ? 1 : 0,
                        transform: `translateX(${isMenuOpen ? 0 : -20}px)`,
                        transitionDelay: `${index * 100}ms`,
                      }}
                    >
                      <button
                        onClick={() => handleNavClick(link.path)}
                        className={`text-lg font-semibold hover:text-yellow-500 transition-colors duration-300 block py-3 w-full text-left focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-black rounded px-2 ${
                          pathname === link.path ? "text-yellow-500" : "text-white"
                        }`}
                        aria-current={pathname === link.path ? "page" : undefined}
                      >
                        {link.name}
                      </button>
                    </div>
                  ))}
                </nav>

                {/* Mobile Contact Icons */}
                <div
                  className="flex justify-center space-x-6 pt-6 border-t border-white/10 transform transition-all duration-300"
                  style={{
                    opacity: isMenuOpen ? 1 : 0,
                    transform: `translateY(${isMenuOpen ? 0 : 20}px)`,
                    transitionDelay: "600ms",
                  }}
                >
                  <a
                    href="tel:+919948614914"
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-yellow-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    aria-label="Call us"
                  >
                    <Phone className="h-6 w-6 text-white" />
                  </a>
                  <a
                    href="mailto:groovefitness79@gmail.com"
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-yellow-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    aria-label="Email us"
                  >
                    <Mail className="h-6 w-6 text-white" />
                  </a>
                  <a
                    href="https://wa.me/919948614914"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-green-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
                    aria-label="WhatsApp us"
                  >
                    <MessageCircle className="h-6 w-6 text-white" />
                  </a>
                  <a
                    href="https://www.instagram.com/gravityfitness_myp?igsh=ZDQ1aGVhaDNnajNv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-pink-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    aria-label="Follow us on Instagram"
                  >
                    <Instagram className="h-6 w-6 text-white" />
                  </a>
                </div>

                <div
                  className="transform transition-all duration-300"
                  style={{
                    opacity: isMenuOpen ? 1 : 0,
                    transform: `translateY(${isMenuOpen ? 0 : 20}px)`,
                    transitionDelay: "700ms",
                  }}
                >
                  <button
                    onClick={() => handleNavClick("/courses")}
                    className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-black font-bold py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-black transform transition-transform duration-300 hover:scale-105"
                  >
                    JOIN NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
