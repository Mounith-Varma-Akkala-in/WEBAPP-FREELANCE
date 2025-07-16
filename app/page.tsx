"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Star, BookOpen, Film, ChevronRight, ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample featured artworks
const featuredArtworks = [
  {
    id: "1",
    title: "Sakura in Spring",
    creator: "AnimeArtist42",
    image: "/placeholder.svg?height=600&width=400",
    category: "Creator",
    likes: 245,
  },
  {
    id: "2",
    title: "Demon Slayer Fan Art",
    creator: "MangaLover",
    image: "/placeholder.svg?height=500&width=400",
    category: "Creator",
    likes: 189,
  },
  {
    id: "3",
    title: "The Last Samurai - Chapter 1",
    creator: "NovelWriter",
    image: "/placeholder.svg?height=700&width=400",
    category: "Writer",
    likes: 132,
  },
  {
    id: "4",
    title: "Mecha Battle Animation",
    creator: "AnimeMaker",
    image: "/placeholder.svg?height=400&width=400",
    category: "Video Maker",
    likes: 321,
  },
]

// Sample trending creators
const trendingCreators = [
  {
    id: "1",
    name: "AnimeArtist42",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: 12500,
    category: "Creator",
  },
  {
    id: "2",
    name: "MangaLover",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: 8900,
    category: "Creator",
  },
  {
    id: "3",
    name: "NovelWriter",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: 6700,
    category: "Writer",
  },
  {
    id: "4",
    name: "AnimeMaker",
    avatar: "/placeholder.svg?height=100&width=100",
    followers: 15200,
    category: "Video Maker",
  },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const heroRef = useRef<HTMLDivElement>(null)

  // Parallax effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY
        heroRef.current.style.transform = `translateY(${scrollY * 0.5}px)`
        heroRef.current.style.opacity = `${1 - scrollY * 0.002}`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          ref={heroRef}
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(124, 58, 237, 0.2) 0%, rgba(76, 29, 149, 0.1) 70%, rgba(46, 16, 101, 0) 100%)",
          }}
        />

        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-900/30 border border-violet-700/50 text-violet-200 mb-4"
            >
              <Sparkles className="h-4 w-4 text-violet-400" />
              <span>The ultimate platform for anime creators</span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-violet-300 via-purple-400 to-violet-300 text-transparent bg-clip-text inline-block">
                Share Your Anime
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-purple-400 text-transparent bg-clip-text inline-block">
                Creations With The World
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-violet-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Join our vibrant community of creators, writers, and animators sharing their passion for anime, manga, and
              light novels.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <Button
                size="lg"
                className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 rounded-xl font-medium text-lg group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-violet-500 text-violet-300 hover:text-violet-200 hover:bg-violet-900/30 px-8 py-6 rounded-xl font-medium text-lg"
              >
                Explore Artwork
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="flex flex-col items-center">
              <span className="text-violet-400 text-sm mb-2">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-violet-500 rounded-full flex justify-center p-1">
                <motion.div
                  className="w-1.5 h-1.5 bg-violet-400 rounded-full"
                  animate={{
                    y: [0, 12, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-violet-400/20 to-purple-500/20"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 50 - 25],
                y: [0, Math.random() * 50 - 25],
                scale: [1, Math.random() * 0.3 + 0.8, 1],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-violet-900/30 backdrop-blur-md border-y border-violet-800/30">
        <div className="container px-4 md:px-6">
          <motion.div
            className="max-w-3xl mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for anime art, manga, light novels..."
                className="pl-12 py-6 bg-violet-950/50 border-violet-700 text-violet-200 rounded-xl focus:ring-violet-500 focus:border-violet-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-violet-600 hover:bg-violet-700 rounded-lg">
                Search
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {["Anime Art", "Manga", "Light Novels", "Animation", "Fan Art", "Character Design"].map((tag) => (
                <Button
                  key={tag}
                  variant="outline"
                  size="sm"
                  className="rounded-full border-violet-700/50 text-violet-300 hover:bg-violet-800 hover:text-violet-200"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex items-center justify-between mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 text-transparent bg-clip-text">
                Featured Artworks
              </h2>
              <p className="text-violet-400 mt-2">Discover the best creations from our community</p>
            </div>
            <Button variant="ghost" className="text-violet-400 hover:text-violet-300 hover:bg-violet-900/30 group">
              View All
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArtworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Link href={`/artwork/${artwork.id}`} className="block group">
                  <div className="relative overflow-hidden rounded-xl bg-violet-900/30 border border-violet-800/50 shadow-lg">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={artwork.image || "/placeholder.svg"}
                        alt={artwork.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-violet-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-violet-600/90 text-white backdrop-blur-sm">
                        {artwork.category}
                      </span>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-white group-hover:text-violet-300 transition-colors">
                        {artwork.title}
                      </h3>
                      <p className="text-violet-300 text-sm mt-1">by {artwork.creator}</p>

                      <div className="flex items-center mt-3 text-violet-400">
                        <Star className="h-4 w-4 fill-violet-400 text-violet-400 mr-1" />
                        <span>{artwork.likes} likes</span>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-violet-900/20">
        <div className="container px-4 md:px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 text-transparent bg-clip-text">
              Explore Categories
            </h2>
            <p className="text-violet-400 mt-3 max-w-2xl mx-auto">
              Discover amazing content across different categories from talented creators
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Anime & Manga Artists",
                description: "Discover incredible artwork from talented anime and manga artists",
                icon: <Star className="h-8 w-8" />,
                link: "/creator",
                color: "from-violet-500 to-purple-600",
              },
              {
                title: "Light Novel & Manga Writers",
                description: "Explore captivating stories, light novels, and manga scripts",
                icon: <BookOpen className="h-8 w-8" />,
                link: "/writer",
                color: "from-purple-500 to-pink-600",
              },
              {
                title: "Anime Video Creators",
                description: "Watch amazing animations, motion graphics, and video content",
                icon: <Film className="h-8 w-8" />,
                link: "/video-maker",
                color: "from-violet-600 to-indigo-600",
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Link href={category.link} className="block group">
                  <div className="relative overflow-hidden rounded-xl bg-violet-900/30 border border-violet-800/50 p-8 h-full shadow-lg">
                    <div
                      className={cn(
                        "absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity",
                        `bg-gradient-to-br ${category.color}`,
                      )}
                    />

                    <div
                      className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white",
                        `bg-gradient-to-br ${category.color}`,
                      )}
                    >
                      {category.icon}
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors">
                      {category.title}
                    </h3>

                    <p className="text-violet-300 mt-3">{category.description}</p>

                    <div className="mt-6 flex items-center text-violet-400 group-hover:text-violet-300 transition-colors">
                      <span>Explore</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Creators */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex items-center justify-between mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 text-transparent bg-clip-text">
                Trending Creators
              </h2>
              <p className="text-violet-400 mt-2">Follow the most popular creators in our community</p>
            </div>
            <Button variant="ghost" className="text-violet-400 hover:text-violet-300 hover:bg-violet-900/30 group">
              View All
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingCreators.map((creator, index) => (
              <motion.div
                key={creator.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <Link href={`/creator/${creator.id}`} className="block group">
                  <div className="relative overflow-hidden rounded-xl bg-violet-900/30 border border-violet-800/50 p-6 shadow-lg">
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity bg-gradient-to-br from-violet-500 to-purple-600" />

                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-violet-600 group-hover:border-violet-400 transition-colors">
                        <Image
                          src={creator.avatar || "/placeholder.svg"}
                          alt={creator.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg text-white group-hover:text-violet-300 transition-colors">
                          {creator.name}
                        </h3>
                        <p className="text-violet-400 text-sm">{creator.category}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-violet-300">
                        <span className="font-semibold">{creator.followers.toLocaleString()}</span> followers
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="border-violet-600 text-violet-300 hover:bg-violet-800 hover:text-violet-200"
                      >
                        Follow
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-violet-900/40 to-purple-900/40 border-t border-violet-800/30">
        <div className="container px-4 md:px-6">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Share Your Anime Creations?</h2>

            <p className="text-violet-300 text-lg mb-8">
              Join thousands of creators and share your artwork, stories, and animations with our passionate community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 rounded-xl font-medium text-lg group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-violet-500 text-violet-300 hover:text-violet-200 hover:bg-violet-900/30 px-8 py-6 rounded-xl font-medium text-lg"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
