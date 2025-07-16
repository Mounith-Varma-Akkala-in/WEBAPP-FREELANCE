"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, BookOpen, Code, Video, ArrowRight } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function TutorialPage() {
  const [activeTutorial, setActiveTutorial] = useState<string | null>(null)

  const tutorials = [
    {
      id: "javascript-basics",
      title: "JavaScript Basics",
      description: "Learn the fundamentals of JavaScript programming",
      icon: Code,
      color: "bg-yellow-500",
      lessons: 12,
      duration: "2 hours",
    },
    {
      id: "python-intro",
      title: "Introduction to Python",
      description: "Get started with Python programming language",
      icon: Code,
      color: "bg-blue-500",
      lessons: 10,
      duration: "1.5 hours",
    },
    {
      id: "data-structures",
      title: "Data Structures",
      description: "Understanding fundamental data structures",
      icon: BookOpen,
      color: "bg-green-500",
      lessons: 15,
      duration: "3 hours",
    },
    {
      id: "algorithms",
      title: "Algorithms",
      description: "Learn essential algorithms for coding interviews",
      icon: BookOpen,
      color: "bg-purple-500",
      lessons: 18,
      duration: "4 hours",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Interactive Tutorials</h1>
        <p className="text-gray-400">Learn with our AI-powered interactive tutorials and get real-time assistance</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="bg-black border-gray-800 h-full">
            <CardHeader>
              <CardTitle>Available Tutorials</CardTitle>
              <CardDescription>Select a tutorial to begin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {tutorials.map((tutorial) => (
                <motion.div
                  key={tutorial.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTutorial(tutorial.id)}
                  className={cn(
                    "p-4 rounded-lg cursor-pointer transition-colors",
                    activeTutorial === tutorial.id
                      ? "bg-gray-800 border-l-4 border-red-500"
                      : "bg-gray-900 hover:bg-gray-800",
                  )}
                >
                  <div className="flex items-center">
                    <div className={cn("p-2 rounded-full mr-4", tutorial.color)}>
                      <tutorial.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">{tutorial.title}</h3>
                      <div className="text-sm text-gray-400 flex items-center mt-1">
                        <span className="mr-3">{tutorial.lessons} lessons</span>
                        <span>{tutorial.duration}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-black border-gray-800 h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-red-500" />
                AI Tutor
              </CardTitle>
              <CardDescription>Get personalized help with your learning</CardDescription>
            </CardHeader>
            <CardContent>
              {activeTutorial ? (
                <div className="space-y-6">
                  <div className="bg-gray-900 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-4">{tutorials.find((t) => t.id === activeTutorial)?.title}</h3>
                    <p className="text-gray-400 mb-6">
                      {tutorials.find((t) => t.id === activeTutorial)?.description}. This interactive tutorial will
                      guide you through concepts with hands-on exercises.
                    </p>

                    <div className="bg-gray-800 p-4 rounded-lg mb-6 border border-gray-700">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center mr-3">
                          <MessageSquare className="h-4 w-4 text-white" />
                        </div>
                        <div className="font-medium">AI Tutor</div>
                      </div>
                      <p className="text-gray-300">
                        Hi there! I'm your AI tutor for this course. What specific topic would you like to learn about
                        today?
                      </p>
                    </div>

                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Ask your question here..."
                        className="flex-grow bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                      />
                      <Button className="rounded-l-none bg-red-500 hover:bg-red-600">Send</Button>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700">
                        How do I start?
                      </Button>
                      <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700">
                        Explain the basics
                      </Button>
                      <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700">
                        Show me an example
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-gray-900 border-gray-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center">
                          <Video className="h-4 w-4 mr-2 text-red-500" />
                          Video Lessons
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-400">Watch video tutorials to understand concepts visually</p>
                        <Button variant="link" className="text-red-500 p-0 mt-2 h-auto">
                          Browse videos <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center">
                          <Code className="h-4 w-4 mr-2 text-yellow-500" />
                          Practice Exercises
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-400">Reinforce your learning with hands-on coding exercises</p>
                        <Button variant="link" className="text-yellow-500 p-0 mt-2 h-auto">
                          Start practicing <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <MessageSquare className="h-16 w-16 text-gray-700 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Select a Tutorial</h3>
                  <p className="text-gray-400 max-w-md">
                    Choose a tutorial from the list to start your interactive learning session with our AI tutor
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
