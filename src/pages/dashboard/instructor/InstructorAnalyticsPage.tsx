
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  ResponsiveContainer 
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ChevronLeft } from 'lucide-react';

// Mock data for analytics
const enrollmentData = [
  { name: 'Jan', beginner: 4, intermediate: 3, advanced: 1 },
  { name: 'Feb', beginner: 5, intermediate: 6, advanced: 2 },
  { name: 'Mar', beginner: 6, intermediate: 4, advanced: 3 },
  { name: 'Apr', beginner: 8, intermediate: 5, advanced: 2 },
  { name: 'May', beginner: 10, intermediate: 8, advanced: 4 },
  { name: 'Jun', beginner: 12, intermediate: 10, advanced: 5 },
  { name: 'Jul', beginner: 15, intermediate: 12, advanced: 7 },
];

const completionData = [
  { name: 'Web Dev', completed: 85, incomplete: 15 },
  { name: 'Python', completed: 70, incomplete: 30 },
  { name: 'JavaScript', completed: 62, incomplete: 38 },
  { name: 'UX Design', completed: 90, incomplete: 10 },
  { name: 'Data Science', completed: 75, incomplete: 25 },
];

const feedbackData = [
  { name: 'Excellent', value: 42 },
  { name: 'Good', value: 28 },
  { name: 'Average', value: 15 },
  { name: 'Poor', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function InstructorAnalyticsPage() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('year');
  
  return (
    <DashboardLayout pageTitle="Analytics Dashboard">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-2 pl-0" 
          onClick={() => navigate('/dashboard/instructor')}
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Back to Dashboard
        </Button>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Course Analytics</h2>
            <p className="text-gray-600">
              Comprehensive analytics for all your courses and student performance.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Time Range:</span>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="enrollments">
        <TabsList className="mb-6">
          <TabsTrigger value="enrollments">Enrollment Trends</TabsTrigger>
          <TabsTrigger value="completion">Completion Rates</TabsTrigger>
          <TabsTrigger value="feedback">Student Feedback</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enrollments">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Enrollment Trends by Course Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ChartContainer 
                  config={{
                    beginner: { color: "#3b82f6" },
                    intermediate: { color: "#10b981" },
                    advanced: { color: "#f97316" },
                  }}
                >
                  <BarChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="beginner" name="Beginner" fill="var(--color-beginner)" />
                    <Bar dataKey="intermediate" name="Intermediate" fill="var(--color-intermediate)" />
                    <Bar dataKey="advanced" name="Advanced" fill="var(--color-advanced)" />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="font-semibold text-blue-700 mb-1">Enrollment Growth</p>
                    <p className="text-sm text-blue-600">
                      Your enrollments have grown by 28% compared to the previous period.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="font-semibold text-green-700 mb-1">Popular Courses</p>
                    <p className="text-sm text-green-600">
                      "Web Development Fundamentals" is your most popular course with 30 enrollments.
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="font-semibold text-orange-700 mb-1">Recommendation</p>
                    <p className="text-sm text-orange-600">
                      Consider creating more beginner-level courses as they have the highest enrollment rates.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ChartContainer config={{}}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Beginner', value: 55 },
                          { name: 'Intermediate', value: 35 },
                          { name: 'Advanced', value: 10 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {[
                          { name: 'Beginner', value: 55 },
                          { name: 'Intermediate', value: 35 },
                          { name: 'Advanced', value: 10 },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ChartContainer>
                </div>
                <div className="text-center mt-4 text-sm text-gray-500">
                  Distribution of students by course level
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="completion">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Course Completion Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ChartContainer 
                  config={{
                    completed: { color: "#10b981" },
                    incomplete: { color: "#f87171" },
                  }}
                >
                  <BarChart data={completionData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="completed" name="Completed" stackId="a" fill="var(--color-completed)" />
                    <Bar dataKey="incomplete" name="Incomplete" stackId="a" fill="var(--color-incomplete)" />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-lg">Average Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">76%</div>
                  <p className="text-sm text-gray-500">
                    Average completion rate across all courses
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-lg">Highest Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">90%</div>
                  <p className="text-sm text-gray-500">
                    UX Design Workshop
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-lg">Lowest Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">62%</div>
                  <p className="text-sm text-gray-500">
                    JavaScript Advanced Concepts
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="feedback">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Student Feedback Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-80">
                  <ChartContainer config={{}}>
                    <PieChart>
                      <Pie
                        data={feedbackData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {feedbackData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ChartContainer>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Recent Comments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-50 rounded-md">
                        <div className="flex justify-between mb-1">
                          <p className="font-medium text-sm">Student 1</p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-4 h-4 ${i < 5 ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          "Great course! The instructor explains complex concepts very clearly."
                        </p>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded-md">
                        <div className="flex justify-between mb-1">
                          <p className="font-medium text-sm">Student 2</p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          "I've learned so much in this course! The projects were challenging and engaging."
                        </p>
                      </div>
                      
                      <div className="p-3 bg-gray-50 rounded-md">
                        <div className="flex justify-between mb-1">
                          <p className="font-medium text-sm">Student 3</p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-4 h-4 ${i < 5 ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          "Excellent content and presentation. The instructor is very knowledgeable and responsive."
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Feedback By Course</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reviews
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sentiment
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-4">Web Development Fundamentals</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <span className="font-semibold mr-2">4.8</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-4 h-4 ${i < 5 ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">24</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Positive
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4">Python for Data Science</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <span className="font-semibold mr-2">4.5</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-500' : i < 5 ? 'text-yellow-500 opacity-50' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">18</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Positive
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4">UX Design Workshop</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <span className="font-semibold mr-2">4.9</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-4 h-4 ${i < 5 ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">15</td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Positive
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ChartContainer 
                  config={{
                    revenue: { color: "#3b82f6" },
                    trend: { color: "#10b981" },
                  }}
                >
                  <LineChart data={enrollmentData.map(item => ({
                    name: item.name,
                    revenue: (item.beginner * 29.99 + item.intermediate * 49.99 + item.advanced * 79.99).toFixed(2),
                    trend: (item.beginner + item.intermediate + item.advanced) * 10
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                    <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="var(--color-revenue)" 
                      strokeWidth={2}
                      name="Revenue ($)"
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="trend" 
                      stroke="var(--color-trend)" 
                      strokeDasharray="5 5"
                      name="Trend"
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Revenue Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Total Revenue (YTD)</p>
                    <p className="text-3xl font-bold">$12,495.50</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">This Month</p>
                    <div className="flex items-center">
                      <p className="text-xl font-bold mr-2">$2,845.75</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        +18.3%
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Average Per Course</p>
                    <p className="text-xl font-bold">$2,499.10</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Revenue by Course</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Course
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Enrollments
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Revenue
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-4">Web Development Fundamentals</td>
                        <td className="px-4 py-4">30</td>
                        <td className="px-4 py-4">$49.99</td>
                        <td className="px-4 py-4 font-medium">$1,499.70</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4">Python for Data Science</td>
                        <td className="px-4 py-4">24</td>
                        <td className="px-4 py-4">$59.99</td>
                        <td className="px-4 py-4 font-medium">$1,439.76</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4">UX Design Workshop</td>
                        <td className="px-4 py-4">18</td>
                        <td className="px-4 py-4">$79.99</td>
                        <td className="px-4 py-4 font-medium">$1,439.82</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4">JavaScript Advanced Concepts</td>
                        <td className="px-4 py-4">15</td>
                        <td className="px-4 py-4">$69.99</td>
                        <td className="px-4 py-4 font-medium">$1,049.85</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4">Mobile App Development</td>
                        <td className="px-4 py-4">12</td>
                        <td className="px-4 py-4">$89.99</td>
                        <td className="px-4 py-4 font-medium">$1,079.88</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
