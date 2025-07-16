"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Upload, LogIn } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: "Creator", path: "/creator" },
    { name: "Writer", path: "/writer" },
    { name: "Video Maker", path: "/video-maker" },
  ]

  return (
    <nav className="fixed w-full top-0 z-50 bg-violet-900/70 backdrop-blur-lg border-b border-violet-700/50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative overflow-hidden mr-2">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-400 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-300 to-purple-400 text-transparent bg-clip-text relative">
                Animaker
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </span>
              <span className="text-[10px] text-violet-300 -mt-1">Create & Share Anime Art</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.path
                    ? "bg-violet-700 text-white"
                    : "text-violet-200 hover:bg-violet-800 hover:text-white",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button asChild variant="ghost" className="text-violet-200 hover:text-white hover:bg-violet-800">
              <Link href="/upload">
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Link>
            </Button>
            <Button asChild variant="default" className="bg-violet-600 hover:bg-violet-700">
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-violet-200">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-violet-900/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  pathname === item.path
                    ? "bg-violet-700 text-white"
                    : "text-violet-200 hover:bg-violet-800 hover:text-white",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/upload"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-violet-200 hover:bg-violet-800 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Link>
            <Link
              href="/login"
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-violet-200 hover:bg-violet-800 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
