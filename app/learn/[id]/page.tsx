"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { BookOpen, CheckCircle, Clock, Code, Lock, Star, Users } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import Markdown from "react-markdown"
import type { Database } from "@/lib/supabase/database.types"

type Skill = Database["public"]["Tables"]["skills"]["Row"] & {
  lessons: (Database["public"]["Tables"]["lessons"]["Row"] & { completed?: boolean })[]
  exercises?: {
    id: number
    title: string
    difficulty: string
    description: string
    completed: boolean
  }[]
  users: number // Mocked for now, could be fetched from user_skills count
  rating: number // Mocked for now
  color: string // Mocked for now
}

export default function SkillPage() {
  const params = useParams()
  const skillId = params.id as string
  const [activeLesson, setActiveLesson] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("content")
  const [progress, setProgress] = useState(0)
  const [skill, setSkill] = useState<Skill | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const { toast } = useToast()

  const fetchSkillData = useCallback(async () => {
    setLoading(true)
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
      const userId = sessionData?.session?.user?.id

      // Fetch skill details
      const { data: skillData, error: skillError } = await supabase
        .from("skills")
        .select("*")
        .eq("id", skillId)
        .single()

      if (skillError || !skillData) {
        console.error("Error fetching skill:", skillError?.message)
        setSkill(null)
        setLoading(false)
        return
      }

      // Fetch lessons for the skill
      const { data: lessonsData, error: lessonsError } = await supabase
        .from("lessons")
        .select("*")
        .eq("skill_id", skillId)
        .order("order_index", { ascending: true })

      if (lessonsError) {
        console.error("Error fetching lessons:", lessonsError.message)
        setSkill(null)
        setLoading(false)
        return
      }

      let userLessonsProgress: Database["public"]["Tables"]["user_lesson_progress"]["Row"][] = []
      if (userId) {
        const { data: progressData, error: progressError } = await supabase
          .from("user_lesson_progress")
          .select("lesson_id, completed_at")
          .eq("user_id", userId)
          .in(
            "lesson_id",
            lessonsData.map((l) => l.id),
          )

        if (progressError) {
          console.error("Error fetching user lesson progress:", progressError.message)
        } else {
          userLessonsProgress = progressData || []
        }
      }

      const lessonsWithProgress = lessonsData.map((lesson) => ({
        ...lesson,
        completed: userLessonsProgress.some((p) => p.lesson_id === lesson.id && p.completed_at !== null),
        locked: false, // For now, no lessons are locked based on previous completion
      }))

      // Calculate overall skill progress
      const completedLessonsCount = lessonsWithProgress.filter((l) => l.completed).length
      const totalLessonsCount = lessonsWithProgress.length
      const calculatedProgress =
        totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0

      // Fetch user_skill progress if exists
      let currentUserSkillProgress: Database["public"]["Tables"]["user_skills"]["Row"] | null = null
      if (userId) {
        const { data: userSkillData, error: userSkillError } = await supabase
          .from("user_skills")
          .select("*")
          .eq("user_id", userId)
          .eq("skill_id", skillId)
          .single()
        if (userSkillError && userSkillError.code !== "PGRST116") {
          // PGRST116 means no rows found
          console.error("Error fetching user skill progress:", userSkillError.message)
        } else if (userSkillData) {
          currentUserSkillProgress = userSkillData
        }
      }

      // Mock data for users, rating, color, and exercises as they are not in the DB schema yet
      const mockSkillDetails = {
        "1": {
          users: 24567,
          rating: 4.8,
          color: "bg-yellow-500",
          exercises: [
            {
              id: 1,
              title: "Create a Simple Calculator",
              difficulty: "Easy",
              description: "Build a calculator that can perform basic arithmetic operations.",
              completed: false,
            },
            {
              id: 2,
              title: "Todo List Application",
              difficulty: "Medium",
              description:
                "Create a Todo List application that allows users to add, delete, and mark tasks as completed.",
              completed: false,
            },
            {
              id: 3,
              title: "Fetch and Display Data",
              difficulty: "Medium",
              description: "Use the Fetch API to retrieve data from an API and display it on a webpage.",
              completed: false,
            },
            {
              id: 4,
              title: "Form Validation",
              difficulty: "Hard",
              description: "Create a registration form with client-side validation for all fields.",
              completed: false,
            },
          ],
        },
        "2": {
          users: 18921,
          rating: 4.9,
          color: "bg-blue-500",
          exercises: [
            {
              id: 1,
              title: "Data Cleaning",
              difficulty: "Medium",
              description: "Clean a dataset with missing values and outliers.",
              completed: false,
            },
            {
              id: 2,
              title: "Data Visualization",
              difficulty: "Medium",
              description: "Create various plots to visualize a dataset.",
              completed: false,
            },
          ],
        },
      }

      const currentMockDetails = mockSkillDetails[skillId as keyof typeof mockSkillDetails] || {
        users: 0,
        rating: 0,
        color: "bg-gray-500",
        exercises: [],
      }

      setSkill({
        ...skillData,
        lessons: lessonsWithProgress,
        exercises: currentMockDetails.exercises,
        users: currentMockDetails.users,
        rating: currentMockDetails.rating,
        color: currentMockDetails.color,
      })
      setProgress(calculatedProgress)
      setActiveLesson(lessonsWithProgress[0]?.id || null)
    } catch (error) {
      console.error("Failed to fetch skill data:", error)
      toast({
        title: "Error loading skill",
        description: "Could not load skill details. Please try again.",
        variant: "destructive",
      })
      setSkill(null)
    } finally {
      setLoading(false)
    }
  }, [skillId, supabase, toast])

  useEffect(() => {
    fetchSkillData()
  }, [fetchSkillData])

  const markLessonComplete = async (lessonId: string) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) {
        toast({
          title: "Authentication required",
          description: "Please log in to track your progress",
          variant: "destructive",
        })
        return
      }

      const userId = session.user.id

      // Check if lesson is already completed
      const isCompleted = skill?.lessons.find((l) => l.id === lessonId)?.completed
      if (isCompleted) {
        toast({
          title: "Lesson already completed",
          description: "This lesson has already been marked as complete.",
          variant: "default",
        })
        return
      }

      // Insert or update user_lesson_progress
      const { error: upsertError } = await supabase.from("user_lesson_progress").upsert(
        {
          user_id: userId,
          lesson_id: lessonId,
          skill_id: skillId, // Add skill_id to upsert for trigger
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id, lesson_id" },
      )

      if (upsertError) {
        console.error("Error upserting lesson progress:", upsertError.message)
        toast({
          title: "Error updating progress",
          description: upsertError.message,
          variant: "destructive",
        })
        return
      }

      // Manually update UI state for immediate feedback
      setSkill((prevSkill) => {
        if (!prevSkill) return null
        const updatedLessons = prevSkill.lessons.map((lesson) =>
          lesson.id === lessonId ? { ...lesson, completed: true } : lesson,
        )
        const completedLessonsCount = updatedLessons.filter((l) => l.completed).length
        const totalLessonsCount = updatedLessons.length
        const newProgress = totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0
        setProgress(newProgress)
        return { ...prevSkill, lessons: updatedLessons }
      })

      // Add notification
      await supabase.from("notifications").insert({
        user_id: userId,
        type: "lesson_completed",
        message: `You completed "${skill?.title} - ${skill?.lessons.find((l) => l.id === lessonId)?.title}"!`,
      })

      toast({
        title: "Progress updated",
        description: "Lesson marked as completed and progress updated!",
      })

      // Optionally, auto-advance to the next lesson
      const currentIndex = skill?.lessons.findIndex((lesson: any) => lesson.id === lessonId)
      if (skill && currentIndex !== undefined && currentIndex < skill.lessons.length - 1) {
        const nextLesson = skill.lessons[currentIndex + 1]
        if (!nextLesson.locked) {
          setActiveLesson(nextLesson.id)
        }
      }
    } catch (error) {
      console.error("Error marking lesson complete:", error)
      toast({
        title: "Error updating progress",
        description: "Please try again later",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading Skill...</h1>
          <p className="text-gray-400 mb-6">Please wait while we fetch the course content.</p>
        </div>
      </div>
    )
  }

  if (!skill) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Skill not found</h1>
            <p className="text-gray-400 mb-6">The skill you're looking for doesn't exist or is not available.</p>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </div>
      </div>
    )
  }

  const currentLesson = skill.lessons.find((lesson: any) => lesson.id === activeLesson)

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{skill.title}</h1>
            <p className="text-gray-400">{skill.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-yellow-500 text-yellow-500 flex items-center gap-1 px-3 py-1">
              <Star className="h-3 w-3 fill-yellow-500" />
              {skill.rating}
            </Badge>
            <Badge variant="outline" className="border-gray-500 text-gray-400 flex items-center gap-1 px-3 py-1">
              <Users className="h-3 w-3" />
              {skill.users.toLocaleString()} learners
            </Badge>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <Badge
            variant="outline"
            className={`text-sm ${
              skill.level === "Beginner"
                ? "border-green-500 text-green-500"
                : skill.level === "Intermediate"
                  ? "border-yellow-500 text-yellow-500"
                  : "border-red-500 text-red-500"
            }`}
          >
            {skill.level}
          </Badge>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <BookOpen className="h-4 w-4" />
            <span>{skill.lessons.length} lessons</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="h-4 w-4" />
            <span>
              ~{skill.lessons.reduce((acc: number, lesson: any) => acc + (lesson.duration || 0), 0) / 60} hours
            </span>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-2 text-sm">
            <span>Your progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-800">
            <motion.div
              className={`h-full rounded-full ${skill.color}`}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </Progress>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 order-2 lg:order-1">
          <Card className="bg-black border-gray-800 sticky top-20">
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                {skill.lessons.length} lessons • {skill.exercises?.length || 0} exercises
              </CardDescription>
            </CardHeader>
            <CardContent className="max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                {skill.lessons.map((lesson: any, index: number) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      activeLesson === lesson.id
                        ? "bg-gray-800 border-l-4 border-red-500"
                        : "bg-gray-900 hover:bg-gray-800"
                    }`}
                    onClick={() => !lesson.locked && setActiveLesson(lesson.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                            lesson.completed ? "bg-green-500" : lesson.locked ? "bg-gray-700" : skill.color
                          }`}
                        >
                          {lesson.completed ? (
                            <CheckCircle className="h-4 w-4 text-white" />
                          ) : lesson.locked ? (
                            <Lock className="h-4 w-4 text-gray-400" />
                          ) : (
                            <span className="text-white font-medium">{index + 1}</span>
                          )}
                        </div>
                        <div>
                          <h3 className={`font-medium ${lesson.locked ? "text-gray-500" : ""} flex items-center gap-2`}>
                            {lesson.title}
                            {lesson.locked && <Lock className="h-3 w-3 text-gray-500" />}
                          </h3>
                          <div className="text-xs text-gray-400 flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{lesson.duration} min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {skill.exercises && skill.exercises.length > 0 && (
                  <>
                    <Separator className="my-4 bg-gray-800" />
                    <h3 className="font-medium mb-3">Practice Exercises</h3>
                    {skill.exercises.map((exercise: any, index: number) => (
                      <motion.div
                        key={exercise.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: (index + skill.lessons.length) * 0.05 }}
                        className="p-3 rounded-lg cursor-pointer transition-colors bg-gray-900 hover:bg-gray-800"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div
                              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                                exercise.difficulty === "Easy"
                                  ? "bg-green-500"
                                  : exercise.difficulty === "Medium"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                            >
                              <Code className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <h3 className="font-medium">{exercise.title}</h3>
                              <div className="text-xs text-gray-400 flex items-center mt-1">
                                <Badge
                                  variant="outline"
                                  className={`text-xs mr-2 ${
                                    exercise.difficulty === "Easy"
                                      ? "border-green-500 text-green-500"
                                      : exercise.difficulty === "Medium"
                                        ? "border-yellow-500 text-yellow-500"
                                        : "border-red-500 text-red-500"
                                  }`}
                                >
                                  {exercise.difficulty}
                                </Badge>
                                <span>{exercise.completed ? "Completed" : "Not completed"}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 order-1 lg:order-2">
          <Card className="bg-black border-gray-800">
            <CardHeader className="pb-2">
              <Tabs defaultValue="content" onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-gray-900 border-gray-800">
                  <TabsTrigger value="content">Lesson Content</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <TabsContent value="content" className="mt-0">
                {currentLesson ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold">{currentLesson.title}</h2>
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{currentLesson.duration} min</span>
                      </div>
                    </div>

                    <div className="prose prose-invert max-w-none">
                      <Markdown>{currentLesson.content}</Markdown>
                    </div>

                    <div className="flex justify-between pt-6 border-t border-gray-800">
                      <Button
                        variant="outline"
                        onClick={() => {
                          const currentIndex = skill.lessons.findIndex((lesson: any) => lesson.id === activeLesson)
                          if (currentIndex > 0) {
                            setActiveLesson(skill.lessons[currentIndex - 1].id)
                          }
                        }}
                        disabled={skill.lessons.findIndex((lesson: any) => lesson.id === activeLesson) === 0}
                      >
                        Previous Lesson
                      </Button>
                      <Button
                        onClick={() => markLessonComplete(currentLesson.id)}
                        disabled={currentLesson.completed}
                        className={`${
                          currentLesson.completed
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600"
                        }`}
                      >
                        {currentLesson.completed ? "Completed" : "Mark as Complete"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          const currentIndex = skill.lessons.findIndex((lesson: any) => lesson.id === activeLesson)
                          if (currentIndex < skill.lessons.length - 1) {
                            setActiveLesson(skill.lessons[currentIndex + 1].id)
                          }
                        }}
                        disabled={
                          skill.lessons.findIndex((lesson: any) => lesson.id === activeLesson) ===
                            skill.lessons.length - 1 ||
                          skill.lessons[skill.lessons.findIndex((lesson: any) => lesson.id === activeLesson) + 1]
                            ?.locked
                        }
                      >
                        Next Lesson
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium mb-2">Select a lesson to begin</h3>
                    <p className="text-gray-400">Choose a lesson from the sidebar to start learning</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="discussion" className="mt-0">
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">Discussion</h3>
                  <p className="text-gray-400">Discussion forum coming soon...</p>
                </div>
              </TabsContent>
              <TabsContent value="notes" className="mt-0">
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">Notes</h3>
                  <p className="text-gray-400">Notes feature coming soon...</p>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
