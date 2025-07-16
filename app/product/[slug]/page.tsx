"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Heart, Share2, ShoppingBag, Truck, RotateCcw, Shield, ChevronRight, Minus, Plus } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"

// Mock products data with real images
const productsData = [
  {
    id: 1,
    name: "Premium Black Suit",
    price: 299,
    originalPrice: 399,
    description:
      "A premium black suit crafted from the finest Italian wool. Perfect for formal occasions and business meetings. Features a modern cut with a slim fit design that flatters the silhouette.",
    details: ["100% Italian wool", "Fully lined interior", "Two-button closure", "Side vents", "Four interior pockets"],
    sizes: ["38R", "40R", "42R", "44R", "46R"],
    colors: ["Black", "Navy", "Charcoal"],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Summer%20Fits%20for%20Men-VTZaNXhsUQSzx1PqQ1px58wrQoFnxS.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Summer%20Fits%20for%20Men-VTZaNXhsUQSzx1PqQ1px58wrQoFnxS.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Summer%20Fits%20for%20Men-VTZaNXhsUQSzx1PqQ1px58wrQoFnxS.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Summer%20Fits%20for%20Men-VTZaNXhsUQSzx1PqQ1px58wrQoFnxS.jpeg",
    ],
    rating: 4.8,
    reviewCount: 124,
    category: "suits",
    slug: "premium-black-suit",
  },
  {
    id: 2,
    name: "Classic Plaid Shirt",
    price: 89,
    originalPrice: 120,
    description:
      "A timeless plaid shirt made from premium cotton. Features a classic collar and a regular fit that provides comfort without sacrificing style.",
    details: ["100% Cotton", "Classic collar", "Regular fit", "Button cuffs", "Chest pocket"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black/White", "Navy/White", "Gray/White"],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fashion%20Checked%20Shirt%20Size%20L-i4EkdmDWqdGJCIgPasbArLfDSmxG5g.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Plaided%20Guayabera%20Shirt%20-%20Almond%20_%2036-aLZUwlzmt0CRV4SIHUQLivYHYukrW7.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fashion%20Checked%20Shirt%20Size%20L-i4EkdmDWqdGJCIgPasbArLfDSmxG5g.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Plaided%20Guayabera%20Shirt%20-%20Almond%20_%2036-aLZUwlzmt0CRV4SIHUQLivYHYukrW7.jpeg",
    ],
    rating: 4.9,
    reviewCount: 89,
    category: "shirts",
    slug: "classic-plaid-shirt",
  },
  {
    id: 3,
    name: "Linen Resort Shirt",
    price: 199,
    originalPrice: 250,
    description:
      "A sophisticated linen shirt that combines classic styling with modern details. Perfect for both formal and casual occasions.",
    details: ["Premium linen blend", "Short sleeve", "Textured fabric", "Relaxed fit", "Resort collar"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "Black", "White"],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Linen-Cotton%20Resort%20Shirt%20_%20Banana%20Republic-4NhcKwlQDKFs7rtMabXRmLLkWwEt5T.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Linen-Cotton%20Resort%20Shirt%20_%20Banana%20Republic-4NhcKwlQDKFs7rtMabXRmLLkWwEt5T.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Linen-Cotton%20Resort%20Shirt%20_%20Banana%20Republic-4NhcKwlQDKFs7rtMabXRmLLkWwEt5T.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Linen-Cotton%20Resort%20Shirt%20_%20Banana%20Republic-4NhcKwlQDKFs7rtMabXRmLLkWwEt5T.jpeg",
    ],
    rating: 4.7,
    reviewCount: 56,
    category: "shirts",
    slug: "linen-resort-shirt",
  },
  {
    id: 4,
    name: "Streetwear T-Shirt",
    price: 129,
    originalPrice: 160,
    description:
      "Premium streetwear t-shirt with bold graphics. Made from high-quality cotton for comfort and durability.",
    details: ["100% Cotton", "Oversized fit", "Screen printed graphics", "Reinforced seams", "Crew neck"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Gray"],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%F0%9F%94%A5%20Step%20Up%20Your%20Fashion%20Game%21%20%F0%9F%94%A5%20Elevate%20your%E2%80%A6-9yOaNCl2Qpdrke1XggbQrlFSfL0BIy.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%F0%9F%94%A5%20Step%20Up%20Your%20Fashion%20Game%21%20%F0%9F%94%A5%20Elevate%20your%E2%80%A6-9yOaNCl2Qpdrke1XggbQrlFSfL0BIy.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%F0%9F%94%A5%20Step%20Up%20Your%20Fashion%20Game%21%20%F0%9F%94%A5%20Elevate%20your%E2%80%A6-9yOaNCl2Qpdrke1XggbQrlFSfL0BIy.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%F0%9F%94%A5%20Step%20Up%20Your%20Fashion%20Game%21%20%F0%9F%94%A5%20Elevate%20your%E2%80%A6-9yOaNCl2Qpdrke1XggbQrlFSfL0BIy.jpeg",
    ],
    rating: 4.6,
    reviewCount: 42,
    category: "t-shirts",
    slug: "streetwear-t-shirt",
  },
  {
    id: 5,
    name: "Premium Black T-Shirt",
    price: 79,
    description:
      "A versatile premium black t-shirt that transitions seamlessly from casual to smart-casual wear. Features a comfortable regular fit.",
    details: ["100% Premium cotton", "Regular fit", "Crew neck", "Reinforced collar", "Pre-shrunk"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Navy", "Gray"],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brand%20new%20Plain%20T-shirts%20available%20M%2CL%2CXL%2CXXL-fySjV9fXrAf6M4PRaHi2A26Bo4z2RT.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brand%20new%20Plain%20T-shirts%20available%20M%2CL%2CXL%2CXXL-fySjV9fXrAf6M4PRaHi2A26Bo4z2RT.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brand%20new%20Plain%20T-shirts%20available%20M%2CL%2CXL%2CXXL-fySjV9fXrAf6M4PRaHi2A26Bo4z2RT.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brand%20new%20Plain%20T-shirts%20available%20M%2CL%2CXL%2CXXL-fySjV9fXrAf6M4PRaHi2A26Bo4z2RT.jpeg",
    ],
    rating: 4.8,
    reviewCount: 67,
    category: "t-shirts",
    slug: "premium-black-t-shirt",
  },
  {
    id: 6,
    name: "Artistic Print Shirt",
    price: 95,
    description:
      "A modern artistic print shirt designed for the contemporary professional. Features unique graphics and comfortable fit.",
    details: ["Premium cotton blend", "Artistic print", "Short sleeve", "Regular fit", "Button closure"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White/Blue", "Black/White", "Navy/White"],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zanzea%20_%20women%20fashion%20outfits-9lXBNUZElFZnBU5hmmgdif3PIx4UfY.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zanzea%20_%20women%20fashion%20outfits-9lXBNUZElFZnBU5hmmgdif3PIx4UfY.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zanzea%20_%20women%20fashion%20outfits-9lXBNUZElFZnBU5hmmgdif3PIx4UfY.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zanzea%20_%20women%20fashion%20outfits-9lXBNUZElFZnBU5hmmgdif3PIx4UfY.jpeg",
    ],
    rating: 4.9,
    reviewCount: 78,
    category: "shirts",
    slug: "artistic-print-shirt",
  },
  {
    id: 7,
    name: "Saturation T-Shirt",
    price: 199,
    originalPrice: 250,
    description:
      "Classic streetwear t-shirt with bold 'SATURATION' branding. Perfect for casual wear with a vintage aesthetic.",
    details: ["100% Cotton", "Vintage wash", "Screen print", "Regular fit", "Crew neck"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Gray"],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/60fa208c-1b50-4514-b488-6cbc8d8f1995-kpw0dp3aQLYmX74kiCmnIqjbhXpOHw.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/60fa208c-1b50-4514-b488-6cbc8d8f1995-kpw0dp3aQLYmX74kiCmnIqjbhXpOHw.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/60fa208c-1b50-4514-b488-6cbc8d8f1995-kpw0dp3aQLYmX74kiCmnIqjbhXpOHw.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/60fa208c-1b50-4514-b488-6cbc8d8f1995-kpw0dp3aQLYmX74kiCmnIqjbhXpOHw.jpeg",
    ],
    rating: 4.7,
    reviewCount: 93,
    category: "t-shirts",
    slug: "saturation-t-shirt",
  },
  {
    id: 8,
    name: "Astronaut Graphic Tee",
    price: 65,
    description:
      "Fun and creative astronaut-themed graphic tee. Perfect for casual wear with unique space-inspired design.",
    details: ["Cotton blend fabric", "Oversized fit", "Back graphic print", "Crew neck", "Soft hand feel"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Gray"],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hombres%20Camiseta%20con%20estampado%20de%20dibujos%20animados%20y%20letra-frcvyvDMuyvF4vho3Sx9VoRs2GDbZ0.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hombres%20Camiseta%20con%20estampado%20de%20dibujos%20animados%20y%20letra-frcvyvDMuyvF4vho3Sx9VoRs2GDbZ0.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hombres%20Camiseta%20con%20estampado%20de%20dibujos%20animados%20y%20letra-frcvyvDMuyvF4vho3Sx9VoRs2GDbZ0.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hombres%20Camiseta%20con%20estampado%20de%20dibujos%20animados%20y%20letra-frcvyvDMuyvF4vho3Sx9VoRs2GDbZ0.jpeg",
    ],
    rating: 4.5,
    reviewCount: 51,
    category: "t-shirts",
    slug: "astronaut-graphic-tee",
  },
  {
    id: 9,
    name: "Color Block Tracksuit",
    price: 349,
    originalPrice: 450,
    description:
      "A modern color-blocked tracksuit that provides comfort and style. Features a contemporary design with premium materials.",
    details: ["Cotton blend", "Color block design", "Hoodie and joggers set", "Relaxed fit", "Kangaroo pocket"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Gray/Beige", "Black/White", "Navy/Gray"],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oversized%20Branded%20Colour%20Block%20Hooded%20Tracksuit-pOgMQoiVOprVHbInylsRC34U6aJrSe.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oversized%20Branded%20Colour%20Block%20Hooded%20Tracksuit-pOgMQoiVOprVHbInylsRC34U6aJrSe.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oversized%20Branded%20Colour%20Block%20Hooded%20Tracksuit-pOgMQoiVOprVHbInylsRC34U6aJrSe.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oversized%20Branded%20Colour%20Block%20Hooded%20Tracksuit-pOgMQoiVOprVHbInylsRC34U6aJrSe.jpeg",
    ],
    rating: 4.6,
    reviewCount: 34,
    category: "tracksuits",
    slug: "color-block-tracksuit",
  },
]

const reviews = [
  {
    id: 1,
    name: "John Smith",
    rating: 5,
    date: "2024-01-15",
    comment: "Excellent quality and perfect fit. Highly recommended!",
    verified: true,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    rating: 4,
    date: "2024-01-10",
    comment: "Great product, fast shipping. Very satisfied with my purchase.",
    verified: true,
  },
  {
    id: 3,
    name: "Michael Chen",
    rating: 5,
    date: "2024-01-05",
    comment: "Outstanding quality and attention to detail. Will definitely buy again.",
    verified: true,
  },
]

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const product = productsData.find((p) => p.slug === slug) || productsData[0]

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)

  const relatedProducts = productsData.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-black">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/category/${product.category}`} className="hover:text-black">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-black font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative mb-4">
              <div className="aspect-[4/5] relative overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <Button size="sm" variant="secondary" className="h-10 w-10 p-0">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="sm" variant="secondary" className="h-10 w-10 p-0">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative overflow-hidden rounded-lg border-2 ${
                    selectedImage === index ? "border-black" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-black mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-black">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <Badge className="bg-red-100 text-red-800">Save ${product.originalPrice - product.price}</Badge>
                )}
              </div>

              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Color: {selectedColor}</h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                      selectedColor === color
                        ? "border-black bg-black text-white"
                        : "border-gray-300 bg-white text-black hover:border-gray-400"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Size</h3>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Link href="/size-guide" className="text-sm text-gray-600 hover:text-black underline mt-2 inline-block">
                Size Guide
              </Link>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-medium w-8 text-center">{quantity}</span>
                <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)} className="h-10 w-10 p-0">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4 mb-8">
              <Button size="lg" className="w-full bg-black text-white hover:bg-gray-800" disabled={!selectedSize}>
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-black text-black hover:bg-black hover:text-white"
              >
                Buy Now
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="space-y-3 text-sm text-gray-600 border-t border-gray-200 pt-6">
              <div className="flex items-center">
                <Truck className="h-4 w-4 mr-2" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center">
                <RotateCcw className="h-4 w-4 mr-2" />
                <span>30-day easy returns</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                <span>2-year warranty included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Product Details</h3>
                  <ul className="space-y-2">
                    {product.details.map((detail, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Customer Reviews</h3>
                    <Button variant="outline">Write a Review</Button>
                  </div>

                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{review.name}</span>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified Purchase
                              </Badge>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Shipping & Returns</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Shipping Information</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Free standard shipping on orders over $100</li>
                        <li>• Express shipping available for $15</li>
                        <li>• Orders processed within 1-2 business days</li>
                        <li>• Delivery within 3-7 business days</li>
                      </ul>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2">Returns & Exchanges</h4>
                      <ul className="space-y-1 text-gray-700">
                        <li>• 30-day return policy</li>
                        <li>• Items must be in original condition</li>
                        <li>• Free return shipping</li>
                        <li>• Exchanges available for different sizes/colors</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
