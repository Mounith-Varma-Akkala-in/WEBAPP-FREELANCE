"use client"

import { useState } from "react"
import MasonryGrid from "@/components/masonry-grid"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

// Generate more sample data for a fuller grid
const generateArtworks = () => {
  const categories = ["Creator"]
  const creators = [
    "AnimeArtist42",
    "MangaLover",
    "SakuraArt",
    "UrbanArtist",
    "WatercolorMaster",
    "NeonArtist",
    "PixelMaster",
    "ArtisticSoul",
  ]
  const titles = [
    "Sakura in Spring",
    "Demon Slayer Fan Art",
    "Cherry Blossom Dreams",
    "Tokyo Nights",
    "Ocean Dreams",
    "Cyberpunk City",
    "Moonlit Warrior",
    "Spirit Guardian",
    "Neon Samurai",
    "Mystic Forest",
    "Dragon's Lair",
    "Celestial Princess",
    "Urban Ninja",
    "Magical Realm",
    "Ancient Temple",
    "Future City",
    "Battle Arena",
    "Peaceful Village",
    "Mountain Shrine",
    "Desert Oasis",
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

export default function CreatorPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [artworks, setArtworks] = useState(generateArtworks())

  return (
    <div className="min-h-screen pt-16">
      {/* Minimal header */}
      <div className="sticky top-16 z-30 bg-violet-950/80 backdrop-blur-md border-b border-violet-800/30 py-3">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 text-transparent bg-clip-text">
            Anime & Manga Artists
          </h1>

          <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-violet-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search artwork..."
              className="pl-8 py-1 h-8 bg-violet-900/50 border-violet-700 text-violet-200 rounded-md focus:ring-violet-500 focus:border-violet-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Full-width masonry grid */}
      <div className="w-full">
        <MasonryGrid items={artworks} category="Creator" />
      </div>
    </div>
  )
}
