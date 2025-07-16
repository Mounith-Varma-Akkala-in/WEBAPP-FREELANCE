"use client"

import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface SkillProgressCardProps {
  skill: {
    id: number
    name: string
    progress: number
    level: number
    rank: number
    credits: number
    color: string
  }
  index: number
}

export default function SkillProgressCard({ skill, index }: SkillProgressCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="p-4 rounded-lg border border-gray-200 dark:border-gray-800"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium">{skill.name}</h3>
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <span className="mr-2">Level {skill.level}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3",
                    i < skill.level ? "text-yellow-500 fill-yellow-500" : "text-gray-300 dark:text-gray-600",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Trophy className="h-3 w-3 mr-1 text-yellow-500" />
            <span>Rank #{skill.rank}</span>
          </div>
          <div className="text-sm font-medium">{skill.credits} credits</div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1 text-sm">
          <span>Progress</span>
          <span>{skill.progress}%</span>
        </div>
        <Progress value={skill.progress} className="h-2 bg-gray-200 dark:bg-gray-700">
          <motion.div
            className={cn("h-full rounded-full", skill.color)}
            initial={{ width: "0%" }}
            animate={{ width: `${skill.progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </Progress>
      </div>
    </motion.div>
  )
}
