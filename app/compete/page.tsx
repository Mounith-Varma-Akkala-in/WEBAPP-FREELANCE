"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Filter, Search, Trophy, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function CompetePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const challenges = [
    {
      id: 1,
      title: "Two Sum Problem",
      category: "algorithms",
      difficulty: "Easy",
      participants: 12453,
      credits: 50,
      description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      deadline: "2 days left",
      tags: ["Arrays", "Hash Table"],
      color: "bg-green-500",
    },
    {
      id: 2,
      title: "Binary Tree Level Order Traversal",
      category: "data-structures",
      difficulty: "Medium",
      participants: 8765,
      credits: 100,
      description: "Given the root of a binary tree, return the level order traversal of its nodes' values.",
      deadline: "3 days left",
      tags: ["Tree", "BFS"],
      color: "bg-yellow-500",
    },
    {
      id: 3,
      title: "Merge K Sorted Lists",
      category: "algorithms",
      difficulty: "Hard",
      participants: 5432,
      credits: 200,
      description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.",
      deadline: "5 days left",
      tags: ["Linked List", "Divide and Conquer", "Heap"],
      color: "bg-red-500",
    },
    {
      id: 4,
      title: "Valid Parentheses",
      category: "data-structures",
      difficulty: "Easy",
      participants: 15678,
      credits: 50,
      description:
        "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      deadline: "1 day left",
      tags: ["Stack", "String"],
      color: "bg-green-500",
    },
    {
      id: 5,
      title: "LRU Cache",
      category: "system-design",
      difficulty: "Medium",
      participants: 7654,
      credits: 150,
      description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
      deadline: "4 days left",
      tags: ["Hash Table", "Linked List", "Design"],
      color: "bg-yellow-500",
    },
    {
      id: 6,
      title: "Word Search II",
      category: "algorithms",
      difficulty: "Hard",
      participants: 4321,
      credits: 250,
      description: "Given an m x n board of characters and a list of strings words, return all words on the board.",
      deadline: "6 days left",
      tags: ["Backtracking", "Trie"],
      color: "bg-red-500",
    },
  ]

  const leaderboard = [
    { id: 1, name: "AlexCoder", rank: 1, score: 12450, avatar: "/placeholder.svg?height=40&width=40", country: "US" },
    { id: 2, name: "TechNinja", rank: 2, score: 11890, avatar: "/placeholder.svg?height=40&width=40", country: "JP" },
    { id: 3, name: "CodeMaster", rank: 3, score: 11340, avatar: "/placeholder.svg?height=40&width=40", country: "IN" },
    { id: 4, name: "DevWizard", rank: 4, score: 10980, avatar: "/placeholder.svg?height=40&width=40", country: "DE" },
    { id: 5, name: "ByteGenius", rank: 5, score: 10540, avatar: "/placeholder.svg?height=40&width=40", country: "UK" },
    { id: 6, name: "AlgoQueen", rank: 6, score: 10120, avatar: "/placeholder.svg?height=40&width=40", country: "CA" },
    { id: 7, name: "ProgramPro", rank: 7, score: 9870, avatar: "/placeholder.svg?height=40&width=40", country: "FR" },
    { id: 8, name: "BugHunter", rank: 8, score: 9540, avatar: "/placeholder.svg?height=40&width=40", country: "AU" },
    { id: 9, name: "CodeNerd", rank: 9, score: 9210, avatar: "/placeholder.svg?height=40&width=40", country: "BR" },
    { id: 10, name: "SyntaxSage", rank: 10, score: 8950, avatar: "/placeholder.svg?height=40&width=40", country: "KR" },
  ]

  const filteredChallenges = challenges.filter((challenge) =>
    challenge.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
        <h1 className="text-3xl font-bold mb-2">Compete & Win</h1>
        <p className="text-gray-600 dark:text-gray-400">Test your skills, compete with others, and earn credits</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search for challenges..."
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

          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Challenges</TabsTrigger>
              <TabsTrigger value="algorithms">Algorithms</TabsTrigger>
              <TabsTrigger value="data-structures">Data Structures</TabsTrigger>
              <TabsTrigger value="system-design">System Design</TabsTrigger>
            </TabsList>

            {["all", "algorithms", "data-structures", "system-design"].map((category) => (
              <TabsContent key={category} value={category}>
                <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
                  {filteredChallenges
                    .filter((challenge) => category === "all" || challenge.category === category)
                    .map((challenge) => (
                      <motion.div key={challenge.id} variants={item}>
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-2/3 p-6">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "text-xs",
                                    challenge.difficulty === "Easy"
                                      ? "border-green-500 text-green-500"
                                      : challenge.difficulty === "Medium"
                                        ? "border-yellow-500 text-yellow-500"
                                        : "border-red-500 text-red-500",
                                  )}
                                >
                                  {challenge.difficulty}
                                </Badge>
                                {challenge.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{challenge.description}</p>
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center mr-4">
                                  <Users className="h-4 w-4 mr-1" />
                                  {challenge.participants.toLocaleString()} participants
                                </span>
                                <span className="flex items-center">
                                  <Award className="h-4 w-4 mr-1 text-yellow-500" />
                                  {challenge.credits} credits
                                </span>
                              </div>
                            </div>
                            <div className="md:w-1/3 flex flex-col justify-between p-6 bg-gray-50 dark:bg-gray-800">
                              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                <span className="block font-medium text-black dark:text-white mb-1">Deadline</span>
                                {challenge.deadline}
                              </div>
                              <Button className="w-full bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white">
                                Start Challenge
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                Global Leaderboard
              </CardTitle>
              <CardDescription>Top performers this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={cn(
                      "flex items-center p-2 rounded-lg",
                      index < 3
                        ? "bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20"
                        : "",
                    )}
                  >
                    <div className="w-8 text-center font-bold">
                      {index < 3 ? (
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
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{user.country}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{user.score.toLocaleString()}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">points</div>
                    </div>
                  </motion.div>
                ))}
                <div className="text-center mt-4">
                  <Button variant="outline" size="sm">
                    View Full Leaderboard
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-red-500" />
                Your Stats
              </CardTitle>
              <CardDescription>Your competition performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Global Rank</span>
                  <span className="font-bold">#87</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Score</span>
                  <span className="font-bold">4,320</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Challenges Completed</span>
                  <span className="font-bold">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Win Rate</span>
                  <span className="font-bold">68%</span>
                </div>
                <div className="pt-4">
                  <Button className="w-full bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white">
                    View Your Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
