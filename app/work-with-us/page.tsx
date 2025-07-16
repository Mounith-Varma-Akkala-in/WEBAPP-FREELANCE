"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, CheckCircle, Clock, Users, Dumbbell, Heart } from "lucide-react"

export default function WorkWithUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    message: "",
    resume: null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        resume: e.target.files ? e.target.files[0] : null,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log(formData)
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      message: "",
      resume: null,
    })
    // Show success message
    alert("Thank you for your application. We will review it and get back to you soon!")
  }

  const positions = [
    {
      title: "Fitness Trainer",
      description: "Guide and motivate members through safe and effective workout routines.",
      requirements: ["Certified Personal Trainer", "1+ years experience", "Excellent communication skills"],
      icon: Dumbbell,
    },
    {
      title: "Yoga Instructor",
      description: "Lead yoga classes for members of all skill levels, focusing on proper form and mindfulness.",
      requirements: ["Yoga certification", "2+ years teaching experience", "Knowledge of various yoga styles"],
      icon: Heart,
    },
    {
      title: "Nutritionist",
      description: "Provide nutrition counseling and develop meal plans for members based on their fitness goals.",
      requirements: ["Nutrition degree/certification", "Experience in sports nutrition", "Strong interpersonal skills"],
      icon: CheckCircle,
    },
    {
      title: "Front Desk Associate",
      description: "Welcome members, handle inquiries, and maintain a clean and organized gym environment.",
      requirements: ["Customer service experience", "Computer proficiency", "Multitasking abilities"],
      icon: Users,
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
            <h1 className="text-5xl font-bold mb-6">WORK WITH US</h1>
            <p className="text-xl mb-8 text-gray-300">
              Join our team of passionate fitness professionals and help transform lives through health and wellness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">WHY JOIN OUR TEAM?</h2>
              <div className="w-20 h-1 bg-red-600 mb-6"></div>
              <p className="text-gray-700 mb-6">
                At Gravity Fitness, we're more than just a gym – we're a community dedicated to transforming lives
                through fitness. When you join our team, you become part of a supportive family that values growth,
                innovation, and excellence.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-lg">Career Growth</h4>
                    <p className="text-gray-700">Opportunities for advancement and professional development</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-lg">Competitive Compensation</h4>
                    <p className="text-gray-700">Attractive salary packages and performance incentives</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-lg">Work-Life Balance</h4>
                    <p className="text-gray-700">Flexible scheduling options to accommodate your lifestyle</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-lg">Free Membership</h4>
                    <p className="text-gray-700">Complimentary access to our premium facilities</p>
                  </div>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-lg overflow-hidden"
            >
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Gravity Fitness Team"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">CURRENT OPENINGS</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
            <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
              Explore our available positions and find the perfect fit for your skills and passion
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {positions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-red-600 p-3 rounded-full text-white">
                        <position.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{position.title}</h3>
                        <p className="text-gray-700 mb-4">{position.description}</p>
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Requirements:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {position.requirements.map((req, idx) => (
                              <li key={idx} className="text-gray-700">
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Posted 2 weeks ago</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">APPLY NOW</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
            <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
              Take the first step towards joining our team by submitting your application
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9948614914"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="position" className="block text-sm font-medium mb-2">
                    Position Applied For
                  </label>
                  <Input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="Fitness Trainer"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium mb-2">
                  Years of Experience
                </label>
                <Input
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="2 years"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Why do you want to join Gravity Fitness?
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about yourself and why you're interested in this position..."
                  rows={6}
                  required
                />
              </div>
              <div>
                <label htmlFor="resume" className="block text-sm font-medium mb-2">
                  Upload Resume (PDF or Word)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-2">Drag and drop your resume here, or click to browse</p>
                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    required
                  />
                  <Button type="button" variant="outline" onClick={() => document.getElementById("resume")?.click()}>
                    Browse Files
                  </Button>
                  {formData.resume && (
                    <p className="mt-2 text-sm text-green-600 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {formData.resume.name}
                    </p>
                  )}
                </div>
              </div>
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                SUBMIT APPLICATION
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Team Culture */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">OUR TEAM CULTURE</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
            <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
              Experience a positive and supportive work environment that values growth and collaboration
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative h-80 rounded-lg overflow-hidden"
            >
              <Image src="/placeholder.svg?height=500&width=400" alt="Team Building" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-6">
                <h3 className="text-xl font-bold text-white">Team Building Events</h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-80 rounded-lg overflow-hidden"
            >
              <Image
                src="/placeholder.svg?height=500&width=400"
                alt="Training Sessions"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-6">
                <h3 className="text-xl font-bold text-white">Continuous Learning</h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative h-80 rounded-lg overflow-hidden"
            >
              <Image src="/placeholder.svg?height=500&width=400" alt="Recognition" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-6">
                <h3 className="text-xl font-bold text-white">Recognition & Rewards</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
