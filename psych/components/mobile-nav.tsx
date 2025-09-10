"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Menu, MessageCircle, Calendar, BookOpen, Users, Shield, Heart, Phone } from "lucide-react"
import Link from "next/link"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between pb-4 border-b">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Psych</span>
            </div>
          </div>

          <nav className="flex-1 py-6">
            <div className="space-y-4">
              <Link
                href="/chat"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setOpen(false)}
              >
                <MessageCircle className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">AI Support</div>
                  <div className="text-sm text-muted-foreground">24/7 chat assistance</div>
                </div>
              </Link>

              <Link
                href="/booking"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setOpen(false)}
              >
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Book Session</div>
                  <div className="text-sm text-muted-foreground">Schedule counseling</div>
                </div>
              </Link>

              <Link
                href="/resources"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setOpen(false)}
              >
                <BookOpen className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Resources</div>
                  <div className="text-sm text-muted-foreground">Guides & media</div>
                </div>
              </Link>

              <Link
                href="/community"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setOpen(false)}
              >
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Community</div>
                  <div className="text-sm text-muted-foreground">Peer support</div>
                </div>
              </Link>
            </div>
          </nav>

          <div className="border-t pt-4 space-y-3">
            <Button className="w-full" variant="destructive">
              <Phone className="h-4 w-4 mr-2" />
              Crisis Helpline
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              Sign In
            </Button>
            <Badge variant="secondary" className="w-full justify-center py-2">
              <Shield className="h-3 w-3 mr-1" />
              100% Confidential
            </Badge>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
