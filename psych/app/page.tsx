import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Calendar, BookOpen, Users, Shield, Heart, Brain, Phone } from "lucide-react"
import Link from "next/link"
import { MobileNav } from "@/components/mobile-nav"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              <h1 className="text-xl md:text-2xl font-bold text-foreground">Psych</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/chat" className="text-muted-foreground hover:text-primary transition-colors">
                AI Support
              </Link>
              <Link href="/booking" className="text-muted-foreground hover:text-primary transition-colors">
                Book Session
              </Link>
              <Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors">
                Resources
              </Link>
              <Link href="/community" className="text-muted-foreground hover:text-primary transition-colors">
                Community
              </Link>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </nav>
            <MobileNav />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex justify-center mb-4 md:mb-6">
            <Badge variant="secondary" className="px-3 md:px-4 py-2 text-xs md:text-sm">
              <Shield className="h-3 w-3 md:h-4 md:w-4 mr-2" />
              100% Confidential & Secure
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 text-balance">
            Your Mental Health Matters
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 text-pretty max-w-2xl mx-auto">
            Access professional support, resources, and a caring community whenever you need it. Take the first step
            towards better mental wellness today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link href="/chat" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-4 md:py-6">
                <MessageCircle className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                Start AI Chat Support
              </Button>
            </Link>
            <Link href="/booking" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-4 md:py-6 bg-transparent"
              >
                <Phone className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                Crisis Helpline
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-12 md:py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-foreground">
            Comprehensive Mental Health Support
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* AI Chat Support */}
            <Link href="/chat">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group h-full">
                <CardHeader className="text-center pb-3 md:pb-4">
                  <div className="mx-auto mb-3 md:mb-4 p-2 md:p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                    <MessageCircle className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg md:text-xl">AI First-Aid Support</CardTitle>
                  <CardDescription className="text-sm">
                    24/7 intelligent chat support with coping strategies and professional referrals
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button className="w-full bg-transparent" variant="outline" size="sm">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Booking System */}
            <Link href="/booking">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group h-full">
                <CardHeader className="text-center pb-3 md:pb-4">
                  <div className="mx-auto mb-3 md:mb-4 p-2 md:p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                    <Calendar className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg md:text-xl">Book Counseling</CardTitle>
                  <CardDescription className="text-sm">
                    Confidential appointments with on-campus counselors and mental health professionals
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button className="w-full bg-transparent" variant="outline" size="sm">
                    Schedule Now
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Resource Hub */}
            <Link href="/resources">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group h-full">
                <CardHeader className="text-center pb-3 md:pb-4">
                  <div className="mx-auto mb-3 md:mb-4 p-2 md:p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                    <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg md:text-xl">Resource Hub</CardTitle>
                  <CardDescription className="text-sm">
                    Videos, audio guides, and wellness resources in multiple languages
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button className="w-full bg-transparent" variant="outline" size="sm">
                    Explore Resources
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Peer Support */}
            <Link href="/community">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group h-full">
                <CardHeader className="text-center pb-3 md:pb-4">
                  <div className="mx-auto mb-3 md:mb-4 p-2 md:p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                    <Users className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg md:text-xl">Peer Support</CardTitle>
                  <CardDescription className="text-sm">
                    Connect with fellow students in a safe, moderated community environment
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button className="w-full bg-transparent" variant="outline" size="sm">
                    Join Community
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Need Immediate Help?</h3>
            <p className="text-muted-foreground text-base md:text-lg">
              If you're experiencing a mental health crisis, help is available right now.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader className="text-center pb-3">
                <CardTitle className="text-destructive text-lg">Crisis Hotline</CardTitle>
                <CardDescription className="text-sm">24/7 immediate support</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button className="w-full" variant="destructive" size="sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="text-center pb-3">
                <CardTitle className="text-primary text-lg">Emergency Chat</CardTitle>
                <CardDescription className="text-sm">Instant text-based support</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button className="w-full" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat Now
                </Button>
              </CardContent>
            </Card>

            <Card className="border-secondary/20 bg-secondary/5">
              <CardHeader className="text-center pb-3">
                <CardTitle className="text-secondary text-lg">Campus Resources</CardTitle>
                <CardDescription className="text-sm">On-site counseling services</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button className="w-full" variant="secondary" size="sm">
                  <Brain className="h-4 w-4 mr-2" />
                  Find Help
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                <span className="text-base md:text-lg font-bold">Psych</span>
              </div>
              <p className="text-muted-foreground text-xs md:text-sm">
                Supporting student mental health with compassionate, accessible care.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Support</h4>
              <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                <li>
                  <Link href="/chat" className="hover:text-primary transition-colors">
                    AI Chat
                  </Link>
                </li>
                <li>
                  <Link href="/booking" className="hover:text-primary transition-colors">
                    Book Session
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Crisis Help
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Resources</h4>
              <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                <li>
                  <Link href="/resources" className="hover:text-primary transition-colors">
                    Wellness Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Meditation
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-primary transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Privacy</h4>
              <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Confidentiality
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs md:text-sm text-muted-foreground">
            <p>&copy; 2024 Psych. All rights reserved. Your privacy and wellbeing are our priority.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
