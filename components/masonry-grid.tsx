"use client"

import { useState, useEffect, useRef } from "react"
import ArtworkCard from "./artwork-card"
import { useMediaQuery } from "@/hooks/use-media-query"

type Artwork = {
  id: string
  title: string
  creator: string
  image: string
  category: string
  likes: number
}

interface MasonryGridProps {
  items: Artwork[]
  category?: string
}

export default function MasonryGrid({ items, category }: MasonryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState(4)
  const isMobile = useMediaQuery("(max-width: 640px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  useEffect(() => {
    if (isMobile) {
      setColumns(2)
    } else if (isTablet) {
      setColumns(3)
    } else {
      setColumns(5)
    }
  }, [isMobile, isTablet])

  // Filter items by category if provided
  const filteredItems = category
    ? items.filter((item) => item.category.toLowerCase() === category.toLowerCase())
    : items

  // Distribute items into columns optimally (by height)
  const getColumnItems = () => {
    const columnItems: Artwork[][] = Array.from({ length: columns }, () => [])
    const columnHeights = Array(columns).fill(0)

    filteredItems.forEach((item) => {
      // Find the column with the smallest height
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))

      // Add the item to the shortest column
      columnItems[shortestColumnIndex].push(item)

      // Update the column height (using a rough estimate based on image aspect ratio)
      // In a real app, you might want to calculate actual heights
      const aspectRatio = 3 / 4 // Default aspect ratio for artwork
      columnHeights[shortestColumnIndex] += aspectRatio
    })

    return columnItems
  }

  const columnItems = getColumnItems()

  return (
    <div ref={containerRef} className="w-full px-0.5 sm:px-1">
      <div className="flex gap-0.5 sm:gap-1">
        {columnItems.map((column, columnIndex) => (
          <div key={columnIndex} className="flex-1 flex flex-col gap-0.5 sm:gap-1">
            {column.map((item) => (
              <ArtworkCard key={item.id} artwork={item} minimal={true} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
