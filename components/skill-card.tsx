"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface SkillCardProps {
  skill: {
    id: number
    name: string
    icon: string
    level: string
    users: number
    color: string
  }
  index: number
}

export default function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden h-full border-2 hover:border-red-500 transition-colors duration-300">
        <div className={cn("h-2", skill.color)} />
        <CardHeader className="pt-6">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{skill.name}</CardTitle>
            <motion.div
              whileHover={{ rotate: 15 }}
              className={cn("w-10 h-10 rounded-full flex items-center justify-center", skill.color)}
            >
              {skill.icon === "code" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                  <line x1="16" y1="8" x2="2" y2="22"></line>
                  <line x1="17.5" y1="15" x2="9" y2="15"></line>
                </svg>
              )}
            </motion.div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">{skill.level}</div>
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-1" />
            <span>{skill.users.toLocaleString()} learners</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white">
            Start Learning
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
