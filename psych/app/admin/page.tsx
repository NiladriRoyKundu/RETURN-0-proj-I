"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Calendar,
  AlertTriangle,
  Shield,
  Activity,
  Target,
  Download,
  RefreshCw,
} from "lucide-react"

// Mock data for analytics (in real app, this would come from your database)
const usageData = [
  { month: "Jan", chatSessions: 245, bookings: 89, resourceViews: 1240, forumPosts: 156 },
  { month: "Feb", chatSessions: 312, bookings: 124, resourceViews: 1580, forumPosts: 203 },
  { month: "Mar", chatSessions: 398, bookings: 156, resourceViews: 1890, forumPosts: 267 },
  { month: "Apr", chatSessions: 445, bookings: 178, resourceViews: 2100, forumPosts: 298 },
  { month: "May", chatSessions: 523, bookings: 203, resourceViews: 2450, forumPosts: 334 },
  { month: "Jun", chatSessions: 612, bookings: 234, resourceViews: 2780, forumPosts: 389 },
]

const crisisData = [
  { day: "Mon", alerts: 3, interventions: 2 },
  { day: "Tue", alerts: 5, interventions: 4 },
  { day: "Wed", alerts: 2, interventions: 2 },
  { day: "Thu", alerts: 7, interventions: 6 },
  { day: "Fri", alerts: 4, interventions: 3 },
  { day: "Sat", alerts: 6, interventions: 5 },
  { day: "Sun", alerts: 3, interventions: 2 },
]

const categoryData = [
  { name: "Anxiety", value: 35, color: "#8884d8" },
  { name: "Depression", value: 28, color: "#82ca9d" },
  { name: "Academic Stress", value: 22, color: "#ffc658" },
  { name: "Sleep Issues", value: 10, color: "#ff7300" },
  { name: "Other", value: 5, color: "#00ff88" },
]

const peakHoursData = [
  { hour: "6AM", usage: 12 },
  { hour: "8AM", usage: 45 },
  { hour: "10AM", usage: 78 },
  { hour: "12PM", usage: 92 },
  { hour: "2PM", usage: 156 },
  { hour: "4PM", usage: 203 },
  { hour: "6PM", usage: 234 },
  { hour: "8PM", usage: 189 },
  { hour: "10PM", usage: 145 },
  { hour: "12AM", usage: 67 },
]

const interventionOutcomes = [
  { type: "Successful Referral", count: 89, percentage: 78 },
  { type: "Crisis Resolved", count: 23, percentage: 20 },
  { type: "Ongoing Support", count: 12, percentage: 11 },
  { type: "Emergency Response", count: 3, percentage: 3 },
]

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("6months")
  const [selectedMetric, setSelectedMetric] = useState("all")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">1 Month</SelectItem>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">612</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8.2%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crisis Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">30</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600 flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -15.3%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interventions</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5.7%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
            <TabsTrigger value="crisis">Crisis Management</TabsTrigger>
            <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
            <TabsTrigger value="interventions">Interventions</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Usage Over Time</CardTitle>
                  <CardDescription>Monthly active users across all services</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={usageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="chatSessions" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="bookings" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                      <Area type="monotone" dataKey="resourceViews" stackId="1" stroke="#ffc658" fill="#ffc658" />
                      <Area type="monotone" dataKey="forumPosts" stackId="1" stroke="#ff7300" fill="#ff7300" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Support Categories</CardTitle>
                  <CardDescription>Distribution of support requests by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Peak Usage Hours</CardTitle>
                <CardDescription>Platform activity throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={peakHoursData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="usage" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Usage Analytics Tab */}
          <TabsContent value="usage" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Chat Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">612</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Avg. Duration:</span>
                      <span className="font-medium">18 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Crisis Detected:</span>
                      <span className="font-medium text-red-600">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Satisfaction:</span>
                      <span className="font-medium text-green-600">4.7/5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">234</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Completion Rate:</span>
                      <span className="font-medium text-green-600">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>No-shows:</span>
                      <span className="font-medium">18</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg. Wait Time:</span>
                      <span className="font-medium">2.3 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">389</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Active Users:</span>
                      <span className="font-medium">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Moderated Posts:</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Support Groups:</span>
                      <span className="font-medium">8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Service Usage Trends</CardTitle>
                <CardDescription>Comparative usage across all platform services</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="chatSessions" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="bookings" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="resourceViews" stroke="#ffc658" strokeWidth={2} />
                    <Line type="monotone" dataKey="forumPosts" stroke="#ff7300" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Crisis Management Tab */}
          <TabsContent value="crisis" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="text-destructive">Crisis Alerts This Week</CardTitle>
                  <CardDescription>Daily crisis detection and intervention tracking</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={crisisData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="alerts" fill="#ef4444" name="Crisis Alerts" />
                      <Bar dataKey="interventions" fill="#22c55e" name="Interventions" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Times</CardTitle>
                  <CardDescription>Crisis response and intervention metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Avg. Response Time</span>
                      <Badge variant="secondary">3.2 min</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Crisis Resolution Rate</span>
                      <Badge variant="default" className="bg-green-600">
                        94%
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Emergency Referrals</span>
                      <Badge variant="destructive">3</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Follow-up Compliance</span>
                      <Badge variant="secondary">87%</Badge>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Active Protocols</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Suicide Prevention Protocol</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>Self-Harm Detection</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Emergency Escalation</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Trend Analysis Tab */}
          <TabsContent value="trends" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Seasonal Trends</CardTitle>
                  <CardDescription>Mental health support patterns throughout the year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Peak Periods Identified</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Finals Week (May)</span>
                          <Badge variant="destructive">High Risk</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Start of Semester</span>
                          <Badge variant="secondary">Moderate</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Holiday Season</span>
                          <Badge variant="secondary">Moderate</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Emerging Patterns</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>• Increased anxiety reports during exam periods</p>
                        <p>• Higher chat usage during evening hours</p>
                        <p>• Growing demand for group support sessions</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Predictive Insights</CardTitle>
                  <CardDescription>AI-powered trend predictions and recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-blue-50">
                      <h4 className="font-medium text-sm mb-2 text-blue-800">Capacity Planning</h4>
                      <p className="text-sm text-blue-700">
                        Projected 25% increase in bookings next month. Consider adding 2 additional counselor slots.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg bg-yellow-50">
                      <h4 className="font-medium text-sm mb-2 text-yellow-800">Resource Allocation</h4>
                      <p className="text-sm text-yellow-700">
                        Sleep-related resources showing high engagement. Recommend expanding sleep wellness content.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg bg-green-50">
                      <h4 className="font-medium text-sm mb-2 text-green-800">Intervention Success</h4>
                      <p className="text-sm text-green-700">
                        Peer support groups showing 89% positive outcomes. Consider expanding program.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Interventions Tab */}
          <TabsContent value="interventions" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Intervention Outcomes</CardTitle>
                  <CardDescription>Success rates and follow-up results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {interventionOutcomes.map((outcome, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{outcome.type}</div>
                          <div className="text-xs text-muted-foreground">{outcome.count} cases</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">{outcome.percentage}%</div>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${outcome.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommended Actions</CardTitle>
                  <CardDescription>Data-driven intervention recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-sm">Increase Evening Coverage</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Peak usage between 6-10 PM suggests need for additional evening support staff.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <Target className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-sm">Expand Anxiety Resources</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            35% of requests are anxiety-related. Consider specialized anxiety support groups.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-sm">Volunteer Training</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            High community engagement suggests opportunity to train more peer volunteers.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
