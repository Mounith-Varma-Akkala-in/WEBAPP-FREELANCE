"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Award, Brain, Code, Trophy, Users } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import FeatureCard from "@/components/feature-card"
import StatsCounter from "@/components/stats-counter"
import SkillCard from "@/components/skill-card"

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const skills = [
    {
      id: 1,
      name: "JavaScript",
      icon: "code",
      level: "Beginner to Advanced",
      users: 12453,
      color: "bg-yellow-500",
    },
    {
      id: 2,
      name: "Python",
      icon: "code",
      level: "All Levels",
      users: 18921,
      color: "bg-blue-500",
    },
    {
      id: 3,
      name: "Data Structures",
      icon: "brain",
      level: "Intermediate",
      users: 8734,
      color: "bg-green-500",
    },
    {
      id: 4,
      name: "Machine Learning",
      icon: "brain",
      level: "Advanced",
      users: 6291,
      color: "bg-purple-500",
    },
  ]

  const features = [
    {
      title: "AI-Powered Learning",
      description: "Personalized learning paths created by advanced AI",
      icon: Brain,
      color: "bg-yellow-500",
    },
    {
      title: "Competitive Coding",
      description: "Test your skills against others in coding challenges",
      icon: Code,
      color: "bg-red-500",
    },
    {
      title: "Earn Credits & Badges",
      description: "Get rewarded for your progress with credits and badges",
      icon: Award,
      color: "bg-black",
    },
    {
      title: "Global Leaderboards",
      description: "See how you rank against learners worldwide",
      icon: Trophy,
      color: "bg-yellow-500",
    },
    {
      title: "Community Learning",
      description: "Join a community of passionate learners",
      icon: Users,
      color: "bg-red-500",
    },
  ]

  return (
    <div className="relative overflow-hidden">
      {/* Animated background elements - only render on client */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "absolute rounded-full opacity-20",
                i % 3 === 0 ? "bg-red-500" : i % 3 === 1 ? "bg-yellow-500" : "bg-black",
              )}
              initial={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                x: Math.random() * windowSize.width,
                y: Math.random() * windowSize.height,
                opacity: 0.1,
              }}
              animate={{
                x: [Math.random() * windowSize.width, Math.random() * windowSize.width],
                y: [Math.random() * windowSize.height, Math.random() * windowSize.height],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      )}

      {/* Mouse follower effect - only render on client */}
      {isClient && (
        <motion.div
          className="hidden md:block absolute w-96 h-96 rounded-full bg-gradient-to-r from-red-500/20 to-yellow-500/20 pointer-events-none"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      )}

      {/* Hero section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-yellow-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Master New Skills Through Gamified Learning
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Turn learning into an adventure. Earn credits, compete with others, and track your progress in a fun,
              engaging environment.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white"
              >
                Start Learning Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Explore Skills
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatsCounter end={50000} title="Active Learners" />
            <StatsCounter end={120} title="Skills Available" />
            <StatsCounter end={1500} title="Challenges" />
            <StatsCounter end={98} title="Success Rate %" />
          </div>
        </div>
      </section>

      {/* Featured skills section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Skills to Master</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose from a variety of in-demand skills and start your learning journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <SkillCard key={skill.id} skill={skill} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/learn">
              <Button variant="outline" size="lg" className="group">
                View All Skills
                <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }} className="inline-block ml-2">
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose SkillQuest?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our platform combines learning with gaming mechanics to keep you motivated
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Ready to <span className="text-yellow-500">Level Up</span> Your Skills?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl mb-8"
            >
              Join thousands of learners who are mastering new skills while having fun. Start your journey today!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white"
              >
                Create Free Account
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
