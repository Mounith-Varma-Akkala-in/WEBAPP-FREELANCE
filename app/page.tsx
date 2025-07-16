"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { useScroll, useTransform, useInView, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowRight, Phone, Mail, MessageCircle, MapPin, Instagram } from "lucide-react"
import ServiceCard from "@/components/service-card"
import TestimonialCard from "@/components/testimonial-card"
import GallerySection from "@/components/gallery-section"

export default function Home() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const [isLoaded, setIsLoaded] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  // Optimize loading sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  // Preload critical images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = [
        "/images/new-logo.png",
        "/images/background.jpg",
        "/images/gym2.jpg",
        "/images/gym6.jpg",
      ].map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = resolve
          img.onerror = reject
          img.src = src
        })
      })

      try {
        await Promise.all(imagePromises)
        setImagesLoaded(true)
      } catch (error) {
        console.warn("Some images failed to preload:", error)
        setImagesLoaded(true) // Continue anyway
      }
    }

    preloadImages()
  }, [])

  const services = [
    {
      title: "WEIGHT LIFTING",
      description: "Build strength and power with our professional weight lifting programs.",
      icon: "dumbbell",
    },
    {
      title: "ZUMBA",
      description: "Dance your way to fitness with our energetic Zumba classes.",
      icon: "music",
    },
    {
      title: "MEDITATION",
      description: "Find inner peace and mental clarity through guided meditation sessions.",
      icon: "brain",
    },
    {
      title: "BODY BUILDING",
      description: "Sculpt your dream physique with our comprehensive body building programs.",
      icon: "activity",
    },
    {
      title: "NUTRITION",
      description: "Get expert nutrition advice to fuel your fitness journey.",
      icon: "apple",
    },
    {
      title: "WEIGHT MANAGEMENT",
      description: "Specialized programs for weight loss and weight gain based on your goals.",
      icon: "scale",
    },
    {
      title: "PERSONAL TRAINING",
      description: "One-on-one coaching tailored to your specific fitness needs and goals.",
      icon: "user",
    },
  ]

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Member for 2 years",
      content:
        "Joining Groove Fitness was the best decision I've made for my health. The trainers are knowledgeable and the facilities are top-notch.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Priya Patel",
      role: "Member for 1 year",
      content:
        "I've lost 15kg following the weight management program at Groove Fitness. The personalized approach makes all the difference!",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Vikram Singh",
      role: "Member for 3 years",
      content:
        "The meditation and nutrition guidance at Groove Fitness has transformed not just my body but my overall wellbeing.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    const scrollIndicator = document.querySelector(".scroll-indicator")
    if (scrollIndicator && window.scrollY > 100) {
      scrollIndicator.style.opacity = "0"
    } else if (scrollIndicator) {
      scrollIndicator.style.opacity = "1"
    }
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  if (!isLoaded || !imagesLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <motion.div
            className="relative h-16 w-16 mx-auto mb-6 rounded-full overflow-hidden border-2 border-yellow-500 shadow-2xl bg-white/10 backdrop-blur-sm"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Image
              src="/images/new-logo.png"
              alt="Gravity Fitness Logo"
              fill
              className="object-contain p-2"
              priority
              sizes="64px"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h1 className="text-2xl font-bold mb-2">
              <span className="font-light">GRAVITY</span>{" "}
              <span className="text-yellow-500 font-extrabold">FITNESS</span>
            </h1>
            <p className="text-gray-400">Loading your fitness journey...</p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden min-h-screen bg-white">
      {/* Hero Section with Enhanced Design */}
      <section className="relative min-h-screen flex items-center justify-center bg-black">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/background.jpg"
            alt="Gravity Fitness Background"
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-yellow-900/30" />
        </div>

        {/* Optimized Floating Elements */}
        <div className="absolute inset-0 z-5 pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-2 h-2 bg-yellow-500 rounded-full opacity-60"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />
          <motion.div
            className="absolute top-40 right-20 w-3 h-3 bg-white rounded-full opacity-40"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
          />
          <motion.div
            className="absolute bottom-40 left-20 w-1 h-1 bg-yellow-400 rounded-full opacity-50"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
          />
        </div>

        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Enhanced Logo */}
            <motion.div
              className="flex items-center justify-center mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative group">
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-500/40 to-yellow-600/40 rounded-full blur-2xl scale-110"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />

                {/* Logo Container */}
                <div className="relative h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 rounded-full overflow-hidden border-2 border-yellow-500 shadow-2xl bg-white/10 backdrop-blur-sm transform transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src="/images/new-logo.png"
                    alt="Gravity Fitness Logo"
                    fill
                    className="object-contain p-2"
                    priority
                    sizes="(max-width: 768px) 80px, (max-width: 1024px) 96px, 112px"
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-yellow-400/50 z-30" />
                </div>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight tracking-tight">
                <span className="block font-light">GRAVITY</span>
                <span className="block bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent font-black tracking-wider">
                  FITNESS
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Transform your body, elevate your mind, and discover your potential with our world-class facilities and
              expert guidance
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link
                href="/courses"
                className="focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-black rounded-full"
              >
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-black font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105 focus:outline-none"
                >
                  JOIN NOW
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link
                href="/memberships"
                className="focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded-full"
              >
                <Button
                  size="lg"
                  className="group bg-white text-black border-2 border-white hover:bg-gray-100 font-bold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none"
                >
                  EXPLORE MEMBERSHIPS
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            {/* Contact Icons */}
            <motion.div
              className="flex justify-center space-x-6 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <a
                href="tel:+919948614914"
                className="group bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/20 hover:bg-yellow-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                aria-label="Call us"
              >
                <Phone className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:groovefitness79@gmail.com"
                className="group bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/20 hover:bg-yellow-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                aria-label="Email us"
              >
                <Mail className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://wa.me/919948614914"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/20 hover:bg-green-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="WhatsApp us"
              >
                <MessageCircle className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.instagram.com/gravityfitness_myp?igsh=ZDQ1aGVhaDNnajNv"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/20 hover:bg-pink-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-pink-500"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Optimized Scroll Indicator */}
        <motion.div
          className="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-white rounded-full mt-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
            <span className="text-white/70 text-sm font-light">Scroll</span>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden" ref={ref}>
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-100 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <div className="h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto mb-6 w-20" />
            <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              OUR SERVICES
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive fitness solutions designed to transform your body and elevate your performance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/gym2.jpg"
            alt="Gym Background"
            fill
            className="object-cover opacity-30"
            sizes="100vw"
            quality={75}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-yellow-900/50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              START YOUR
              <span className="block bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                TRANSFORMATION
              </span>
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-gray-300 leading-relaxed">
              Join thousands who have already transformed their lives with Gravity Fitness
            </p>
            <Link
              href="/courses"
              className="focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-black rounded-full"
            >
              <Button
                size="lg"
                className="group bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-black font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105 focus:outline-none"
              >
                GET STARTED TODAY
                <ChevronRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Membership Preview */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <div className="h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto mb-6 w-20" />
            <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              MEMBERSHIP PLANS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose the perfect plan that aligns with your fitness goals and lifestyle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* General Package */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-yellow-200 transform hover:scale-105"
            >
              <div className="p-8 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-50 to-transparent rounded-bl-full" />
                <h3 className="text-2xl font-bold mb-4 text-gray-900">General Package</h3>
                <div className="mb-6">
                  <span className="text-4xl font-black text-gray-900">₹2,000</span>
                  <span className="text-lg text-gray-500 line-through ml-2">₹2,500</span>
                  <span className="text-base text-gray-600 block">per month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "Training overview",
                    "Foundation training",
                    "Beginners classes",
                    "Weightlifting guide",
                    "Personal training",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/memberships"
                  className="focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded-full"
                >
                  <Button className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 rounded-full transition-all duration-300 focus:outline-none">
                    SELECT PLAN
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Premium Package - Featured */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group bg-gradient-to-br from-gray-900 to-black text-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden transform scale-105 relative"
            >
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-center py-3 font-bold text-sm">
                MOST POPULAR
              </div>
              <div className="p-8 pt-16 relative">
                <div className="absolute top-16 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-bl-full" />
                <h3 className="text-2xl font-bold mb-4">Premium Package</h3>
                <div className="mb-6">
                  <span className="text-4xl font-black">₹6,000</span>
                  <span className="text-lg text-gray-400 line-through ml-2">₹7,000</span>
                  <span className="text-base text-gray-300 block">per month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "All General Package features",
                    "Free steam bath",
                    "Calorie tracking",
                    "Advanced training",
                    "Priority booking",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/memberships"
                  className="focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-black rounded-full"
                >
                  <Button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-black font-bold py-3 rounded-full transition-all duration-300 focus:outline-none">
                    SELECT PLAN
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Super Premium Package */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-yellow-200 transform hover:scale-105"
            >
              <div className="p-8 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-50 to-transparent rounded-bl-full" />
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Super Premium</h3>
                <div className="mb-6">
                  <span className="text-4xl font-black text-gray-900">₹9,000</span>
                  <span className="text-lg text-gray-500 line-through ml-2">₹10,000</span>
                  <span className="text-base text-gray-600 block">per month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "All Premium features",
                    "Personalized nutrition",
                    "Unlimited PT sessions",
                    "VIP locker room",
                    "24/7 access",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/memberships"
                  className="focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded-full"
                >
                  <Button className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 rounded-full transition-all duration-300 focus:outline-none">
                    SELECT PLAN
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/memberships"
              className="inline-flex items-center text-yellow-600 font-bold hover:text-yellow-700 transition-colors group focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 rounded-lg px-2 py-1"
            >
              View all membership options
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <div className="h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto mb-6 w-20" />
            <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              SUCCESS STORIES
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Real transformations from our incredible community members
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.name}
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
                avatar={testimonial.avatar}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection />

      {/* Locations Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <div className="h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 mx-auto mb-6 w-20" />
            <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              OUR LOCATIONS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Visit our state-of-the-art facilities across Hyderabad
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105"
            >
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="relative h-12 w-12 mr-4 rounded-full overflow-hidden border-2 border-yellow-500 shadow-lg bg-white/10 backdrop-blur-sm">
                    <Image
                      src="/images/new-logo.png"
                      alt="Gravity Fitness Logo"
                      fill
                      className="object-contain p-1"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Miyapur Branch</h3>
                    <p className="text-yellow-600 font-semibold">Main Location</p>
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">
                      Bhagya Sri Residency, 11, Sri Vani Nagar, Near Coca-Cola Company, Ganesh Nagar, Ameenpur, Miyapur,
                      Hyderabad, Telangana
                    </p>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/place/GRAVITY+FITNESS/@17.52507,78.3429011,18.31z/data=!4m6!3m5!1s0x3bcb8d9f6265a4d3:0x215f321bcf07e2e6!8m2!3d17.5249851!4d78.3429284!16s%2Fg%2F11v5cnpgf0?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 rounded-full"
                >
                  <Button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-black font-bold py-3 rounded-full transition-all duration-300 focus:outline-none">
                    GET DIRECTIONS
                    <MapPin className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105"
            >
              <div className="h-48 relative">
                <Image
                  src="/images/gym6.jpg"
                  alt="Bachupally Branch"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="relative h-12 w-12 mr-4 rounded-full overflow-hidden border-2 border-yellow-500 shadow-lg bg-white/10 backdrop-blur-sm">
                    <Image
                      src="/images/new-logo.png"
                      alt="Gravity Fitness Logo"
                      fill
                      className="object-contain p-1"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Bachupally Branch</h3>
                    <p className="text-yellow-600 font-semibold">Premium Location</p>
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">
                      2nd floor, TVBR Plaza, Miyapur Rd, opp. Anjeer House, Renuka Yellamma Colony, Bachupally,
                      Hyderabad, Telangana 500090
                    </p>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/place/GROOVE+FITNESS/@17.5342798,78.3552336,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb8d9f079d56c5:0xb799040a2ca32575!8m2!3d17.5342747!4d78.3578085!16s%2Fg%2F11w3p5q513?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 rounded-full"
                >
                  <Button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-black font-bold py-3 rounded-full transition-all duration-300 focus:outline-none">
                    GET DIRECTIONS
                    <MapPin className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
