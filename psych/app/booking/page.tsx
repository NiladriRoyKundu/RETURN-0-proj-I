"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CalendarIcon,
  Clock,
  User,
  Phone,
  Video,
  Users,
  Shield,
  ArrowLeft,
  Heart,
  CheckCircle,
  MapPin,
} from "lucide-react"
import Link from "next/link"

interface Counselor {
  id: string
  name: string
  title: string
  specialties: string[]
  availability: string[]
  image: string
  rating: number
  experience: string
}

interface TimeSlot {
  time: string
  available: boolean
}

const counselors: Counselor[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    title: "Licensed Clinical Psychologist",
    specialties: ["Anxiety", "Depression", "Academic Stress"],
    availability: ["Monday", "Wednesday", "Friday"],
    image: "/professional-woman-counselor.png",
    rating: 4.9,
    experience: "8 years",
  },
  {
    id: "2",
    name: "Dr. Michael Rodriguez",
    title: "Licensed Therapist",
    specialties: ["Trauma", "PTSD", "Relationship Issues"],
    availability: ["Tuesday", "Thursday", "Saturday"],
    image: "/professional-man-therapist.png",
    rating: 4.8,
    experience: "12 years",
  },
  {
    id: "3",
    name: "Dr. Emily Johnson",
    title: "Student Counselor",
    specialties: ["Academic Pressure", "Social Anxiety", "Life Transitions"],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    image: "/friendly-woman-counselor.jpg",
    rating: 4.7,
    experience: "5 years",
  },
]

const timeSlots: TimeSlot[] = [
  { time: "9:00 AM", available: true },
  { time: "10:00 AM", available: false },
  { time: "11:00 AM", available: true },
  { time: "1:00 PM", available: true },
  { time: "2:00 PM", available: true },
  { time: "3:00 PM", available: false },
  { time: "4:00 PM", available: true },
  { time: "5:00 PM", available: true },
]

const helplines = [
  {
    name: "National Suicide Prevention Lifeline",
    number: "988",
    description: "24/7 crisis support",
    availability: "Always Available",
  },
  {
    name: "Crisis Text Line",
    number: "Text HOME to 741741",
    description: "Text-based crisis support",
    availability: "24/7",
  },
  {
    name: "Campus Mental Health Emergency",
    number: "(555) 123-4567",
    description: "On-campus crisis intervention",
    availability: "Business Hours",
  },
]

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [sessionType, setSessionType] = useState<string>("")
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [bookingComplete, setBookingComplete] = useState(false)

  const handleBooking = () => {
    // Simulate booking process
    setTimeout(() => {
      setBookingComplete(true)
      setShowBookingForm(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                <h1 className="text-lg md:text-xl font-bold text-foreground">Book Counseling Session</h1>
              </div>
            </div>
            <Badge variant="secondary" className="hidden sm:flex text-xs">
              <Shield className="h-3 w-3 mr-1" />
              Confidential Booking
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 md:py-8 max-w-6xl">
        {/* Success Message */}
        {bookingComplete && (
          <Alert className="mb-4 md:mb-6 border-primary/50 bg-primary/10">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              Your appointment has been successfully booked! You'll receive a confirmation email shortly with session
              details.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="counselors" className="space-y-4 md:space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="counselors" className="text-xs md:text-sm">
              Book with Counselor
            </TabsTrigger>
            <TabsTrigger value="helplines" className="text-xs md:text-sm">
              Crisis Helplines
            </TabsTrigger>
          </TabsList>

          {/* Counselor Booking */}
          <TabsContent value="counselors" className="space-y-4 md:space-y-6">
            <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
              {/* Counselor Selection */}
              <div className="lg:col-span-2 space-y-4 md:space-y-6">
                <Card>
                  <CardHeader className="pb-3 md:pb-4">
                    <CardTitle className="text-lg md:text-xl">Choose Your Counselor</CardTitle>
                    <CardDescription className="text-sm">
                      All our counselors are licensed professionals committed to your confidentiality and wellbeing.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 md:space-y-4">
                    {counselors.map((counselor) => (
                      <div
                        key={counselor.id}
                        className={`p-3 md:p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedCounselor?.id === counselor.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedCounselor(counselor)}
                      >
                        <div className="flex gap-3 md:gap-4">
                          <img
                            src={counselor.image || "/placeholder.svg"}
                            alt={counselor.name}
                            className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-foreground text-sm md:text-base truncate">
                                  {counselor.name}
                                </h3>
                                <p className="text-xs md:text-sm text-muted-foreground">{counselor.title}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {counselor.experience} experience • {counselor.rating}/5.0 rating
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {counselor.specialties.map((specialty) => (
                                <Badge key={specialty} variant="secondary" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              Available: {counselor.availability.join(", ")}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Session Type Selection */}
                {selectedCounselor && (
                  <Card>
                    <CardHeader className="pb-3 md:pb-4">
                      <CardTitle className="text-lg md:text-xl">Session Type</CardTitle>
                      <CardDescription className="text-sm">
                        Choose the type of session that works best for you.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                        <div
                          className={`p-3 md:p-4 border rounded-lg cursor-pointer transition-colors ${
                            sessionType === "individual"
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => setSessionType("individual")}
                        >
                          <User className="h-5 w-5 md:h-6 md:w-6 text-primary mb-2" />
                          <h4 className="font-medium text-sm md:text-base">Individual Session</h4>
                          <p className="text-xs md:text-sm text-muted-foreground">One-on-one counseling</p>
                          <p className="text-xs text-muted-foreground mt-1">50 minutes</p>
                        </div>

                        <div
                          className={`p-3 md:p-4 border rounded-lg cursor-pointer transition-colors ${
                            sessionType === "group"
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => setSessionType("group")}
                        >
                          <Users className="h-5 w-5 md:h-6 md:w-6 text-primary mb-2" />
                          <h4 className="font-medium text-sm md:text-base">Group Session</h4>
                          <p className="text-xs md:text-sm text-muted-foreground">Small group therapy</p>
                          <p className="text-xs text-muted-foreground mt-1">90 minutes</p>
                        </div>

                        <div
                          className={`p-3 md:p-4 border rounded-lg cursor-pointer transition-colors ${
                            sessionType === "video"
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => setSessionType("video")}
                        >
                          <Video className="h-5 w-5 md:h-6 md:w-6 text-primary mb-2" />
                          <h4 className="font-medium text-sm md:text-base">Video Session</h4>
                          <p className="text-xs md:text-sm text-muted-foreground">Online counseling</p>
                          <p className="text-xs text-muted-foreground mt-1">50 minutes</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Date and Time Selection */}
              <div className="space-y-4 md:space-y-6 order-first lg:order-last">
                <Card>
                  <CardHeader className="pb-3 md:pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                      <CalendarIcon className="h-4 w-4 md:h-5 md:w-5" />
                      Select Date
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      className="rounded-md border w-full"
                    />
                  </CardContent>
                </Card>

                {selectedDate && (
                  <Card>
                    <CardHeader className="pb-3 md:pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                        <Clock className="h-4 w-4 md:h-5 md:w-5" />
                        Available Times
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {selectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((slot) => (
                          <Button
                            key={slot.time}
                            variant={selectedTime === slot.time ? "default" : "outline"}
                            size="sm"
                            disabled={!slot.available}
                            onClick={() => setSelectedTime(slot.time)}
                            className="justify-start text-xs md:text-sm"
                          >
                            {slot.time}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {selectedCounselor && sessionType && selectedDate && selectedTime && (
                  <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="pt-4 md:pt-6">
                      <Button className="w-full" onClick={() => setShowBookingForm(true)} size="sm">
                        Continue to Booking
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Crisis Helplines */}
          <TabsContent value="helplines" className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {helplines.map((helpline, index) => (
                <Card key={index} className="border-destructive/20 bg-destructive/5">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-destructive flex items-center gap-2 text-lg">
                      <Phone className="h-4 w-4 md:h-5 md:w-5" />
                      {helpline.name}
                    </CardTitle>
                    <CardDescription className="text-sm">{helpline.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-xl md:text-2xl font-bold text-destructive">{helpline.number}</div>
                      <Badge variant="outline" className="text-xs">
                        {helpline.availability}
                      </Badge>
                      <Button className="w-full" variant="destructive" size="sm">
                        <Phone className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                        Call Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader className="pb-3 md:pb-4">
                <CardTitle className="text-lg md:text-xl">Campus Resources</CardTitle>
                <CardDescription className="text-sm">
                  Additional on-campus mental health resources and locations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 md:p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm md:text-base">Student Counseling Center</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">Main Campus, Building A, Room 201</p>
                        <p className="text-xs md:text-sm text-muted-foreground">Mon-Fri: 8:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 md:p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm md:text-base">Wellness Center</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">Student Union, 2nd Floor</p>
                        <p className="text-xs md:text-sm text-muted-foreground">Mon-Fri: 9:00 AM - 5:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Booking Form Dialog */}
      <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="text-lg">Complete Your Booking</DialogTitle>
            <DialogDescription className="text-sm">
              Your information is kept strictly confidential and secure.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm">
                Full Name
              </Label>
              <Input id="name" placeholder="Enter your full name" className="text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">
                Email Address
              </Label>
              <Input id="email" type="email" placeholder="your.email@university.edu" className="text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm">
                Phone Number
              </Label>
              <Input id="phone" type="tel" placeholder="(555) 123-4567" className="text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason" className="text-sm">
                Reason for Session (Optional)
              </Label>
              <Textarea
                id="reason"
                placeholder="Brief description of what you'd like to discuss..."
                className="resize-none text-sm"
                rows={3}
              />
            </div>
            <div className="p-3 bg-muted/50 rounded-lg text-sm">
              <div className="flex items-start gap-2">
                <Shield className="h-3 w-3 md:h-4 md:w-4 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-primary text-xs md:text-sm">Privacy Guarantee</p>
                  <p className="text-muted-foreground text-xs">
                    All information is encrypted and protected under HIPAA regulations.
                  </p>
                </div>
              </div>
            </div>
            <Button className="w-full" onClick={handleBooking} size="sm">
              Confirm Booking
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
