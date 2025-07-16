"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, Check, MapPin, Phone, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function MembershipsPage() {
  const membershipFeatures = {
    general: [
      "Training overview",
      "Foundation training",
      "Beginners classes",
      "Weightlifting guide",
      "Personal training",
    ],
    premium: [
      "All General Package features",
      "Free steam bath",
      "Calorie tracking",
      "Advanced training",
      "Priority booking",
    ],
    superPremium: [
      "All Premium Package features",
      "Personalized nutrition plan",
      "Unlimited personal training",
      "VIP locker room",
      "24/7 access",
    ],
  }

  const handlePayment = (amount: number, planName: string, duration: string) => {
    const upiLink = `upi://pay?pa=Vyapar.170232326553@hdfcbank&pn=Default&mc=8999&tr=${Date.now()}&am=${amount}&cu=INR`

    // Open UPI payment
    window.location.href = upiLink

    // Show instructions after a short delay
    setTimeout(() => {
      alert(
        `Payment initiated for ${planName} (${duration}) - ₹${amount.toLocaleString()}\n\nIMPORTANT INSTRUCTIONS:\n\n1. Complete your UPI payment using your preferred payment app\n2. Visit any of our gym locations with your payment confirmation\n3. Our staff will activate your membership and provide your membership card\n4. Please visit within 7 days of payment\n\nFor any issues, call: +91 9948614914`,
      )
    }, 2000)
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
            <h1 className="text-5xl font-bold mb-6">MEMBERSHIP PLANS</h1>
            <p className="text-xl mb-8 text-gray-300">
              Choose the perfect membership plan that fits your fitness goals and budget. All plans include access to
              our state-of-the-art facilities and expert guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Membership Plans Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="monthly" className="w-full max-w-5xl mx-auto">
            <div className="flex justify-center mb-10">
              <TabsList className="grid w-full max-w-md grid-cols-4">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
                <TabsTrigger value="halfYearly">Half-Yearly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>
            </div>

            {/* Monthly Plans */}
            <TabsContent value="monthly">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4">General Package</h3>
                    <div className="text-4xl font-bold mb-6">
                      ₹2,000<span className="text-lg text-gray-500 line-through ml-2">₹2,500</span>
                      <span className="text-base font-normal text-gray-600">/month</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {membershipFeatures.general.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-red-600 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full bg-black hover:bg-gray-800 text-white"
                      onClick={() => handlePayment(2000, "General Package", "Monthly")}
                    >
                      PAY NOW - ₹2,000
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-black text-white rounded-lg shadow-lg overflow-hidden transform scale-105"
                >
                  <div className="bg-red-600 text-white text-center py-2 font-semibold">MOST POPULAR</div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Premium Package</h3>
                    <div className="text-4xl font-bold mb-6">
                      ₹6,000<span className="text-lg text-gray-400 line-through ml-2">₹7,000</span>
                      <span className="text-base font-normal text-gray-400">/month</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {membershipFeatures.premium.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-red-600 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handlePayment(6000, "Premium Package", "Monthly")}
                    >
                      PAY NOW - ₹6,000
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Super Premium Package</h3>
                    <div className="text-4xl font-bold mb-6">
                      ₹9,000<span className="text-lg text-gray-500 line-through ml-2">₹10,000</span>
                      <span className="text-base font-normal text-gray-600">/month</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {membershipFeatures.superPremium.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-red-600 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full bg-black hover:bg-gray-800 text-white"
                      onClick={() => handlePayment(9000, "Super Premium Package", "Monthly")}
                    >
                      PAY NOW - ₹9,000
                    </Button>
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            {/* Quarterly Plans */}
            <TabsContent value="quarterly">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4">General Package</h3>
                    <div className="text-4xl font-bold mb-6">
                      ₹5,000<span className="text-lg text-gray-500 line-through ml-2">₹6,000</span>
                      <span className="text-base font-normal text-gray-600">/quarter</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {membershipFeatures.general.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-red-600 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full bg-black hover:bg-gray-800 text-white"
                      onClick={() => handlePayment(5000, "General Package", "Quarterly")}
                    >
                      PAY NOW - ₹5,000
                    </Button>
                  </div>
                </div>

                <div className="bg-black text-white rounded-lg shadow-lg overflow-hidden transform scale-105">
                  <div className="bg-red-600 text-white text-center py-2 font-semibold">MOST POPULAR</div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Premium Package</h3>
                    <div className="text-4xl font-bold mb-6">
                      ₹16,000<span className="text-lg text-gray-400 line-through ml-2">₹18,000</span>
                      <span className="text-base font-normal text-gray-400">/quarter</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {membershipFeatures.premium.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-red-600 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handlePayment(16000, "Premium Package", "Quarterly")}
                    >
                      PAY NOW - ₹16,000
                    </Button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Super Premium Package</h3>
                    <div className="text-4xl font-bold mb-6">
                      ₹25,000<span className="text-lg text-gray-500 line-through ml-2">₹27,000</span>
                      <span className="text-base font-normal text-gray-600">/quarter</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {membershipFeatures.superPremium.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-red-600 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full bg-black hover:bg-gray-800 text-white"
                      onClick={() => handlePayment(25000, "Super Premium Package", "Quarterly")}
                    >
                      PAY NOW - ₹25,000
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Half-Yearly Plans */}
            <TabsContent value="halfYearly">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4">General Package</h3>
                    <div className="text-4xl font-bold mb-6">
                      ₹8,000<span className="text-lg text-gray-500 line-through ml-2">₹10,000</span>
                      <span className="text-base font-normal text-gray-600">/6 months</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {membershipFeatures.general.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-red-600 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full bg-black hover:bg-gray-800 text-white"
                      onClick={() => handlePayment(8000, "General Package", "Half-Yearly")}
                    >
                      PAY NOW - ₹8,000
                    </Button>
                  </div>
                </div>

                <div className="bg-black text-white rounded-lg shadow-lg overflow-hidden transform scale-105">
                  <div className="bg-red-600 text-white text-center py-2 font-semibold">MOST POPULAR</div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Premium Package</h3>
                    <div className="text-4xl font-bold mb-6">
                      ₹28,000<span className="text-lg text-gray-400 line-through ml-2">₹36,000</span>
                      <span className="text-base font-normal text-gray-400">/6 months</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {membershipFeatures.premium.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-red-600 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handlePayment(28000, "Premium Package", "Half-Yearly")}
                    >
                      PAY NOW - ₹28,000
                    </Button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Super Premium Package</h3>
                    <div className="text-4xl font-bold mb-6">
                      ₹48,000<span className="text-lg text-gray-500 line-through ml-2">₹56,000</span>
                      <span className="text-base font-normal text-gray-600">/6 months</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {membershipFeatures.superPremium.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-red-600 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full bg-black hover:bg-gray-800 text-white"
                      onClick={() => handlePayment(48000, "Super Premium Package", "Half-Yearly")}
                    >
                      PAY NOW - ₹48,000
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Yearly Plans */}
            <TabsContent value="yearly">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4">General Package</h3>
                    <div className="text-4xl font-bold mb-6">
                      ₹12,000<span className="text-lg text-gray-500 line-through ml-2">₹15,000</span>
                      <span className="text-base font-normal text-gray-600">/year</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {membershipFeatures.general.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-red-600 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full bg-black hover:bg-gray-800 text-white"
                      onClick={() => handlePayment(12000, "General Package", "Yearly")}
                    >
                      PAY NOW - ₹12,000
                    </Button>
                  </div>
                </div>

                <div className="bg-black text-white rounded-lg shadow-lg overflow-hidden transform scale-105">
                  <div className="bg-red-600 text-white text-center py-2 font-semibold">MOST POPULAR</div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Premium Package</h3>
                    <div className="text-4xl font-bold mb-6">
                      ₹48,000<span className="text-lg text-gray-400 line-through ml-2">₹72,000</span>
                      <span className="text-base font-normal text-gray-400">/year</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {membershipFeatures.premium.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-red-600 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handlePayment(48000, "Premium Package", "Yearly")}
                    >
                      PAY NOW - ₹48,000
                    </Button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Super Premium Package</h3>
                    <div className="text-4xl font-bold mb-6">
                      ₹80,000<span className="text-lg text-gray-500 line-through ml-2">₹98,000</span>
                      <span className="text-base font-normal text-gray-600">/year</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {membershipFeatures.superPremium.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-red-600 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full bg-black hover:bg-gray-800 text-white"
                      onClick={() => handlePayment(80000, "Super Premium Package", "Yearly")}
                    >
                      PAY NOW - ₹80,000
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Instructions Section */}
      <section className="py-20 bg-red-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-red-800">AFTER PAYMENT INSTRUCTIONS</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white border-red-200 shadow-lg">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-red-800">Complete Your UPI Payment</h3>
                      <p className="text-gray-700">
                        After clicking "PAY NOW", complete your payment using your preferred UPI app (PhonePe, Google
                        Pay, Paytm, etc.)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-red-800">Visit Our Gym</h3>
                      <p className="text-gray-700">
                        Visit any of our gym locations with your payment confirmation (screenshot or transaction ID) to
                        activate your membership.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-red-800">Get Your Membership Card</h3>
                      <p className="text-gray-700">
                        Our staff will complete your registration, provide your membership card, and give you a tour of
                        our facilities.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-red-100 rounded-lg">
                  <h3 className="font-bold text-lg text-red-800 mb-3">Important Notes:</h3>
                  <ul className="space-y-2 text-red-700">
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      Please visit our gym within 7 days of payment to activate your membership
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      Bring your payment confirmation when visiting
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      For any payment issues, call us immediately at +91 9948614914
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gym Locations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">VISIT OUR LOCATIONS</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
            <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
              Complete your membership activation at any of our convenient locations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg overflow-hidden border"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative h-10 w-10 mr-4 rounded-full overflow-hidden border-2 border-red-600">
                    <Image src="/images/logo.jpg" alt="Groove Fitness Logo" fill className="object-cover" />
                  </div>
                  <h3 className="text-xl font-bold">Miyapur Branch</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-red-600 mr-3 mt-1" />
                    <p className="text-gray-700">
                      Bhagya Sri Residency, 11, Sri Vani Nagar, Near Coca-Cola Company, Ganesh Nagar, Ameenpur, Miyapur,
                      Hyderabad, Telangana
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-red-600 mr-3" />
                    <a href="tel:+919948614914" className="text-gray-700 hover:text-red-600">
                      +91 9948614914
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-red-600 mr-3" />
                    <span className="text-gray-700">5:00 AM - 11:00 PM</span>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/place/GRAVITY+FITNESS/@17.52507,78.3429011,18.31z/data=!4m6!3m5!1s0x3bcb8d9f6265a4d3:0x215f321bcf07e2e6!8m2!3d17.5249851!4d78.3429284!16s%2Fg%2F11v5cnpgf0?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4"
                >
                  <Button variant="outline" className="w-full bg-transparent">
                    GET DIRECTIONS
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg overflow-hidden border"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative h-10 w-10 mr-4 rounded-full overflow-hidden border-2 border-red-600">
                    <Image src="/images/logo.jpg" alt="Groove Fitness Logo" fill className="object-cover" />
                  </div>
                  <h3 className="text-xl font-bold">Bachupally Branch</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-red-600 mr-3 mt-1" />
                    <p className="text-gray-700">
                      2nd floor, TVBR Plaza, Miyapur Rd, opp. Anjeer House, Renuka Yellamma Colony, Bachupally,
                      Hyderabad, Telangana 500090
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-red-600 mr-3" />
                    <a href="tel:+919948614914" className="text-gray-700 hover:text-red-600">
                      +91 9948614914
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-red-600 mr-3" />
                    <span className="text-gray-700">5:00 AM - 11:00 PM</span>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/place/GROOVE+FITNESS/@17.5342798,78.3552336,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb8d9f079d56c5:0xb799040a2ca32575!8m2!3d17.5342747!4d78.3578085!16s%2Fg%2F11w3p5q513?entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4"
                >
                  <Button variant="outline" className="w-full bg-transparent">
                    GET DIRECTIONS
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">FREQUENTLY ASKED QUESTIONS</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto"></div>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-2">Can I freeze my membership?</h3>
              <p className="text-gray-700">
                Yes, you can freeze your membership for up to 30 days per year with our Premium and Super Premium
                packages. General package members can freeze for up to 15 days per year.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-2">Is there a joining fee?</h3>
              <p className="text-gray-700">
                There is a one-time joining fee of ₹1,000 for all new members. This fee is waived for yearly
                memberships.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-2">Can I transfer between locations?</h3>
              <p className="text-gray-700">
                Yes, Premium and Super Premium members can use both our Miyapur and Bachupally locations. General
                package members are limited to their home location.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-2">What are your operating hours?</h3>
              <p className="text-gray-700">
                Our standard operating hours are 5:00 AM to 11:00 PM, Monday through Saturday, and 6:00 AM to 9:00 PM on
                Sundays. Super Premium members enjoy 24/7 access.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-2">Do you offer personal training?</h3>
              <p className="text-gray-700">
                Yes, personal training is included in all membership packages. General Package includes 2 sessions per
                month, Premium includes 6 sessions per month, and Super Premium includes unlimited sessions.
              </p>
            </motion.div>
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
              Join Groove Fitness today and transform your body and mind with our expert guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                JOIN NOW <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 bg-transparent">
                CONTACT US
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
