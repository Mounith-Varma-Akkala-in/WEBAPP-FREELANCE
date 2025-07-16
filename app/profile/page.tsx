"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [username, setUsername] = useState("")
  const [fullName, setFullName] = useState("")
  const supabase = createClient()
  const { toast } = useToast()

  useEffect(() => {
    const getProfile = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session?.user) {
          return
        }

        setUser(session.user)

        // Fetch profile data
        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single()

        if (error) {
          console.error("Error fetching profile:", error)
          return
        }

        setProfile(profileData)
        setUsername(profileData?.username || "")
        setFullName(profileData?.full_name || "")
      } catch (error) {
        console.error("Profile fetch error:", error)
      } finally {
        setLoading(false)
      }
    }

    getProfile()
  }, [supabase])

  const updateProfile = async () => {
    if (!user) return

    setUpdating(true)

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          username,
          full_name: fullName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) {
        toast({
          title: "Update failed",
          description: error.message,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      })

      // Update local state
      setProfile({
        ...profile,
        username,
        full_name: fullName,
        updated_at: new Date().toISOString(),
      })
    } catch (error) {
      console.error("Profile update error:", error)
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      })
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-500" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
        <p className="text-gray-400">Manage your account settings and profile information</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="bg-black border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt={username || "User"} />
                <AvatarFallback className="text-2xl">
                  {(username?.[0] || user?.email?.[0] || "U").toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">{username || "Username"}</h3>
              <p className="text-gray-400">{user?.email}</p>

              <div className="grid grid-cols-2 gap-4 w-full mt-6 text-center">
                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="text-2xl font-bold">{profile?.level || 1}</div>
                  <div className="text-xs text-gray-400">Level</div>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="text-2xl font-bold">{profile?.credits || 0}</div>
                  <div className="text-xs text-gray-400">Credits</div>
                </div>
              </div>

              <div className="w-full mt-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>Experience</span>
                  <span>{profile?.level * 100}/500 XP</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-500 to-yellow-500"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(profile?.level * 100) / 5}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="account">
            <TabsList className="bg-gray-900 border-gray-800">
              <TabsTrigger value="account">Account Settings</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card className="bg-black border-gray-800">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Update your account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-gray-900 border-gray-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-gray-900 border-gray-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={user?.email} disabled className="bg-gray-900 border-gray-800 opacity-70" />
                  </div>
                  <Button
                    onClick={updateProfile}
                    disabled={updating}
                    className="bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600"
                  >
                    {updating ? "Updating..." : "Update Profile"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card className="bg-black border-gray-800">
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Manage your learning preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Preference settings coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card className="bg-black border-gray-800">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage your notification preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">Notification settings coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
