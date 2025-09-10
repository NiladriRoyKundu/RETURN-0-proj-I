"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MessageSquare,
  ThumbsUp,
  Users,
  Shield,
  Flag,
  Plus,
  Search,
  Eye,
  ArrowLeft,
  Heart,
  Star,
  CheckCircle,
  AlertTriangle,
  Lock,
  Globe,
} from "lucide-react"
import Link from "next/link"

interface Post {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
    isVolunteer: boolean
    isAnonymous: boolean
  }
  category: string
  timestamp: Date
  replies: number
  likes: number
  views: number
  isSticky: boolean
  tags: string[]
}

interface SupportGroup {
  id: string
  name: string
  description: string
  members: number
  category: string
  isPrivate: boolean
  moderator: string
  nextMeeting?: Date
}

const posts: Post[] = [
  {
    id: "1",
    title: "Dealing with exam anxiety - what works for you?",
    content:
      "Finals are coming up and I'm feeling really overwhelmed. I've tried some breathing exercises but wondering what other techniques have helped people here...",
    author: {
      name: "Anonymous Student",
      avatar: "",
      isVolunteer: false,
      isAnonymous: true,
    },
    category: "Academic Stress",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    replies: 12,
    likes: 8,
    views: 45,
    isSticky: false,
    tags: ["anxiety", "exams", "coping"],
  },
  {
    id: "2",
    title: "Weekly Check-in: How is everyone doing?",
    content:
      "This is our weekly space to share how you're feeling, celebrate small wins, or just let others know you're here. Remember, every step forward counts! 💚",
    author: {
      name: "Sarah M.",
      avatar: "/volunteer-sarah.jpg",
      isVolunteer: true,
      isAnonymous: false,
    },
    category: "General Support",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    replies: 28,
    likes: 15,
    views: 89,
    isSticky: true,
    tags: ["check-in", "support", "community"],
  },
  {
    id: "3",
    title: "Sleep schedule completely messed up",
    content:
      "Anyone else struggling with sleep? I've been staying up until 3am and then can't wake up for classes. It's affecting everything...",
    author: {
      name: "Alex K.",
      avatar: "/student-alex.jpg",
      isVolunteer: false,
      isAnonymous: false,
    },
    category: "Sleep & Wellness",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    replies: 7,
    likes: 5,
    views: 32,
    isSticky: false,
    tags: ["sleep", "schedule", "wellness"],
  },
]

const supportGroups: SupportGroup[] = [
  {
    id: "1",
    name: "Anxiety Support Circle",
    description: "A safe space for students dealing with anxiety to share experiences and coping strategies.",
    members: 24,
    category: "Anxiety",
    isPrivate: false,
    moderator: "Dr. Chen (Licensed Counselor)",
    nextMeeting: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  },
  {
    id: "2",
    name: "Academic Pressure Support",
    description: "For students struggling with academic stress, perfectionism, and study-life balance.",
    members: 18,
    category: "Academic Stress",
    isPrivate: false,
    moderator: "Mike R. (Peer Volunteer)",
  },
  {
    id: "3",
    name: "Depression Support Network",
    description: "Confidential group for students experiencing depression. Professional moderation available.",
    members: 15,
    category: "Depression",
    isPrivate: true,
    moderator: "Licensed Therapist",
  },
]

const categories = [
  "All",
  "General Support",
  "Academic Stress",
  "Anxiety",
  "Depression",
  "Sleep & Wellness",
  "Relationships",
  "Life Transitions",
]

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [showNewPost, setShowNewPost] = useState(false)
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [postAnonymously, setPostAnonymously] = useState(false)

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
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
                <h1 className="text-xl font-bold text-foreground">Peer Support Community</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="hidden sm:flex">
                <Shield className="h-3 w-3 mr-1" />
                Moderated & Safe
              </Badge>
              <Dialog open={showNewPost} onOpenChange={setShowNewPost}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Post
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Community Guidelines Alert */}
        <Alert className="mb-6 border-primary/50 bg-primary/10">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Community Guidelines:</strong> This is a safe, moderated space. Be respectful, supportive, and
            remember that trained volunteers and professionals monitor discussions. If you're in crisis, please use our
            crisis resources immediately.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="discussions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="groups">Support Groups</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
          </TabsList>

          {/* Discussions Tab */}
          <TabsContent value="discussions" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
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
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className={`hover:shadow-md transition-shadow ${post.isSticky ? "border-primary/50 bg-primary/5" : ""}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {post.isSticky && (
                            <Badge variant="default" className="text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              Pinned
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        <CardTitle className="text-lg hover:text-primary cursor-pointer">{post.title}</CardTitle>
                        <CardDescription className="mt-2 line-clamp-2">{post.content}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {post.author.isAnonymous ? "?" : post.author.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">
                            {post.author.name}
                            {post.author.isVolunteer && (
                              <Badge variant="secondary" className="ml-2 text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Volunteer
                              </Badge>
                            )}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">{formatTimeAgo(post.timestamp)}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {post.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {post.replies}
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {post.likes}
                        </div>
                        <Button variant="ghost" size="sm">
                          <Flag className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Support Groups Tab */}
          <TabsContent value="groups" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          {group.isPrivate ? (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Globe className="h-4 w-4 text-muted-foreground" />
                          )}
                          {group.name}
                        </CardTitle>
                        <CardDescription className="mt-2">{group.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Members:</span>
                        <span className="font-medium">{group.members}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Moderator:</span>
                        <span className="font-medium text-xs">{group.moderator}</span>
                      </div>
                      {group.nextMeeting && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Next Meeting:</span>
                          <span className="font-medium text-xs">{group.nextMeeting.toLocaleDateString()}</span>
                        </div>
                      )}
                      <Badge variant="outline" className="w-fit">
                        {group.category}
                      </Badge>
                      <Button className="w-full">
                        <Users className="h-4 w-4 mr-2" />
                        {group.isPrivate ? "Request to Join" : "Join Group"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Volunteers Tab */}
          <TabsContent value="volunteers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Our Trained Peer Volunteers</CardTitle>
                <CardDescription>
                  These students have completed mental health first aid training and are here to provide peer support.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/volunteer-sarah.jpg" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium">Sarah M.</h4>
                      <p className="text-sm text-muted-foreground">Psychology Major, Senior</p>
                      <Badge variant="secondary" className="text-xs mt-1">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Certified Volunteer
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/volunteer-mike.jpg" />
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium">Mike R.</h4>
                      <p className="text-sm text-muted-foreground">Social Work Major, Junior</p>
                      <Badge variant="secondary" className="text-xs mt-1">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Certified Volunteer
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/volunteer-emma.jpg" />
                      <AvatarFallback>EL</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium">Emma L.</h4>
                      <p className="text-sm text-muted-foreground">Counseling Graduate Student</p>
                      <Badge variant="secondary" className="text-xs mt-1">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Certified Volunteer
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-primary">Become a Peer Volunteer</CardTitle>
                <CardDescription>
                  Help support your fellow students by becoming a trained peer volunteer. Training includes mental
                  health first aid, active listening, and crisis recognition.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium mb-2">Requirements:</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Sophomore standing or above</li>
                        <li>• Good academic standing</li>
                        <li>• Complete 20-hour training program</li>
                        <li>• Commit to 4 hours/week for one semester</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Training Includes:</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Mental Health First Aid certification</li>
                        <li>• Active listening techniques</li>
                        <li>• Crisis recognition and referral</li>
                        <li>• Ongoing supervision and support</li>
                      </ul>
                    </div>
                  </div>
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    Apply to Volunteer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* New Post Dialog */}
      <Dialog open={showNewPost} onOpenChange={setShowNewPost}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Discussion Post</DialogTitle>
            <DialogDescription>
              Share your thoughts, ask for support, or start a helpful discussion. All posts are moderated for safety.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="What would you like to discuss?"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.slice(1).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              <Textarea
                placeholder="Share your thoughts, experiences, or questions..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                rows={6}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={postAnonymously}
                onChange={(e) => setPostAnonymously(e.target.checked)}
              />
              <label htmlFor="anonymous" className="text-sm">
                Post anonymously
              </label>
            </div>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                All posts are reviewed by trained moderators. If you're experiencing a crisis, please use our crisis
                resources immediately instead of waiting for community responses.
              </AlertDescription>
            </Alert>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => setShowNewPost(false)}>
                Post Discussion
              </Button>
              <Button variant="outline" onClick={() => setShowNewPost(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
