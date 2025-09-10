"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, Bot, User, Heart, ArrowLeft, Phone, AlertTriangle, Shield, Clock } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  isUrgent?: boolean
}

const CRISIS_KEYWORDS = [
  "suicide",
  "kill myself",
  "end it all",
  "hurt myself",
  "self harm",
  "want to die",
  "no point living",
  "better off dead",
  "overdose",
]

const AI_RESPONSES = {
  greeting:
    "Hello! I'm here to provide support and coping strategies. How are you feeling today? Remember, this is a safe space to share what's on your mind.",
  crisis:
    "I'm concerned about what you've shared. Your safety is the most important thing right now. Please consider reaching out to a crisis counselor immediately. Would you like me to connect you with emergency support?",
  anxiety:
    "It sounds like you're experiencing anxiety. Here are some techniques that might help: Try the 4-7-8 breathing technique - breathe in for 4 counts, hold for 7, exhale for 8. Would you like me to guide you through this or suggest other coping strategies?",
  depression:
    "I hear that you're going through a difficult time. These feelings are valid, and you're not alone. Small steps can make a difference - have you been able to maintain basic self-care like eating regular meals or getting some sunlight?",
  stress:
    "Academic and life stress can feel overwhelming. Let's break this down into manageable pieces. What's the most pressing concern you're facing right now? Sometimes organizing our thoughts can help reduce the feeling of being overwhelmed.",
  default:
    "Thank you for sharing that with me. It takes courage to reach out. Can you tell me more about what you're experiencing? I'm here to listen and provide support strategies that might help.",
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: AI_RESPONSES.greeting,
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showCrisisAlert, setShowCrisisAlert] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const detectCrisis = (message: string): boolean => {
    const lowerMessage = message.toLowerCase()
    return CRISIS_KEYWORDS.some((keyword) => lowerMessage.includes(keyword))
  }

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (detectCrisis(userMessage)) {
      return AI_RESPONSES.crisis
    } else if (
      lowerMessage.includes("anxious") ||
      lowerMessage.includes("anxiety") ||
      lowerMessage.includes("worried")
    ) {
      return AI_RESPONSES.anxiety
    } else if (
      lowerMessage.includes("depressed") ||
      lowerMessage.includes("sad") ||
      lowerMessage.includes("hopeless")
    ) {
      return AI_RESPONSES.depression
    } else if (
      lowerMessage.includes("stress") ||
      lowerMessage.includes("overwhelmed") ||
      lowerMessage.includes("pressure")
    ) {
      return AI_RESPONSES.stress
    } else {
      return AI_RESPONSES.default
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Check for crisis keywords
    const isCrisis = detectCrisis(inputValue)
    if (isCrisis) {
      setShowCrisisAlert(true)
    }

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue),
        sender: "ai",
        timestamp: new Date(),
        isUrgent: isCrisis,
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
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
                <h1 className="text-lg md:text-xl font-bold text-foreground">AI Support Chat</h1>
              </div>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <Badge variant="secondary" className="hidden sm:flex text-xs">
                <Shield className="h-3 w-3 mr-1" />
                Confidential
              </Badge>
              <Badge variant="outline" className="hidden md:flex text-xs">
                <Clock className="h-3 w-3 mr-1" />
                24/7 Available
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Crisis Alert */}
      {showCrisisAlert && (
        <div className="container mx-auto px-4 py-4">
          <Alert className="border-destructive/50 bg-destructive/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span className="text-sm">
                If you're in immediate danger, please contact emergency services or a crisis hotline.
              </span>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button size="sm" variant="destructive" className="text-xs">
                  <Phone className="h-3 w-3 mr-1" />
                  Crisis Line
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowCrisisAlert(false)} className="text-xs">
                  Dismiss
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Chat Interface */}
      <div className="container mx-auto px-4 py-4 md:py-6 max-w-4xl">
        <div className="grid lg:grid-cols-4 gap-4 md:gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[calc(100vh-200px)] md:h-[600px] flex flex-col">
              <CardHeader className="pb-3 md:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Bot className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  AI Mental Health Support
                </CardTitle>
                <p className="text-xs md:text-sm text-muted-foreground">
                  I'm here to listen and provide coping strategies. This conversation is confidential.
                </p>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <ScrollArea className="flex-1 px-3 md:px-6">
                  <div className="space-y-3 md:space-y-4 pb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-2 md:gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.sender === "ai" && (
                          <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <Bot className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                          </div>
                        )}

                        <div className={`max-w-[85%] md:max-w-[80%] ${message.sender === "user" ? "order-1" : ""}`}>
                          <div
                            className={`rounded-lg px-3 md:px-4 py-2 md:py-3 ${
                              message.sender === "user"
                                ? "bg-primary text-primary-foreground ml-auto"
                                : message.isUrgent
                                  ? "bg-destructive/10 border border-destructive/20"
                                  : "bg-muted"
                            }`}
                          >
                            <p className="text-xs md:text-sm leading-relaxed">{message.content}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 px-1">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>

                        {message.sender === "user" && (
                          <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-secondary/10 rounded-full flex items-center justify-center order-2">
                            <User className="h-3 w-3 md:h-4 md:w-4 text-secondary" />
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="flex gap-2 md:gap-3 justify-start">
                        <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Bot className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                        </div>
                        <div className="bg-muted rounded-lg px-3 md:px-4 py-2 md:py-3">
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                            <div
                              className="w-1.5 h-1.5 md:w-2 md:h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-1.5 h-1.5 md:w-2 md:h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="border-t border-border p-3 md:p-4">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Share what's on your mind..."
                      className="flex-1 text-sm md:text-base"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      size="icon"
                      className="shrink-0"
                    >
                      <Send className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Press Enter to send. This conversation is confidential and secure.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4 order-first lg:order-last">
            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base md:text-lg">Need Immediate Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 md:space-y-3">
                <Button className="w-full" variant="destructive" size="sm">
                  <Phone className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  Crisis Hotline
                </Button>
                <Button className="w-full bg-transparent" variant="outline" size="sm">
                  <MessageCircle className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  Book Counselor
                </Button>
              </CardContent>
            </Card>

            {/* Coping Strategies */}
            <Card className="hidden lg:block">
              <CardHeader className="pb-3">
                <CardTitle className="text-base md:text-lg">Quick Coping Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-1">4-7-8 Breathing</h4>
                  <p className="text-muted-foreground text-xs">Inhale 4, hold 7, exhale 8</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-1">5-4-3-2-1 Grounding</h4>
                  <p className="text-muted-foreground text-xs">Name 5 things you see, 4 you hear...</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-1">Progressive Relaxation</h4>
                  <p className="text-muted-foreground text-xs">Tense and release muscle groups</p>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Notice */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-4 md:pt-6">
                <div className="flex items-start gap-2">
                  <Shield className="h-3 w-3 md:h-4 md:w-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs md:text-sm font-medium text-primary">Your Privacy Matters</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      This chat is confidential. We don't store personal information.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
