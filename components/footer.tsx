import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Send } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              {/* Enhanced Logo with transparent background */}
              <div className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-yellow-500/70 shadow-lg bg-white/10 backdrop-blur-sm">
                <Image src="/images/new-logo.png" alt="Gravity Fitness Logo" fill className="object-contain p-1" />
                <div className="absolute inset-0 rounded-full border border-yellow-400/30 z-30" />
              </div>
              <h3 className="text-2xl font-bold tracking-wide">
                <span className="font-light">GRAVITY</span>{" "}
                <span className="text-yellow-500 font-extrabold">FITNESS</span>
              </h3>
            </div>
            <p className="text-gray-400 mb-6">
              Transform your body and mind at Gravity Fitness. We offer weight lifting, zumba, meditation, body
              building, nutrition guidance, and personal training.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-yellow-600 transition-colors transform hover:scale-110">
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/gravityfitness_myp?igsh=ZDQ1aGVhaDNnajNv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-600 transition-colors transform hover:scale-110"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-yellow-600 transition-colors transform hover:scale-110">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-yellow-600 transition-colors transform hover:scale-110">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">QUICK LINKS</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-yellow-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-gray-400 hover:text-yellow-600 transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/memberships" className="text-gray-400 hover:text-yellow-600 transition-colors">
                  Memberships
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-yellow-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/work-with-us" className="text-gray-400 hover:text-yellow-600 transition-colors">
                  Work With Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-yellow-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">CONTACT INFO</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-yellow-600 mr-3 mt-1" />
                <div>
                  <p className="text-gray-400">
                    Bhagya Sri Residency, 11, Sri Vani Nagar, Near Coca-Cola Company, Ganesh Nagar, Ameenpur, Miyapur,
                    Hyderabad, Telangana
                  </p>
                </div>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-yellow-600 mr-3" />
                <a href="tel:+919948614914" className="text-gray-400 hover:text-yellow-600 transition-colors">
                  +91 9948614914
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-yellow-600 mr-3" />
                <a
                  href="mailto:groovefitness79@gmail.com"
                  className="text-gray-400 hover:text-yellow-600 transition-colors"
                >
                  groovefitness79@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6">NEWSLETTER</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Your email" className="bg-gray-900 border-gray-700 text-white" />
              <Button className="bg-yellow-600 hover:bg-yellow-700 text-black transform hover:scale-105">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Gravity Fitness. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
