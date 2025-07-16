"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, ImageIcon, FileText, Film } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setSelectedFile(file)

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return

    setIsUploading(true)
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false)
      // Reset form or redirect
      setSelectedFile(null)
      setPreview(null)
      // In a real app, you would redirect to the uploaded content page
    }, 2000)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 text-transparent bg-clip-text">
          Share Your Creation
        </h1>
        <p className="text-violet-700 dark:text-violet-300 mt-2">
          Upload your artwork, story, or animation to share with the Animaker community
        </p>
      </div>

      <Card className="bg-white/80 dark:bg-violet-900/30 backdrop-blur-md">
        <Tabs defaultValue="creator">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="creator" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Artwork
            </TabsTrigger>
            <TabsTrigger value="writer" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Story
            </TabsTrigger>
            <TabsTrigger value="video-maker" className="flex items-center gap-2">
              <Film className="h-4 w-4" />
              Animation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="creator">
            <form onSubmit={handleUpload}>
              <CardHeader>
                <CardTitle>Upload Artwork</CardTitle>
                <CardDescription>Share your anime, manga, or fan art with the community</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="My Awesome Anime Art" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Tell us about your artwork..." className="min-h-[100px]" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input id="tags" placeholder="anime, digital art, character design" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="artwork-upload">Upload Image</Label>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-violet-300 dark:border-violet-700 rounded-lg p-6 transition-all hover:border-violet-500">
                    {preview ? (
                      <div className="relative w-full max-w-md mx-auto">
                        <img
                          src={preview || "/placeholder.svg"}
                          alt="Preview"
                          className="rounded-lg max-h-[300px] mx-auto object-contain"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setSelectedFile(null)
                            setPreview(null)
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-10 w-10 text-violet-500 mb-2" />
                        <p className="text-sm text-center text-violet-700 dark:text-violet-300">
                          Drag and drop your image here, or click to browse
                        </p>
                        <p className="text-xs text-center text-violet-500 mt-1">Supports: JPG, PNG, GIF (Max 10MB)</p>
                        <Input
                          id="artwork-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="mt-4"
                          onClick={() => document.getElementById("artwork-upload")?.click()}
                        >
                          Select File
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-violet-600 hover:bg-violet-700"
                  disabled={isUploading || !selectedFile}
                >
                  {isUploading ? "Uploading..." : "Upload Artwork"}
                </Button>
              </CardFooter>
            </form>
          </TabsContent>

          <TabsContent value="writer">
            <form onSubmit={handleUpload}>
              <CardHeader>
                <CardTitle>Upload Story</CardTitle>
                <CardDescription>Share your light novel, manga script, or fan fiction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="story-title">Title</Label>
                  <Input id="story-title" placeholder="My Anime Light Novel" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="story-description">Synopsis</Label>
                  <Textarea
                    id="story-description"
                    placeholder="A brief summary of your story..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="story-content">Story Content</Label>
                  <Textarea
                    id="story-content"
                    placeholder="Write your story here or upload a document..."
                    className="min-h-[200px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="story-tags">Tags (comma separated)</Label>
                  <Input id="story-tags" placeholder="light novel, fantasy, romance" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cover-image">Cover Image (Optional)</Label>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-violet-300 dark:border-violet-700 rounded-lg p-6 transition-all hover:border-violet-500">
                    <Upload className="h-10 w-10 text-violet-500 mb-2" />
                    <p className="text-sm text-center text-violet-700 dark:text-violet-300">
                      Upload a cover image for your story
                    </p>
                    <Input id="cover-image" type="file" accept="image/*" className="hidden" />
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4"
                      onClick={() => document.getElementById("cover-image")?.click()}
                    >
                      Select Image
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700">
                  Upload Story
                </Button>
              </CardFooter>
            </form>
          </TabsContent>

          <TabsContent value="video-maker">
            <form onSubmit={handleUpload}>
              <CardHeader>
                <CardTitle>Upload Animation</CardTitle>
                <CardDescription>Share your anime animation, motion graphics, or video content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="video-title">Title</Label>
                  <Input id="video-title" placeholder="My Anime Animation" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="video-description">Description</Label>
                  <Textarea
                    id="video-description"
                    placeholder="Tell us about your animation..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="video-tags">Tags (comma separated)</Label>
                  <Input id="video-tags" placeholder="animation, action, effects" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Thumbnail</Label>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-violet-300 dark:border-violet-700 rounded-lg p-6 transition-all hover:border-violet-500">
                    <Upload className="h-10 w-10 text-violet-500 mb-2" />
                    <p className="text-sm text-center text-violet-700 dark:text-violet-300">
                      Upload a thumbnail for your animation
                    </p>
                    <Input id="thumbnail" type="file" accept="image/*" className="hidden" />
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4"
                      onClick={() => document.getElementById("thumbnail")?.click()}
                    >
                      Select Thumbnail
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="video-upload">Upload Video</Label>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-violet-300 dark:border-violet-700 rounded-lg p-6 transition-all hover:border-violet-500">
                    <Upload className="h-10 w-10 text-violet-500 mb-2" />
                    <p className="text-sm text-center text-violet-700 dark:text-violet-300">
                      Drag and drop your video here, or click to browse
                    </p>
                    <p className="text-xs text-center text-violet-500 mt-1">Supports: MP4, WebM (Max 100MB)</p>
                    <Input id="video-upload" type="file" accept="video/*" className="hidden" />
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4"
                      onClick={() => document.getElementById("video-upload")?.click()}
                    >
                      Select Video
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700">
                  Upload Animation
                </Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
