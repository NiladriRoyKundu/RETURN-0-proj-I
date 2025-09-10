"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Play,
  Pause,
  Volume2,
  Download,
  BookOpen,
  Video,
  Headphones,
  Search,
  Filter,
  Clock,
  Star,
  ArrowLeft,
  Heart,
  Globe,
  Users,
} from "lucide-react"
import Link from "next/link"

interface Resource {
  id: string
  title: string
  description: string
  type: "video" | "audio" | "guide" | "worksheet"
  category: string
  duration: string
  language: string
  rating: number
  thumbnail: string
  url: string
  downloadable: boolean
}

const resources: Resource[] = [
  {
    id: "1",
    title: "Understanding Anxiety: A Student's Guide",
    description: "Learn about anxiety symptoms, triggers, and effective coping strategies specifically for students.",
    type: "video",
    category: "Anxiety",
    duration: "12:30",
    language: "English",
    rating: 4.8,
    thumbnail: "/anxiety-guide-thumbnail.jpg",
    url: "/videos/anxiety-guide.mp4",
    downloadable: false,
  },
  {
    id: "2",
    title: "Progressive Muscle Relaxation",
    description: "A guided 15-minute session to help you release physical tension and mental stress.",
    type: "audio",
    category: "Relaxation",
    duration: "15:00",
    language: "English",
    rating: 4.9,
    thumbnail: "/relaxation-audio-cover.jpg",
    url: "/audio/progressive-relaxation.mp3",
    downloadable: true,
  },
  {
    id: "3",
    title: "Mindfulness Meditation for Beginners",
    description: "Start your mindfulness journey with this gentle introduction to meditation practices.",
    type: "audio",
    category: "Mindfulness",
    duration: "10:00",
    language: "Spanish",
    rating: 4.7,
    thumbnail: "/mindfulness-cover.jpg",
    url: "/audio/mindfulness-spanish.mp3",
    downloadable: true,
  },
  {
    id: "4",
    title: "Managing Academic Stress",
    description: "Comprehensive guide with practical strategies for handling academic pressure and deadlines.",
    type: "guide",
    category: "Academic Stress",
    duration: "20 min read",
    language: "English",
    rating: 4.6,
    thumbnail: "/academic-stress-guide.jpg",
    url: "/guides/academic-stress.pdf",
    downloadable: true,
  },
  {
    id: "5",
    title: "Sleep Hygiene for Better Mental Health",
    description: "Learn how proper sleep habits can significantly improve your mental wellbeing.",
    type: "video",
    category: "Sleep",
    duration: "8:45",
    language: "French",
    rating: 4.5,
    thumbnail: "/sleep-hygiene-video.jpg",
    url: "/videos/sleep-hygiene-french.mp4",
    downloadable: false,
  },
  {
    id: "6",
    title: "Breathing Exercises for Panic Attacks",
    description: "Quick and effective breathing techniques to manage panic attacks and acute anxiety.",
    type: "audio",
    category: "Crisis Management",
    duration: "5:30",
    language: "English",
    rating: 4.9,
    thumbnail: "/breathing-exercises-cover.jpg",
    url: "/audio/breathing-exercises.mp3",
    downloadable: true,
  },
  {
    id: "7",
    title: "Building Resilience Workbook",
    description: "Interactive exercises and worksheets to develop emotional resilience and coping skills.",
    type: "worksheet",
    category: "Personal Growth",
    duration: "Self-paced",
    language: "English",
    rating: 4.7,
    thumbnail: "/resilience-workbook.jpg",
    url: "/worksheets/resilience-workbook.pdf",
    downloadable: true,
  },
  {
    id: "8",
    title: "Meditation for Depression Relief",
    description: "Gentle meditation practices designed to help alleviate symptoms of depression.",
    type: "audio",
    category: "Depression",
    duration: "20:00",
    language: "Mandarin",
    rating: 4.8,
    thumbnail: "/depression-meditation-cover.jpg",
    url: "/audio/depression-meditation-mandarin.mp3",
    downloadable: true,
  },
]

const categories = [
  "All",
  "Anxiety",
  "Depression",
  "Stress Management",
  "Mindfulness",
  "Sleep",
  "Academic Stress",
  "Crisis Management",
  "Personal Growth",
]
const languages = ["All Languages", "English", "Spanish", "French", "Mandarin", "Arabic", "Hindi"]

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages")
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory
    const matchesLanguage = selectedLanguage === "All Languages" || resource.language === selectedLanguage

    return matchesSearch && matchesCategory && matchesLanguage
  })

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "audio":
        return <Headphones className="h-4 w-4" />
      case "guide":
        return <BookOpen className="h-4 w-4" />
      case "worksheet":
        return <BookOpen className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "bg-blue-100 text-blue-800"
      case "audio":
        return "bg-green-100 text-green-800"
      case "guide":
        return "bg-purple-100 text-purple-800"
      case "worksheet":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-foreground">Resource Hub</h1>
              </div>
            </div>
            <Badge variant="secondary" className="hidden sm:flex">
              <Globe className="h-3 w-3 mr-1" />
              Multi-Language Support
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-48">
                  <Globe className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="guides">Guides & Worksheets</TabsTrigger>
          </TabsList>

          {/* All Resources */}
          <TabsContent value="all" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="relative">
                    <img
                      src={resource.thumbnail || "/placeholder.svg?height=200&width=400"}
                      alt={resource.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className={`${getTypeColor(resource.type)} border-0`}>
                        {getResourceIcon(resource.type)}
                        <span className="ml-1 capitalize">{resource.type}</span>
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-black/50 text-white border-0">
                        <Clock className="h-3 w-3 mr-1" />
                        {resource.duration}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                      <div className="flex items-center gap-1 ml-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-muted-foreground">{resource.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {resource.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Globe className="h-3 w-3 mr-1" />
                        {resource.language}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm mb-4 line-clamp-2">{resource.description}</CardDescription>
                    <div className="flex gap-2">
                      <Button className="flex-1" onClick={() => setSelectedResource(resource)}>
                        <Play className="h-4 w-4 mr-2" />
                        {resource.type === "video" ? "Watch" : resource.type === "audio" ? "Listen" : "Read"}
                      </Button>
                      {resource.downloadable && (
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources
                .filter((resource) => resource.type === "video")
                .map((resource) => (
                  <Card key={resource.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="relative">
                      <img
                        src={resource.thumbnail || "/placeholder.svg?height=200&width=400"}
                        alt={resource.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="lg" className="rounded-full">
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <Badge variant="secondary" className="bg-black/50 text-white border-0">
                          {resource.duration}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription>{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" onClick={() => setSelectedResource(resource)}>
                        <Play className="h-4 w-4 mr-2" />
                        Watch Video
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Audio Tab */}
          <TabsContent value="audio" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources
                .filter((resource) => resource.type === "audio")
                .map((resource) => (
                  <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Headphones className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {resource.duration}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {resource.language}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">{resource.description}</CardDescription>
                      <div className="flex gap-2">
                        <Button className="flex-1" onClick={() => setSelectedResource(resource)}>
                          <Play className="h-4 w-4 mr-2" />
                          Listen
                        </Button>
                        {resource.downloadable && (
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Guides & Worksheets Tab */}
          <TabsContent value="guides" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources
                .filter((resource) => resource.type === "guide" || resource.type === "worksheet")
                .map((resource) => (
                  <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-8 w-8 text-secondary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs capitalize">
                              {resource.type}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {resource.duration}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">{resource.description}</CardDescription>
                      <div className="flex gap-2">
                        <Button className="flex-1" onClick={() => setSelectedResource(resource)}>
                          <BookOpen className="h-4 w-4 mr-2" />
                          Read
                        </Button>
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Featured Resources Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Featured This Week</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle className="text-primary">Most Popular</CardTitle>
                </div>
                <CardDescription>
                  "Understanding Anxiety: A Student's Guide" - Watched by 1,200+ students this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Watch Now
                </Button>
              </CardContent>
            </Card>

            <Card className="border-secondary/20 bg-secondary/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-secondary" />
                  <CardTitle className="text-secondary">Highest Rated</CardTitle>
                </div>
                <CardDescription>"Progressive Muscle Relaxation" - 4.9/5 stars from 800+ users</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="secondary">
                  <Headphones className="h-4 w-4 mr-2" />
                  Listen Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* Resource Viewer Dialog */}
      <Dialog open={!!selectedResource} onOpenChange={() => setSelectedResource(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedResource && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {getResourceIcon(selectedResource.type)}
                  {selectedResource.title}
                </DialogTitle>
                <DialogDescription>{selectedResource.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {selectedResource.type === "video" && (
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                    <div className="text-white text-center">
                      <Video className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Video Player Placeholder</p>
                      <p className="text-sm opacity-75">Duration: {selectedResource.duration}</p>
                    </div>
                  </div>
                )}
                {selectedResource.type === "audio" && (
                  <div className="bg-muted rounded-lg p-8 text-center">
                    <Headphones className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium mb-2">Audio Player</p>
                    <p className="text-sm text-muted-foreground mb-4">Duration: {selectedResource.duration}</p>
                    <div className="flex items-center justify-center gap-4">
                      <Button variant="outline" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <div className="flex-1 max-w-md bg-background rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full w-1/3"></div>
                      </div>
                      <Button variant="outline" size="icon">
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                {(selectedResource.type === "guide" || selectedResource.type === "worksheet") && (
                  <div className="bg-muted rounded-lg p-8 text-center">
                    <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium mb-2">
                      {selectedResource.type === "guide" ? "Guide" : "Worksheet"} Preview
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">Reading time: {selectedResource.duration}</p>
                    <Button>
                      <BookOpen className="h-4 w-4 mr-2" />
                      Open Full {selectedResource.type === "guide" ? "Guide" : "Worksheet"}
                    </Button>
                  </div>
                )}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">{selectedResource.category}</Badge>
                    <Badge variant="outline">
                      <Globe className="h-3 w-3 mr-1" />
                      {selectedResource.language}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{selectedResource.rating}/5</span>
                    </div>
                  </div>
                  {selectedResource.downloadable && (
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
