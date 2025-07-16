"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ArrowRight, Instagram, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroSlides = [
    {
      id: 1,
      title: "Redefine Your Professional Style",
      subtitle: "Discover premium formal wear for the modern professional",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Summer%20Fits%20for%20Men-VTZaNXhsUQSzx1PqQ1px58wrQoFnxS.jpeg",
      cta: "Shop Men's Collection",
      link: "/category/men",
    },
    {
      id: 2,
      title: "Elegance in Every Detail",
      subtitle: "Crafted with precision, designed for success",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Linen-Cotton%20Resort%20Shirt%20_%20Banana%20Republic-4NhcKwlQDKFs7rtMabXRmLLkWwEt5T.jpeg",
      cta: "Shop Women's Collection",
      link: "/category/women",
    },
    {
      id: 3,
      title: "New Season, New Style",
      subtitle: "Explore our latest arrivals for the upcoming season",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%F0%9F%94%A5%20Step%20Up%20Your%20Fashion%20Game%21%20%F0%9F%94%A5%20Elevate%20your%E2%80%A6-9yOaNCl2Qpdrke1XggbQrlFSfL0BIy.jpeg",
      cta: "Shop New Arrivals",
      link: "/new-arrivals",
    },
  ]

  const newArrivals = [
    {
      id: 1,
      name: "Premium Black Suit",
      price: 299,
      originalPrice: 399,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Summer%20Fits%20for%20Men-VTZaNXhsUQSzx1PqQ1px58wrQoFnxS.jpeg",
      badge: "New",
      category: "suits",
      slug: "premium-black-suit",
    },
    {
      id: 2,
      name: "Classic Plaid Shirt",
      price: 89,
      originalPrice: 120,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fashion%20Checked%20Shirt%20Size%20L-i4EkdmDWqdGJCIgPasbArLfDSmxG5g.jpeg",
      badge: "Hot",
      category: "shirts",
      slug: "classic-plaid-shirt",
    },
    {
      id: 3,
      name: "Linen Resort Shirt",
      price: 199,
      originalPrice: 250,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Linen-Cotton%20Resort%20Shirt%20_%20Banana%20Republic-4NhcKwlQDKFs7rtMabXRmLLkWwEt5T.jpeg",
      badge: "Sale",
      category: "shirts",
      slug: "linen-resort-shirt",
    },
    {
      id: 4,
      name: "Streetwear T-Shirt",
      price: 129,
      originalPrice: 160,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%F0%9F%94%A5%20Step%20Up%20Your%20Fashion%20Game%21%20%F0%9F%94%A5%20Elevate%20your%E2%80%A6-9yOaNCl2Qpdrke1XggbQrlFSfL0BIy.jpeg",
      badge: "New",
      category: "t-shirts",
      slug: "streetwear-t-shirt",
    },
  ]

  const categories = [
    {
      name: "Formal Shoes",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Summer%20Fits%20for%20Men-VTZaNXhsUQSzx1PqQ1px58wrQoFnxS.jpeg",
      count: "120+ Products",
      slug: "shoes",
    },
    {
      name: "Formal Suits",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Summer%20Fits%20for%20Men-VTZaNXhsUQSzx1PqQ1px58wrQoFnxS.jpeg",
      count: "85+ Products",
      slug: "suits",
    },
    {
      name: "Cargo Pants",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Oversized%20Branded%20Colour%20Block%20Hooded%20Tracksuit-pOgMQoiVOprVHbInylsRC34U6aJrSe.jpeg",
      count: "45+ Products",
      slug: "cargos",
    },
    {
      name: "T-Shirts",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brand%20new%20Plain%20T-shirts%20available%20M%2CL%2CXL%2CXXL-fySjV9fXrAf6M4PRaHi2A26Bo4z2RT.jpeg",
      count: "200+ Products",
      slug: "t-shirts",
    },
  ]

  const newShirts = [
    {
      id: 1,
      name: "Plaid Button Down",
      price: 79,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Plaided%20Guayabera%20Shirt%20-%20Almond%20_%2036-aLZUwlzmt0CRV4SIHUQLivYHYukrW7.jpeg",
      rating: 4.8,
      category: "shirts",
      slug: "plaid-button-down",
    },
    {
      id: 2,
      name: "Linen Resort Shirt",
      price: 95,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Linen-Cotton%20Resort%20Shirt%20_%20Banana%20Republic-4NhcKwlQDKFs7rtMabXRmLLkWwEt5T.jpeg",
      rating: 4.9,
      category: "shirts",
      slug: "linen-resort-shirt",
    },
    {
      id: 3,
      name: "Artistic Print Shirt",
      price: 65,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zanzea%20_%20women%20fashion%20outfits-9lXBNUZElFZnBU5hmmgdif3PIx4UfY.jpeg",
      rating: 4.7,
      category: "shirts",
      slug: "artistic-print-shirt",
    },
    {
      id: 4,
      name: "Classic Checkered Shirt",
      price: 110,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fashion%20Checked%20Shirt%20Size%20L-i4EkdmDWqdGJCIgPasbArLfDSmxG5g.jpeg",
      rating: 4.6,
      category: "shirts",
      slug: "classic-checkered-shirt",
    },
    {
      id: 5,
      name: "Premium Black T-Shirt",
      price: 85,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brand%20new%20Plain%20T-shirts%20available%20M%2CL%2CXL%2CXXL-fySjV9fXrAf6M4PRaHi2A26Bo4z2RT.jpeg",
      rating: 4.8,
      category: "shirts",
      slug: "premium-black-t-shirt",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Executive",
      content:
        "Rearrare has completely transformed my professional wardrobe. The quality is exceptional and the fit is perfect.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Michael Chen",
      role: "Corporate Lawyer",
      content: "I've been shopping here for years. The formal wear collection is unmatched in quality and style.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Emma Davis",
      role: "Marketing Director",
      content: "From boardroom to dinner meetings, Rearrare keeps me looking professional and confident.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const instagramPosts = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Summer%20Fits%20for%20Men-VTZaNXhsUQSzx1PqQ1px58wrQoFnxS.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/60fa208c-1b50-4514-b488-6cbc8d8f1995-kpw0dp3aQLYmX74kiCmnIqjbhXpOHw.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%F0%9F%94%A5%20Step%20Up%20Your%20Fashion%20Game%21%20%F0%9F%94%A5%20Elevate%20your%E2%80%A6-9yOaNCl2Qpdrke1XggbQrlFSfL0BIy.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fashion%20Checked%20Shirt%20Size%20L-i4EkdmDWqdGJCIgPasbArLfDSmxG5g.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Plaided%20Guayabera%20Shirt%20-%20Almond%20_%2036-aLZUwlzmt0CRV4SIHUQLivYHYukrW7.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zanzea%20_%20women%20fashion%20outfits-9lXBNUZElFZnBU5hmmgdif3PIx4UfY.jpeg",
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Slideshow */}
      <section className="relative h-[600px] md:h-[700px] bg-black text-white">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />
            <div className="absolute inset-0">
              <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" />
            </div>

            <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">{slide.title}</h1>
                <p className="text-xl text-gray-300 mb-8">{slide.subtitle}</p>
                <Link href={slide.link}>
                  <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4">
                    {slide.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Slideshow Controls */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-white/40"
              } transition-colors duration-300`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors duration-300"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">New Arrivals</h2>
              <p className="text-gray-600 text-lg">The latest additions to our premium collection</p>
            </div>
            <Link href="/new-arrivals">
              <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Shop by Category</h2>
            <p className="text-gray-600 text-lg">Discover our curated collections for every occasion</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link key={index} href={`/category/${category.slug}`}>
                <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        width={300}
                        height={300}
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-semibold text-black mb-2">{category.name}</h3>
                      <p className="text-gray-600">{category.count}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Shirts Section with Horizontal Scroll */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">New Shirt Collection</h2>
              <p className="text-gray-600 text-lg">Premium shirts for the discerning professional</p>
            </div>
            <Link href="/category/shirts">
              <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                View All Shirts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {newShirts.map((shirt) => (
              <ProductCard key={shirt.id} product={shirt} className="flex-shrink-0 w-72" />
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Special Offer on Shirts</h2>
              <p className="text-xl text-gray-300 mb-8">
                Get up to 40% off on our premium shirt collection. Limited time offer for the sophisticated
                professional.
              </p>
              <div className="flex items-center space-x-4 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">40%</div>
                  <div className="text-sm text-gray-400">OFF</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">FREE</div>
                  <div className="text-sm text-gray-400">SHIPPING</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-sm text-gray-400">SUPPORT</div>
                </div>
              </div>
              <Link href="/category/shirts">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                  Shop Shirts Now
                  <ShoppingBag className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Plaided%20Guayabera%20Shirt%20-%20Almond%20_%2036-aLZUwlzmt0CRV4SIHUQLivYHYukrW7.jpeg"
                alt="Special Offer"
                width={500}
                height={600}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Hear from Our Customers</h2>
            <p className="text-gray-600 text-lg">What professionals say about Rearrare</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-black">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Follow Us on Instagram</h2>
            <p className="text-gray-600 text-lg mb-8">Stay updated with our latest collections and style inspiration</p>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600">
              <Instagram className="mr-2 h-5 w-5" />
              Follow @rearrare
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {instagramPosts.map((post, index) => (
              <div key={index} className="relative group cursor-pointer overflow-hidden rounded-lg">
                <Image
                  src={post || "/placeholder.svg"}
                  alt={`Instagram post ${index + 1}`}
                  width={200}
                  height={200}
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram className="h-8 w-8 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
