"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function AboutPage() {
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
            <h1 className="text-5xl font-bold mb-6">ABOUT US</h1>
            <p className="text-xl mb-8 text-gray-300">
              Learn about Gravity Fitness, our mission, values, and the passion that drives us to help you achieve your
              fitness goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">OUR STORY</h2>
              <div className="w-20 h-1 bg-red-600 mb-6"></div>
              <p className="text-gray-700 mb-4">
                Gravity Fitness was founded in 2015 with a simple yet powerful vision: to create a fitness center that
                goes beyond the conventional gym experience. We believe that fitness is not just about physical
                strength, but also about mental well-being and overall health.
              </p>
              <p className="text-gray-700 mb-4">
                What started as a small studio in Miyapur has now grown into two state-of-the-art facilities serving
                hundreds of members across Hyderabad. Our journey has been fueled by the transformations we've witnessed
                in our members' lives and the community we've built.
              </p>
              <p className="text-gray-700">
                Today, Gravity Fitness stands as a testament to our commitment to excellence, innovation, and
                personalized fitness solutions. We continue to evolve and expand our offerings to meet the diverse needs
                of our growing community.
              </p>
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
                alt="Gravity Fitness Story"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">OUR MISSION & VALUES</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-700 mb-4">
                At Gravity Fitness, our mission is to empower individuals to transform their lives through fitness,
                nutrition, and mindfulness. We strive to create an inclusive environment where everyone, regardless of
                their fitness level, feels welcome and supported on their journey to better health.
              </p>
              <p className="text-gray-700">
                We are committed to providing expert guidance, state-of-the-art facilities, and innovative programs that
                inspire our members to push their boundaries and achieve what they once thought impossible.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-4">Our Values</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-red-600 h-6 w-6 rounded-full flex items-center justify-center text-white font-bold mr-3 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Excellence</h4>
                    <p className="text-gray-700">
                      We are committed to excellence in everything we do, from our facilities to our programs and
                      customer service.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-600 h-6 w-6 rounded-full flex items-center justify-center text-white font-bold mr-3 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Integrity</h4>
                    <p className="text-gray-700">
                      We operate with honesty, transparency, and ethical standards in all our interactions.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-600 h-6 w-6 rounded-full flex items-center justify-center text-white font-bold mr-3 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Innovation</h4>
                    <p className="text-gray-700">
                      We continuously seek new and better ways to enhance our members' fitness experience.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-600 h-6 w-6 rounded-full flex items-center justify-center text-white font-bold mr-3 mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Community</h4>
                    <p className="text-gray-700">
                      We foster a supportive community where members motivate and inspire each other.
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Facilities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">OUR FACILITIES</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
            <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
              Experience fitness in our state-of-the-art facilities designed for optimal performance and comfort
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-lg group"
            >
              <div className="relative h-80">
                <Image
                  src="/placeholder.svg?height=500&width=400"
                  alt="Cardio Area"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-center p-4">
                    <h3 className="text-2xl font-bold mb-2">Cardio Area</h3>
                    <p>State-of-the-art cardio equipment for effective workouts</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-black text-white">
                <h3 className="text-xl font-bold">Cardio Area</h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-lg group"
            >
              <div className="relative h-80">
                <Image
                  src="/placeholder.svg?height=500&width=400"
                  alt="Strength Training"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-center p-4">
                    <h3 className="text-2xl font-bold mb-2">Strength Training</h3>
                    <p>Comprehensive range of free weights and machines</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-black text-white">
                <h3 className="text-xl font-bold">Strength Training</h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-lg group"
            >
              <div className="relative h-80">
                <Image
                  src="/placeholder.svg?height=500&width=400"
                  alt="Group Classes"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-center p-4">
                    <h3 className="text-2xl font-bold mb-2">Group Classes</h3>
                    <p>Spacious studios for energetic group fitness sessions</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-black text-white">
                <h3 className="text-xl font-bold">Group Classes</h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-lg group"
            >
              <div className="relative h-80">
                <Image
                  src="/placeholder.svg?height=500&width=400"
                  alt="Functional Training"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-center p-4">
                    <h3 className="text-2xl font-bold mb-2">Functional Training</h3>
                    <p>Dedicated zones for functional and HIIT workouts</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-black text-white">
                <h3 className="text-xl font-bold">Functional Training</h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-lg group"
            >
              <div className="relative h-80">
                <Image
                  src="/placeholder.svg?height=500&width=400"
                  alt="Spa & Recovery"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-center p-4">
                    <h3 className="text-2xl font-bold mb-2">Spa & Recovery</h3>
                    <p>Steam rooms and recovery areas for post-workout relaxation</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-black text-white">
                <h3 className="text-xl font-bold">Spa & Recovery</h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-lg group"
            >
              <div className="relative h-80">
                <Image
                  src="/placeholder.svg?height=500&width=400"
                  alt="Locker Rooms"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-center p-4">
                    <h3 className="text-2xl font-bold mb-2">Locker Rooms</h3>
                    <p>Modern locker rooms with showers and amenities</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-black text-white">
                <h3 className="text-xl font-bold">Locker Rooms</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">OUR ACHIEVEMENTS</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-red-600 mb-2">8+</div>
              <h3 className="text-xl font-semibold mb-2">Years of Experience</h3>
              <p className="text-gray-400">Serving the fitness community since 2015</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-red-600 mb-2">2000+</div>
              <h3 className="text-xl font-semibold mb-2">Happy Members</h3>
              <p className="text-gray-400">Transforming lives through fitness</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-red-600 mb-2">20+</div>
              <h3 className="text-xl font-semibold mb-2">Expert Trainers</h3>
              <p className="text-gray-400">Certified professionals dedicated to your success</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-red-600 mb-2">15+</div>
              <h3 className="text-xl font-semibold mb-2">Fitness Awards</h3>
              <p className="text-gray-400">Recognized for excellence in fitness services</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">JOIN THE GRAVITY FITNESS FAMILY</h2>
            <p className="text-xl mb-8 text-gray-700">
              Experience the difference at Gravity Fitness. Start your fitness journey with us today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                JOIN NOW <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-black/5">
                BOOK A TOUR
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
