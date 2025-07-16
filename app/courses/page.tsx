"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CoursesPage() {
  const courses = [
    {
      title: "WEIGHT LIFTING",
      description: "Master proper techniques and build strength with our comprehensive weight lifting program.",
      image: "/placeholder.svg?height=400&width=600",
      level: "All Levels",
      duration: "60 min sessions",
    },
    {
      title: "ZUMBA",
      description: "Dance your way to fitness with our high-energy Zumba classes led by certified instructors.",
      image: "/placeholder.svg?height=400&width=600",
      level: "All Levels",
      duration: "45 min sessions",
    },
    {
      title: "MEDITATION",
      description: "Find inner peace and reduce stress with our guided meditation sessions.",
      image: "/placeholder.svg?height=400&width=600",
      level: "All Levels",
      duration: "30 min sessions",
    },
    {
      title: "BODY BUILDING",
      description: "Sculpt your physique with our specialized body building program designed for maximum results.",
      image: "/placeholder.svg?height=400&width=600",
      level: "Intermediate to Advanced",
      duration: "90 min sessions",
    },
    {
      title: "NUTRITION COUNSELING",
      description: "Get personalized nutrition advice to fuel your workouts and achieve your fitness goals.",
      image: "/placeholder.svg?height=400&width=600",
      level: "All Levels",
      duration: "45 min sessions",
    },
    {
      title: "WEIGHT MANAGEMENT",
      description: "Achieve your ideal weight with our specialized programs for weight loss or weight gain.",
      image: "/placeholder.svg?height=400&width=600",
      level: "All Levels",
      duration: "Ongoing support",
    },
    {
      title: "PERSONAL TRAINING",
      description: "Get one-on-one coaching tailored to your specific fitness needs and goals.",
      image: "/placeholder.svg?height=400&width=600",
      level: "All Levels",
      duration: "60 min sessions",
    },
    {
      title: "HIIT WORKOUTS",
      description: "Maximize calorie burn with our high-intensity interval training sessions.",
      image: "/placeholder.svg?height=400&width=600",
      level: "Intermediate to Advanced",
      duration: "30 min sessions",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-black text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-black/70 z-10" />
        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl font-bold mb-6">OUR COURSES</h1>
            <p className="text-xl mb-8 text-gray-300">
              Explore our wide range of fitness courses designed to help you achieve your health and wellness goals.
              From weight lifting to meditation, we have something for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="h-48 relative">
                    <Image
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>
                      <div className="flex justify-between text-sm mt-2">
                        <span>{course.level}</span>
                        <span>{course.duration}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p>{course.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      LEARN MORE <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">CLASS SCHEDULE</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
            <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
              Check out our weekly class schedule and plan your fitness routine
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-black text-white">
                <tr>
                  <th className="py-4 px-6 text-left">Time</th>
                  <th className="py-4 px-6 text-left">Monday</th>
                  <th className="py-4 px-6 text-left">Tuesday</th>
                  <th className="py-4 px-6 text-left">Wednesday</th>
                  <th className="py-4 px-6 text-left">Thursday</th>
                  <th className="py-4 px-6 text-left">Friday</th>
                  <th className="py-4 px-6 text-left">Saturday</th>
                  <th className="py-4 px-6 text-left">Sunday</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4 px-6 font-semibold">6:00 AM</td>
                  <td className="py-4 px-6">HIIT</td>
                  <td className="py-4 px-6">Weight Lifting</td>
                  <td className="py-4 px-6">HIIT</td>
                  <td className="py-4 px-6">Weight Lifting</td>
                  <td className="py-4 px-6">HIIT</td>
                  <td className="py-4 px-6">Yoga</td>
                  <td className="py-4 px-6">-</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-4 px-6 font-semibold">8:00 AM</td>
                  <td className="py-4 px-6">Zumba</td>
                  <td className="py-4 px-6">Meditation</td>
                  <td className="py-4 px-6">Zumba</td>
                  <td className="py-4 px-6">Meditation</td>
                  <td className="py-4 px-6">Zumba</td>
                  <td className="py-4 px-6">Body Building</td>
                  <td className="py-4 px-6">Meditation</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6 font-semibold">10:00 AM</td>
                  <td className="py-4 px-6">Body Building</td>
                  <td className="py-4 px-6">Zumba</td>
                  <td className="py-4 px-6">Body Building</td>
                  <td className="py-4 px-6">Zumba</td>
                  <td className="py-4 px-6">Body Building</td>
                  <td className="py-4 px-6">Weight Lifting</td>
                  <td className="py-4 px-6">Zumba</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-4 px-6 font-semibold">4:00 PM</td>
                  <td className="py-4 px-6">Weight Lifting</td>
                  <td className="py-4 px-6">Body Building</td>
                  <td className="py-4 px-6">Weight Lifting</td>
                  <td className="py-4 px-6">Body Building</td>
                  <td className="py-4 px-6">Weight Lifting</td>
                  <td className="py-4 px-6">HIIT</td>
                  <td className="py-4 px-6">Weight Lifting</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-6 font-semibold">6:00 PM</td>
                  <td className="py-4 px-6">HIIT</td>
                  <td className="py-4 px-6">Zumba</td>
                  <td className="py-4 px-6">HIIT</td>
                  <td className="py-4 px-6">Zumba</td>
                  <td className="py-4 px-6">HIIT</td>
                  <td className="py-4 px-6">Meditation</td>
                  <td className="py-4 px-6">HIIT</td>
                </tr>
                <tr className="border-b bg-gray-50">
                  <td className="py-4 px-6 font-semibold">8:00 PM</td>
                  <td className="py-4 px-6">Meditation</td>
                  <td className="py-4 px-6">HIIT</td>
                  <td className="py-4 px-6">Meditation</td>
                  <td className="py-4 px-6">HIIT</td>
                  <td className="py-4 px-6">Meditation</td>
                  <td className="py-4 px-6">-</td>
                  <td className="py-4 px-6">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">OUR EXPERT TRAINERS</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
            <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
              Meet our team of certified fitness professionals dedicated to helping you achieve your goals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((trainer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative h-80 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={`/placeholder.svg?height=400&width=300`}
                    alt={`Trainer ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">Trainer Name</h3>
                <p className="text-gray-600 mb-3">Specialization</p>
                <p className="text-sm text-gray-700">
                  Certified fitness professional with X years of experience in helping clients achieve their fitness
                  goals.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">READY TO START YOUR FITNESS JOURNEY?</h2>
            <p className="text-xl mb-8">
              Join Gravity Fitness today and transform your body and mind with our expert guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                JOIN NOW <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                BOOK A FREE TRIAL
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
