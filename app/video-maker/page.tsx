"use client"

import { useState } from "react"
import MasonryGrid from "@/components/masonry-grid"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

// Generate more sample data for a fuller grid
const generateArtworks = () => {
  const categories = ["Video Maker"]
  const creators = [
    "AnimeMaker",
    "ActionAnimator",
    "AnimeEffects",
    "SakuraAnimator",
    "ActionMaster",
    "SliceAnimator",
    "MotionArtist",
    "VisualEffects",
  ]
  const titles = [
    "Mecha Battle Animation",
    "Samurai vs Ninja - Animation",
    "Magical Girl Transformation",
    "Sakura Petals Animation",
    "Epic Battle Scene",
    "Slice of Life - Anime Short",
    "Dragon Flight Animation",
    "Cyberpunk City Flythrough",
    "Magic Spell Effects",
    "Character Showcase",
    "Emotional Scene",
    "Action Sequence Demo",
    "Fantasy World Tour",
    "Anime Opening Sequence",
    "Villain Transformation",
    "School Life Animation",
    "Romantic Moment",
    "Fight Choreography",
    "Special Powers Animation",
    "Mecha Transformation",
  ]

  return Array.from({ length: 50 }, (_, i) => ({
    id: (i + 1).toString(),
    title: titles[Math.floor(Math.random() * titles.length)],
    creator: creators[Math.floor(Math.random() * creators.length)],
    image: `/placeholder.svg?height=${Math.floor(Math.random() * 300 + 300)}&width=400`,
    category: categories[0],
    likes: Math.floor(Math.random() * 300 + 50),
  }))
}

export default function VideoMakerPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [artworks, setArtworks] = useState(generateArtworks())

  return (
    <div className="min-h-screen pt-16">
      {/* Minimal header */}
      <div className="sticky top-16 z-30 bg-violet-950/80 backdrop-blur-md border-b border-violet-800/30 py-3">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 text-transparent bg-clip-text">
            Anime Video Creators
          </h1>

          <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-violet-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search animations..."
              className="pl-8 py-1 h-8 bg-violet-900/50 border-violet-700 text-violet-200 rounded-md focus:ring-violet-500 focus:border-violet-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Full-width masonry grid */}
      <div className="w-full">
        <MasonryGrid items={artworks} category="Video Maker" />
      </div>
    </div>
  )
}
