"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, ShoppingBag, User, Menu, Heart, X } from "lucide-react"
import { usePathname } from "next/navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount] = useState(3)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const menCategories = [
    { name: "Suits", slug: "suits" },
    { name: "Shirts", slug: "shirts" },
    { name: "Trousers", slug: "trousers" },
    { name: "Shoes", slug: "shoes" },
    { name: "Accessories", slug: "accessories" },
  ]

  const womenCategories = [
    { name: "Blazers", slug: "blazers" },
    { name: "Blouses", slug: "blouses" },
    { name: "Skirts", slug: "skirts" },
    { name: "Dresses", slug: "dresses" },
    { name: "Shoes", slug: "shoes" },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b border-gray-100">
          <div className="text-gray-600">Free shipping on orders over $100 | 30-day returns</div>
          <div className="flex items-center space-x-4">
            <Link href="/track-order" className="text-gray-600 hover:text-black">
              Track Order
            </Link>
            <Link href="/help" className="text-gray-600 hover:text-black">
              Help
            </Link>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-3xl font-bold text-black">
            rearrare
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`font-medium ${isActive("/category/men") ? "text-black" : "text-gray-600 hover:text-black"}`}
              >
                Men
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {menCategories.map((category) => (
                  <Link key={category.slug} href={`/category/${category.slug}`} passHref>
                    <DropdownMenuItem className="cursor-pointer">{category.name}</DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={`font-medium ${isActive("/category/women") ? "text-black" : "text-gray-600 hover:text-black"}`}
              >
                Women
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {womenCategories.map((category) => (
                  <Link key={category.slug} href={`/category/${category.slug}`} passHref>
                    <DropdownMenuItem className="cursor-pointer">{category.name}</DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/new-arrivals"
              className={`font-medium ${isActive("/new-arrivals") ? "text-black" : "text-gray-600 hover:text-black"}`}
            >
              New Arrivals
            </Link>
            <Link
              href="/sale"
              className={`font-medium ${isActive("/sale") ? "text-black" : "text-gray-600 hover:text-black"}`}
            >
              Sale
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="pl-10 border-gray-300 focus:border-black"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/account">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/wishlist">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-black text-white">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="pl-10 border-gray-300 focus:border-black"
                />
              </div>

              <div className="py-2 font-medium">Men</div>
              <div className="pl-4 space-y-2">
                {menCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="block py-1 text-gray-600 hover:text-black"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              <div className="py-2 font-medium">Women</div>
              <div className="pl-4 space-y-2">
                {womenCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="block py-1 text-gray-600 hover:text-black"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              <Link href="/new-arrivals" className="text-black hover:text-gray-600 font-medium py-2">
                New Arrivals
              </Link>
              <Link href="/sale" className="text-black hover:text-gray-600 font-medium py-2">
                Sale
              </Link>

              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                <Link href="/account">
                  <Button variant="ghost" size="sm">
                    <User className="h-5 w-5 mr-2" />
                    Account
                  </Button>
                </Link>
                <Link href="/wishlist">
                  <Button variant="ghost" size="sm">
                    <Heart className="h-5 w-5 mr-2" />
                    Wishlist
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
