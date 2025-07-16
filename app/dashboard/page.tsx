"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Brain, Code, FlameIcon as Fire, Star, Trophy, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import SkillProgressCard from "@/components/skill-progress-card"
import LeaderboardItem from "@/components/leaderboard-item"
import { createClient } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/database.types"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]
type UserSkill = Database["public"]["Tables"]["user_skills"]["Row"] & {
  skills: Database["public"]["Tables"]["skills"]["Row"]
}

export default function Dashboard() {
  const [overallProgress, setOverallProgress] = useState(0)
  const [streakCount, setStreakCount] = useState(0)
  const [creditsEarned, setCreditsEarned] = useState(0)
  const [userSkills, setUserSkills] = useState<UserSkill[]>([])
  const [leaderboard, setLeaderboard] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()
        if (sessionError || !session) {
          setLoading(false)
          return
        }

        const userId = session.user.id

        // Fetch user profile data
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("credits, level, streak_days")
          .eq("id", userId)
          .single()

        if (profileError) {
          console.error("Error fetching profile:", profileError.message)
        } else if (profileData) {
          setCreditsEarned(profileData.credits)
          setStreakCount(profileData.streak_days)
          // For overall progress, we can sum up user_skills progress or use a calculated value from profile
          // For now, let's use a simple average of user_skills progress if available
        }

        // Fetch user skills progress
        const { data: userSkillsData, error: userSkillsError } = await supabase
          .from("user_skills")
          .select("*, skills(*)") // Select all from user_skills and join with skills table
          .eq("user_id", userId)

        if (userSkillsError) {
          console.error("Error fetching user skills:", userSkillsError.message)
        } else if (userSkillsData) {
          setUserSkills(userSkillsData as UserSkill[])
          const totalProgress = userSkillsData.reduce((sum, skill) => sum + skill.progress, 0)
          setOverallProgress(userSkillsData.length > 0 ? Math.round(totalProgress / userSkillsData.length) : 0)
        }

        // Fetch leaderboard data
        const { data: leaderboardData, error: leaderboardError } = await supabase
          .from("profiles")
          .select("id, username, credits")
          .order("credits", { ascending: false })
          .limit(10)

        if (leaderboardError) {
          console.error("Error fetching leaderboard:", leaderboardError.message)
        } else if (leaderboardData) {
          // Add a mock avatar and rank for display
          const rankedLeaderboard = leaderboardData.map((p, index) => ({
            ...p,
            rank: index + 1,
            avatar: "/placeholder.svg?height=40&width=40", // Placeholder avatar
            isUser: p.id === userId,
            score: p.credits, // Use credits as score for leaderboard
          }))
          setLeaderboard(rankedLeaderboard as any[]) // Cast to any[] because LeaderboardItem expects specific props
        }
      } catch (error) {
        console.error("Dashboard data fetch error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [supabase])

  const recentChallenges = [
    { id: 1, name: "Two Sum Problem", difficulty: "Easy", completed: true, skill: "JavaScript" },
    { id: 2, name: "Binary Search Tree", difficulty: "Medium", completed: true, skill: "Data Structures" },
    { id: 3, name: "Merge Sort Implementation", difficulty: "Medium", completed: false, skill: "Python" },
    { id: 4, name: "Dynamic Programming Challenge", difficulty: "Hard", completed: false, skill: "Algorithms" },
  ]

  if (loading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading Dashboard...</h1>
          <p className="text-gray-400 mb-6">Gathering your progress and stats.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold mb-2">Welcome back, User!</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Continue your learning journey and level up your skills</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Overall progress card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-red-500" />
                Overall Progress
              </CardTitle>
              <CardDescription>Your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Level {Math.floor(overallProgress / 10) + 1}</span>{" "}
                  {/* Simple level calculation */}
                  <span className="text-sm font-medium">{overallProgress}%</span>
                </div>
                <Progress value={overallProgress} className="h-3 bg-gray-200 dark:bg-gray-700">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-500 to-yellow-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${overallProgress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </Progress>
                <div className="text-sm text-gray-500 dark:text-gray-400">{100 - overallProgress}% to next level</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Credits card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-yellow-500" />
                Credits Earned
              </CardTitle>
              <CardDescription>Unlock new features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500">
                  {creditsEarned.toLocaleString()}
                </div>
                <Button size="sm" className="bg-gradient-to-r from-red-500 to-yellow-500 text-white">
                  Redeem
                </Button>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Star className="mr-1 h-4 w-4 text-yellow-500" />
                <span>Earned {creditsEarned > 0 ? Math.round(creditsEarned / 10) : 0} credits this week</span>{" "}
                {/* Placeholder for weekly credits */}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Streak card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Fire className="mr-2 h-5 w-5 text-red-500" />
                Daily Streak
              </CardTitle>
              <CardDescription>Keep the momentum going</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-4xl font-bold flex items-center">
                  <motion.span
                    key={streakCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 10 }}
                  >
                    {streakCount}
                  </motion.span>
                  <span className="text-lg ml-2 text-gray-500 dark:text-gray-400">days</span>
                </div>
                <div className="flex space-x-1">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-4 h-8 rounded-sm",
                        i < streakCount
                          ? "bg-gradient-to-t from-red-500 to-yellow-500"
                          : "bg-gray-200 dark:bg-gray-700",
                      )}
                      style={{ height: `${(i + 1) * 5 + 15}px` }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Come back tomorrow to continue your streak!
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Skills progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5 text-purple-500" />
                Skills Progress
              </CardTitle>
              <CardDescription>Track your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {userSkills.length > 0 ? (
                  userSkills.map((userSkill, index) => (
                    <SkillProgressCard
                      key={userSkill.skill_id}
                      skill={{
                        id: Number.parseInt(userSkill.skill_id), // Assuming skill_id can be parsed to number for mock data
                        name: userSkill.skills?.name || "Unknown Skill",
                        progress: userSkill.progress,
                        level: userSkill.level,
                        rank: 0, // Not tracking rank per skill yet
                        credits: 0, // Not tracking credits per skill yet
                        color: userSkill.skills?.name === "JavaScript Fundamentals" ? "bg-yellow-500" : "bg-blue-500", // Mock color
                      }}
                      index={index}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No skills started yet. Explore the{" "}
                    <Link href="/learn" className="text-red-500 hover:underline">
                      Learn
                    </Link>{" "}
                    section to begin!
                  </div>
                )}
                <div className="text-center mt-4">
                  <Link href="/learn">
                    <Button variant="outline">Explore More Skills</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                Leaderboard
              </CardTitle>
              <CardDescription>Top performers this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <LeaderboardItem key={user.id} user={user as any} index={index} />
                ))}
                <div className="text-center mt-4">
                  <Link href="/compete">
                    <Button variant="outline" size="sm">
                      View Full Leaderboard
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="mr-2 h-5 w-5 text-blue-500" />
              Recent Challenges
            </CardTitle>
            <CardDescription>Your recent coding challenges</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <div className="space-y-4">
                  {recentChallenges.map((challenge, index) => (
                    <motion.div
                      key={challenge.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-800"
                    >
                      <div className="flex items-center">
                        <div
                          className={cn(
                            "w-2 h-10 rounded-full mr-4",
                            challenge.difficulty === "Easy"
                              ? "bg-green-500"
                              : challenge.difficulty === "Medium"
                                ? "bg-yellow-500"
                                : "bg-red-500",
                          )}
                        />
                        <div>
                          <div className="font-medium">{challenge.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {challenge.skill} • {challenge.difficulty}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {challenge.completed ? (
                          <span className="text-sm text-green-500 flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Completed
                          </span>
                        ) : (
                          <Button size="sm" variant="outline">
                            Continue
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="completed">
                <div className="space-y-4">
                  {recentChallenges
                    .filter((c) => c.completed)
                    .map((challenge, index) => (
                      <motion.div
                        key={challenge.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-800"
                      >
                        <div className="flex items-center">
                          <div
                            className={cn(
                              "w-2 h-10 rounded-full mr-4",
                              challenge.difficulty === "Easy"
                                ? "bg-green-500"
                                : challenge.difficulty === "Medium"
                                  ? "bg-yellow-500"
                                  : "bg-red-500",
                            )}
                          />
                          <div>
                            <div className="font-medium">{challenge.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {challenge.skill} • {challenge.difficulty}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-green-500 flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Completed
                          </span>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="pending">
                <div className="space-y-4">
                  {recentChallenges
                    .filter((c) => !c.completed)
                    .map((challenge, index) => (
                      <motion.div
                        key={challenge.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-800"
                      >
                        <div className="flex items-center">
                          <div
                            className={cn(
                              "w-2 h-10 rounded-full mr-4",
                              challenge.difficulty === "Easy"
                                ? "bg-green-500"
                                : challenge.difficulty === "Medium"
                                  ? "bg-yellow-500"
                                  : "bg-red-500",
                            )}
                          />
                          <div>
                            <div className="font-medium">{challenge.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {challenge.skill} • {challenge.difficulty}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Button size="sm" variant="outline">
                            Continue
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
