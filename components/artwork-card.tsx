"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, MessageCircle, Share2, BookmarkPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Artwork = {
  id: string
  title: string
  creator: string
  image: string
  category: string
  likes: number
}

interface ArtworkCardProps {
  artwork: Artwork
  minimal?: boolean
}

export default function ArtworkCard({ artwork, minimal = false }: ArtworkCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(artwork.likes)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (liked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setLiked(!liked)
  }

  if (minimal) {
    return (
      <Link href={`/artwork/${artwork.id}`}>
        <div
          className="relative w-full overflow-hidden rounded-sm"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative aspect-auto">
            <Image
              src={artwork.image || "/placeholder.svg"}
              alt={artwork.title}
              width={400}
              height={600}
              className={cn(
                "w-full h-auto object-cover transition-transform duration-500",
                isHovered ? "scale-105" : "scale-100",
              )}
            />
          </div>

          {/* Overlay that appears on hover */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-violet-900/90 via-violet-900/40 to-transparent transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0",
            )}
          >
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="font-medium text-white line-clamp-1">{artwork.title}</h3>
              <p className="text-xs text-violet-200">by {artwork.creator}</p>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full bg-violet-800/50 text-white hover:bg-violet-700"
                    onClick={handleLike}
                  >
                    <Heart className={cn("h-3.5 w-3.5", liked ? "fill-red-500 text-red-500" : "text-white")} />
                    <span className="sr-only">Like</span>
                  </Button>
                  <span className="text-xs text-white">{likes}</span>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full bg-violet-800/50 text-white hover:bg-violet-700"
                  >
                    <BookmarkPlus className="h-3.5 w-3.5" />
                    <span className="sr-only">Save</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Category tag */}
          <div className="absolute top-2 right-2">
            <span className="inline-block px-1.5 py-0.5 text-[10px] font-medium rounded-sm bg-violet-600/80 text-white">
              {artwork.category}
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div
      className="relative rounded-xl overflow-hidden bg-white dark:bg-violet-900/30 shadow-md transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/artwork/${artwork.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={artwork.image || "/placeholder.svg"}
            alt={artwork.title}
            fill
            className={cn("object-cover transition-transform duration-500", isHovered ? "scale-105" : "scale-100")}
          />
        </div>
      </Link>

      <div className="p-3">
        <h3 className="font-medium text-violet-900 dark:text-violet-200 line-clamp-1">{artwork.title}</h3>
        <p className="text-sm text-violet-600 dark:text-violet-300">by {artwork.creator}</p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={handleLike}>
              <Heart
                className={cn("h-4 w-4", liked ? "fill-red-500 text-red-500" : "text-violet-600 dark:text-violet-300")}
              />
              <span className="sr-only">Like</span>
            </Button>
            <span className="text-sm text-violet-600 dark:text-violet-300">{likes}</span>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-violet-600 dark:text-violet-300">
              <MessageCircle className="h-4 w-4" />
              <span className="sr-only">Comment</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-violet-600 dark:text-violet-300">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-violet-600 dark:text-violet-300">
              <BookmarkPlus className="h-4 w-4" />
              <span className="sr-only">Save</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute top-2 right-2">
        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-violet-500/80 text-white">
          {artwork.category}
        </span>
      </div>
    </div>
  )
}
