"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
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
      subject: "",
      message: "",
    })
    // Show success message
    alert("Thank you for your message. We will get back to you soon!")
  }

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
            <h1 className="text-5xl font-bold mb-6">CONTACT US</h1>
            <p className="text-xl mb-8 text-gray-300">
              Get in touch with us for any inquiries about our services, memberships, or to schedule a visit to our
              facilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
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
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Membership Inquiry"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={6}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  SEND MESSAGE <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                <p className="text-gray-700 mb-8">
                  Feel free to reach out to us through any of the following channels. We're here to answer your
                  questions and help you on your fitness journey.
                </p>
              </div>

              <Card className="p-6 border-none shadow-lg">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <p className="text-gray-700">+91 9948614914</p>
                    <a
                      href="tel:+919948614914"
                      className="text-red-600 hover:text-red-700 font-medium inline-block mt-1"
                    >
                      Call us now
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-none shadow-lg">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-gray-700">groovefitness79@gmail.com</p>
                    <a
                      href="mailto:groovefitness79@gmail.com"
                      className="text-red-600 hover:text-red-700 font-medium inline-block mt-1"
                    >
                      Send us an email
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-none shadow-lg">
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Working Hours</h3>
                    <p className="text-gray-700">Monday - Saturday: 5:00 AM - 11:00 PM</p>
                    <p className="text-gray-700">Sunday: 6:00 AM - 9:00 PM</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-none shadow-lg">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-red-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Locations</h3>
                    <div className="space-y-4 mt-2">
                      <div>
                        <p className="font-medium">Miyapur Branch:</p>
                        <p className="text-gray-700">
                          Bhagya Sri Residency, 11, Sri Vani Nagar, Near Coca-Cola Company, Ganesh Nagar, Ameenpur,
                          Miyapur, Hyderabad, Telangana
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Bachupally Branch:</p>
                        <p className="text-gray-700">
                          2nd floor, TVBR Plaza, Miyapur Rd, opp. Anjeer House, Renuka Yellamma Colony, Bachupally,
                          Hyderabad, Telangana 500090
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">FIND US</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
            <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
              Visit our convenient locations in Miyapur and Bachupally
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="h-96 bg-gray-300 rounded-lg overflow-hidden"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.3963608064307!2d78.3421!3d17.4946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI5JzQwLjYiTiA3OMKwMjAnMzEuNiJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Miyapur Branch Map"
              ></iframe>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-96 bg-gray-300 rounded-lg overflow-hidden"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.1!1d78.4!1d17.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDMwJzAwLjAiTiA3OMKwMjQnMDAuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bachupally Branch Map"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
