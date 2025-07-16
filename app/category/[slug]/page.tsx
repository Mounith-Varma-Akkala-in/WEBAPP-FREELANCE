"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronRight, SlidersHorizontal, X } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"

// Mock data for different categories
const categoryData = {
  men: {
    title: "Men's Collection",
    description: "Premium formal wear for the modern gentleman",
    image: "/placeholder.svg?height=400&width=1200",
  },
  women: {
    title: "Women's Collection",
    description: "Elegant formal wear for the professional woman",
    image: "/placeholder.svg?height=400&width=1200",
  },
  suits: {
    title: "Formal Suits",
    description: "Premium suits for every occasion",
    image: "/placeholder.svg?height=400&width=1200",
  },
  shirts: {
    title: "Shirts Collection",
    description: "Premium shirts for the discerning professional",
    image: "/placeholder.svg?height=400&width=1200",
  },
  shoes: {
    title: "Formal Shoes",
    description: "Step into style with our premium footwear",
    image: "/placeholder.svg?height=400&width=1200",
  },
  cargos: {
    title: "Cargo Pants",
    description: "Stylish and functional cargo pants for every occasion",
    image: "/placeholder.svg?height=400&width=1200",
  },
  "t-shirts": {
    title: "T-Shirts Collection",
    description: "Premium t-shirts for casual elegance",
    image: "/placeholder.svg?height=400&width=1200",
  },
  blazers: {
    title: "Blazers Collection",
    description: "Sophisticated blazers for the modern professional",
    image: "/placeholder.svg?height=400&width=1200",
  },
  blouses: {
    title: "Blouses Collection",
    description: "Elegant blouses for the professional woman",
    image: "/placeholder.svg?height=400&width=1200",
  },
  skirts: {
    title: "Skirts Collection",
    description: "Stylish skirts for the modern professional",
    image: "/placeholder.svg?height=400&width=1200",
  },
  dresses: {
    title: "Dresses Collection",
    description: "Elegant dresses for every occasion",
    image: "/placeholder.svg?height=400&width=1200",
  },
  accessories: {
    title: "Accessories Collection",
    description: "Complete your look with our premium accessories",
    image: "/placeholder.svg?height=400&width=1200",
  },
  trousers: {
    title: "Trousers Collection",
    description: "Premium trousers for the modern professional",
    image: "/placeholder.svg?height=400&width=1200",
  },
}

// Mock products data
const productsData = [
  {
    id: 1,
    name: "Premium Black Suit",
    price: 299,
    originalPrice: 399,
    image: "/placeholder.svg?height=400&width=300",
    badge: "New",
    rating: 4.8,
    category: "suits",
    slug: "premium-black-suit",
  },
  {
    id: 2,
    name: "Classic White Shirt",
    price: 89,
    originalPrice: 120,
    image: "/placeholder.svg?height=400&width=300",
    badge: "Hot",
    rating: 4.9,
    category: "shirts",
    slug: "classic-white-shirt",
  },
  {
    id: 3,
    name: "Elegant Blazer",
    price: 199,
    originalPrice: 250,
    image: "/placeholder.svg?height=400&width=300",
    badge: "Sale",
    rating: 4.7,
    category: "blazers",
    slug: "elegant-blazer",
  },
  {
    id: 4,
    name: "Formal Trousers",
    price: 129,
    originalPrice: 160,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.6,
    category: "trousers",
    slug: "formal-trousers",
  },
  {
    id: 5,
    name: "Oxford Cotton Shirt",
    price: 79,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.8,
    category: "shirts",
    slug: "oxford-cotton-shirt",
  },
  {
    id: 6,
    name: "Slim Fit Dress Shirt",
    price: 95,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.9,
    category: "shirts",
    slug: "slim-fit-dress-shirt",
  },
  {
    id: 7,
    name: "Leather Oxford Shoes",
    price: 199,
    originalPrice: 250,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.7,
    category: "shoes",
    slug: "leather-oxford-shoes",
  },
  {
    id: 8,
    name: "Casual Button Down",
    price: 65,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.5,
    category: "shirts",
    slug: "casual-button-down",
  },
  {
    id: 9,
    name: "Premium Linen Shirt",
    price: 110,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.6,
    category: "shirts",
    slug: "premium-linen-shirt",
  },
  {
    id: 10,
    name: "Classic White Formal",
    price: 85,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.8,
    category: "shirts",
    slug: "classic-white-formal",
  },
  {
    id: 11,
    name: "Cargo Pants Black",
    price: 89,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.7,
    category: "cargos",
    slug: "cargo-pants-black",
  },
  {
    id: 12,
    name: "Premium T-Shirt",
    price: 45,
    image: "/placeholder.svg?height=400&width=300",
    rating: 4.8,
    category: "t-shirts",
    slug: "premium-t-shirt",
  },
]

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const category = categoryData[slug as keyof typeof categoryData] || {
    title: "Products",
    description: "Browse our collection",
    image: "/placeholder.svg?height=400&width=1200",
  }

  const [products, setProducts] = useState<any[]>([])
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    sortBy: "newest",
    colors: [] as string[],
    sizes: [] as string[],
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    // Filter products based on category
    let filteredProducts = productsData

    if (slug === "men") {
      filteredProducts = productsData.filter((p) =>
        ["suits", "shirts", "trousers", "shoes", "accessories"].includes(p.category),
      )
    } else if (slug === "women") {
      filteredProducts = productsData.filter((p) =>
        ["blazers", "blouses", "skirts", "dresses", "shoes"].includes(p.category),
      )
    } else {
      filteredProducts = productsData.filter((p) => p.category === slug)
    }

    // Apply price filter
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1],
    )

    // Apply sorting
    if (filters.sortBy === "price-low") {
      filteredProducts.sort((a, b) => a.price - b.price)
    } else if (filters.sortBy === "price-high") {
      filteredProducts.sort((a, b) => b.price - a.price)
    } else if (filters.sortBy === "rating") {
      filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    }

    setProducts(filteredProducts)
  }, [slug, filters])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Category Banner */}
      <section className="relative h-[300px] bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
        <div className="absolute inset-0">
          <Image src={category.image || "/placeholder.svg"} alt={category.title} fill className="object-cover" />
        </div>

        <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{category.title}</h1>
            <p className="text-xl text-gray-300">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-black">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            {slug === "men" || slug === "women" ? (
              <span className="text-black font-medium">{slug === "men" ? "Men" : "Women"}</span>
            ) : (
              <>
                <Link
                  href={`/category/${slug.includes("shirt") || slug === "suits" || slug === "trousers" || slug === "accessories" ? "men" : "women"}`}
                  className="hover:text-black"
                >
                  {slug.includes("shirt") || slug === "suits" || slug === "trousers" || slug === "accessories"
                    ? "Men"
                    : "Women"}
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-black font-medium">{category.title}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="text-xl font-bold mb-6">Filters</h2>

              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-semibold mb-4">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 500]}
                      max={500}
                      step={10}
                      onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>${filters.priceRange[0]}</span>
                      <span>${filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Colors */}
                <div>
                  <h3 className="font-semibold mb-4">Colors</h3>
                  <div className="space-y-2">
                    {["Black", "White", "Blue", "Gray", "Brown"].map((color) => (
                      <div key={color} className="flex items-center space-x-2">
                        <Checkbox
                          id={`color-${color}`}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters({ ...filters, colors: [...filters.colors, color] })
                            } else {
                              setFilters({ ...filters, colors: filters.colors.filter((c) => c !== color) })
                            }
                          }}
                        />
                        <label htmlFor={`color-${color}`} className="text-sm cursor-pointer">
                          {color}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Sizes */}
                <div>
                  <h3 className="font-semibold mb-4">Sizes</h3>
                  <div className="space-y-2">
                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                      <div key={size} className="flex items-center space-x-2">
                        <Checkbox
                          id={`size-${size}`}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters({ ...filters, sizes: [...filters.sizes, size] })
                            } else {
                              setFilters({ ...filters, sizes: filters.sizes.filter((s) => s !== size) })
                            }
                          }}
                        />
                        <label htmlFor={`size-${size}`} className="text-sm cursor-pointer">
                          {size}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Sort and Filter Controls */}
            <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
              <p className="text-gray-600">{products.length} products</p>

              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  className="lg:hidden flex items-center space-x-2"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filters</span>
                </Button>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <Select value={filters.sortBy} onValueChange={(value) => setFilters({ ...filters, sortBy: value })}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Best Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {products.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or check back later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)} />

          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsFilterOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <h3 className="font-semibold mb-4">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 500]}
                    max={500}
                    step={10}
                    onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Colors */}
              <div>
                <h3 className="font-semibold mb-4">Colors</h3>
                <div className="space-y-2">
                  {["Black", "White", "Blue", "Gray", "Brown"].map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-color-${color}`}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFilters({ ...filters, colors: [...filters.colors, color] })
                          } else {
                            setFilters({ ...filters, colors: filters.colors.filter((c) => c !== color) })
                          }
                        }}
                      />
                      <label htmlFor={`mobile-color-${color}`} className="text-sm cursor-pointer">
                        {color}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Sizes */}
              <div>
                <h3 className="font-semibold mb-4">Sizes</h3>
                <div className="space-y-2">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <div key={size} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-size-${size}`}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFilters({ ...filters, sizes: [...filters.sizes, size] })
                          } else {
                            setFilters({ ...filters, sizes: filters.sizes.filter((s) => s !== size) })
                          }
                        }}
                      />
                      <label htmlFor={`mobile-size-${size}`} className="text-sm cursor-pointer">
                        {size}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full bg-black text-white hover:bg-gray-800" onClick={() => setIsFilterOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
