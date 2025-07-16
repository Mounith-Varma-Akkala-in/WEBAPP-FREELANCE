"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Eye, Star, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  badge?: string
  rating?: number
  category: string
  slug: string
}

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/product/${product.slug}`}>
      <Card
        className={cn("group cursor-pointer hover:shadow-lg transition-all duration-300 border-0", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          <div className="relative overflow-hidden rounded-t-lg">
            <div className="aspect-[3/4] relative">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {product.badge && <Badge className="absolute top-2 left-2 bg-black text-white">{product.badge}</Badge>}

            <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                <Eye className="h-4 w-4" />
              </Button>
            </div>

            <div
              className={`absolute bottom-0 left-0 right-0 bg-black text-white py-3 px-4 transform transition-transform duration-300 ${
                isHovered ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <ShoppingBag className="h-4 w-4" />
                <span>Add to Cart</span>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-black mb-2 line-clamp-1">{product.name}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-black">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>

              {product.rating && (
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">{product.rating}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
