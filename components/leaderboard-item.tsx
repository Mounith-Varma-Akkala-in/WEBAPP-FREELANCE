"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LeaderboardItemProps {
  user: {
    id: number
    name: string
    rank: number
    score: number
    avatar: string
    isUser?: boolean
  }
  index: number
}

export default function LeaderboardItem({ user, index }: LeaderboardItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        "flex items-center p-2 rounded-lg",
        user.isUser ? "bg-gray-100 dark:bg-gray-800" : "",
        index < 3 && !user.isUser
          ? "bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20"
          : "",
      )}
    >
      <div className="w-8 text-center font-bold">
        {index < 3 && !user.isUser ? (
          <span
            className={cn(
              "inline-flex items-center justify-center w-6 h-6 rounded-full",
              index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-300" : "bg-amber-700",
              "text-white",
            )}
          >
            {user.rank}
          </span>
        ) : (
          user.rank
        )}
      </div>
      <div className="flex-shrink-0 ml-2">
        <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-8 h-8 rounded-full" />
      </div>
      <div className="ml-3 flex-grow">
        <div className={cn("font-medium", user.isUser ? "text-red-500" : "")}>
          {user.name}
          {user.isUser && " (You)"}
        </div>
      </div>
      <div className="text-right font-bold">{user.score.toLocaleString()}</div>
    </motion.div>
  )
}
