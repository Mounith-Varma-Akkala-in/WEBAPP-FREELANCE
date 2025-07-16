"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bell,
  BookMarked,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  Sun,
  Trophy,
  User,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Brain } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import type { Database } from "@/lib/supabase/database.types"

type Notification = Database["public"]["Tables"]["notifications"]["Row"]

export default function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const supabase = createClient()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)

    const getUserAndNotifications = async () => {
      setLoading(true)
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()
      setUser(session?.user || null)

      if (session?.user) {
        const { data: notificationsData, error: notificationsError } = await supabase
          .from("notifications")
          .select("*")
          .eq("user_id", session.user.id)
          .eq("read", false)
          .order("created_at", { ascending: false })
          .limit(5) // Fetch up to 5 unread notifications

        if (notificationsError) {
          console.error("Error fetching notifications:", notificationsError.message)
        } else {
          setNotifications(notificationsData || [])
        }
      }
      setLoading(false)
    }

    getUserAndNotifications()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
      if (session?.user) {
        getUserAndNotifications() // Re-fetch notifications on auth state change
      } else {
        setNotifications([])
      }
    })

    // Realtime listener for new notifications
    const channel = supabase
      .channel("public:notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications", filter: `user_id=eq.${user?.id}` },
        (payload) => {
          const newNotification = payload.new as Notification
          setNotifications((prev) => [newNotification, ...prev].slice(0, 5)) // Add new notification and keep max 5
          toast({
            title: "New Notification!",
            description: newNotification.message,
            duration: 5000,
          })
        },
      )
      .subscribe()

    return () => {
      authListener.subscription.unsubscribe()
      supabase.removeChannel(channel)
    }
  }, [supabase, user?.id, toast]) // Depend on user.id to re-subscribe to correct channel

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Learn", href: "/learn", icon: Brain },
    { name: "Compete", href: "/compete", icon: Trophy },
    { name: "Tutorial", href: "/tutorial", icon: MessageSquare },
    { name: "Progress", href: "/dashboard", icon: BookMarked, auth: true },
  ]

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
    router.push("/")
    router.refresh()
  }

  const markNotificationAsRead = async (notificationId: string) => {
    await supabase.from("notifications").update({ read: true }).eq("id", notificationId)
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center mr-6" onClick={closeMenu}>
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", ease: "linear" }}
              className="mr-2 rounded-full bg-gradient-to-r from-red-500 to-yellow-500 p-1"
            >
              <Trophy className="h-6 w-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-yellow-500">
              SkillQuest
            </span>
          </Link>

          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {navItems
                .filter((item) => !item.auth || (item.auth && user))
                .map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center text-sm font-medium transition-colors hover:text-primary relative py-2",
                        isActive ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.name}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-yellow-500"
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                    </Link>
                  )
                })}
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {!isMobile && user && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="relative bg-transparent">
                    <Bell className="h-5 w-5" />
                    {notifications.length > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white">
                        {notifications.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <DropdownMenuItem key={notification.id} onClick={() => markNotificationAsRead(notification.id)}>
                        <div className="flex flex-col">
                          <span className="font-medium">{notification.type.replace(/_/g, " ")}</span>
                          <span className="text-xs text-gray-500">{notification.message}</span>
                        </div>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuItem className="text-gray-500">No new notifications</DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <HelpCircle className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <span>Help Center</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Documentation</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Contact Support</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {mounted && <>{theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</>}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>{user.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <Trophy className="mr-2 h-4 w-4" />
                    <span>My Progress</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/bookmarks">
                    <BookMarked className="mr-2 h-4 w-4" />
                    <span>Bookmarks</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            !loading && (
              <Button
                variant="outline"
                size="sm"
                className="bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white border-0"
                onClick={() => router.push("/auth/login")}
              >
                Login
              </Button>
            )
          )}

          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <Menu className="h-6 w-6" />
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="container py-4 space-y-4">
              <div className="flex justify-end">
                <Button variant="ghost" size="icon" onClick={closeMenu}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="flex flex-col space-y-4">
                {navItems
                  .filter((item) => !item.auth || (item.auth && user))
                  .map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                          isActive ? "bg-gray-800 text-foreground" : "text-muted-foreground",
                        )}
                        onClick={closeMenu}
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.name}
                      </Link>
                    )
                  })}
                <div className="pt-4 border-t border-gray-800">
                  <Link
                    href="/help"
                    className="flex items-center text-sm font-medium transition-colors hover:text-primary p-2 rounded-md text-muted-foreground"
                    onClick={closeMenu}
                  >
                    <HelpCircle className="h-5 w-5 mr-3" />
                    Help Center
                  </Link>
                  {user && (
                    <Link
                      href="/notifications"
                      className="flex items-center text-sm font-medium transition-colors hover:text-primary p-2 rounded-md text-muted-foreground"
                      onClick={closeMenu}
                    >
                      <Bell className="h-5 w-5 mr-3" />
                      Notifications
                      {notifications.length > 0 && (
                        <Badge className="ml-auto bg-red-500 text-white">{notifications.length}</Badge>
                      )}
                    </Link>
                  )}
                  {user ? (
                    <Button
                      variant="ghost"
                      className="flex items-center w-full justify-start text-sm font-medium transition-colors hover:text-primary p-2 rounded-md text-muted-foreground"
                      onClick={() => {
                        handleLogout()
                        closeMenu()
                      }}
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      Log out
                    </Button>
                  ) : (
                    <Link
                      href="/auth/login"
                      className="flex items-center text-sm font-medium transition-colors hover:text-primary p-2 rounded-md text-red-500"
                      onClick={closeMenu}
                    >
                      <User className="h-5 w-5 mr-3" />
                      Login / Sign up
                    </Link>
                  )}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
