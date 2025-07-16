"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Code, Filter, Search, Star, Users } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function LearnPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { id: "all", name: "All Skills" },
    { id: "programming", name: "Programming" },
    { id: "data", name: "Data Science" },
    { id: "web", name: "Web Development" },
    { id: "mobile", name: "Mobile Development" },
  ]

  const skills = [
    {
      id: 1,
      name: "JavaScript Fundamentals",
      category: "programming",
      level: "Beginner",
      users: 24567,
      rating: 4.8,
      lessons: 42,
      image: "/placeholder.svg?height=200&width=400",
      color: "bg-yellow-500",
      icon: Code,
    },
    {
      id: 2,
      name: "Python for Data Science",
      category: "data",
      level: "Intermediate",
      users: 18921,
      rating: 4.9,
      lessons: 38,
      image: "/placeholder.svg?height=200&width=400",
      color: "bg-blue-500",
      icon: Brain,
    },
    {
      id: 3,
      name: "React.js Mastery",
      category: "web",
      level: "Advanced",
      users: 15432,
      rating: 4.7,
      lessons: 56,
      image: "/placeholder.svg?height=200&width=400",
      color: "bg-cyan-500",
      icon: Code,
    },
    {
      id: 4,
      name: "Data Structures & Algorithms",
      category: "programming",
      level: "Intermediate",
      users: 12876,
      rating: 4.6,
      lessons: 64,
      image: "/placeholder.svg?height=200&width=400",
      color: "bg-green-500",
      icon: Brain,
    },
    {
      id: 5,
      name: "Flutter App Development",
      category: "mobile",
      level: "Beginner",
      users: 9854,
      rating: 4.5,
      lessons: 48,
      image: "/placeholder.svg?height=200&width=400",
      color: "bg-purple-500",
      icon: Code,
    },
    {
      id: 6,
      name: "Machine Learning Basics",
      category: "data",
      level: "Intermediate",
      users: 11234,
      rating: 4.8,
      lessons: 52,
      image: "/placeholder.svg?height=200&width=400",
      color: "bg-red-500",
      icon: Brain,
    },
    {
      id: 7,
      name: "Node.js Backend",
      category: "web",
      level: "Intermediate",
      users: 10543,
      rating: 4.7,
      lessons: 45,
      image: "/placeholder.svg?height=200&width=400",
      color: "bg-green-500",
      icon: Code,
    },
    {
      id: 8,
      name: "Swift iOS Development",
      category: "mobile",
      level: "Advanced",
      users: 7865,
      rating: 4.6,
      lessons: 58,
      image: "/placeholder.svg?height=200&width=400",
      color: "bg-orange-500",
      icon: Code,
    },
  ]

  const filteredSkills = skills.filter((skill) => skill.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Learn New Skills</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore our library of skills and start your learning journey
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search for skills..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={18} />
          <span>Filters</span>
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4 flex flex-wrap">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredSkills
                .filter((skill) => category.id === "all" || skill.category === category.id)
                .map((skill) => (
                  <motion.div key={skill.id} variants={item}>
                    <Link href={`/learn/${skill.id}`}>
                      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                        <div className="relative h-48 overflow-hidden">
                          <div className={cn("absolute inset-0 opacity-20", skill.color)} />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div whileHover={{ scale: 1.1 }} className={cn("rounded-full p-6", skill.color)}>
                              <skill.icon className="h-12 w-12 text-white" />
                            </motion.div>
                          </div>
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs",
                                skill.level === "Beginner"
                                  ? "border-green-500 text-green-500"
                                  : skill.level === "Intermediate"
                                    ? "border-yellow-500 text-yellow-500"
                                    : "border-red-500 text-red-500",
                              )}
                            >
                              {skill.level}
                            </Badge>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-500 mr-1" />
                              <span className="text-xs">{skill.rating}</span>
                            </div>
                          </div>
                          <CardTitle className="mt-2 group-hover:text-red-500 transition-colors duration-300">
                            {skill.name}
                          </CardTitle>
                          <CardDescription className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {skill.users.toLocaleString()} learners
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex justify-between text-sm">
                            <span>{skill.lessons} lessons</span>
                            <span className="text-gray-500 dark:text-gray-400">~24 hours</span>
                          </div>
                          <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              className={cn("h-full rounded-full", skill.color)}
                              initial={{ width: "0%" }}
                              whileInView={{ width: "30%" }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white">
                            Start Learning
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
