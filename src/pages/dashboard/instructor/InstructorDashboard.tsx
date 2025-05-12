
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Star, Calendar, ChevronRight, TrendingUp, BarChart2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Course } from '@/models/types';
import { mockCourses } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';
import { 
  LineChart,
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

export default function InstructorDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [instructorCourses, setInstructorCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAnalytic, setActiveAnalytic] = useState('enrollment');
  
  useEffect(() => {
    const fetchInstructorCourses = async () => {
      if (!user) return;
      
      try {
        // In a real app, this would fetch from an API
        // Mock data for now - filter courses where the instructor ID matches
        const courses = mockCourses.filter(course => course.instructor.id === '2');
        setInstructorCourses(courses);
      } catch (error) {
        console.error("Failed to fetch instructor courses:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInstructorCourses();
  }, [user]);

  // Calculate some statistics for the instructor dashboard
  const totalStudents = instructorCourses.reduce((sum, course) => sum + course.enrolledCount, 0);
  const averageRating = instructorCourses.length > 0
    ? instructorCourses.reduce((sum, course) => sum + course.rating, 0) / instructorCourses.length
    : 0;
    
  // Mock data for analytics charts
  const enrollmentData = [
    { name: 'Apr', value: 12 },
    { name: 'May', value: 19 },
    { name: 'Jun', value: 15 },
    { name: 'Jul', value: 28 },
    { name: 'Aug', value: 24 },
    { name: 'Sep', value: 35 },
    { name: 'Oct', value: 32 },
  ];
  
  const ratingData = [
    { name: 'Web Dev', value: 4.7 },
    { name: 'Python', value: 4.2 },
    { name: 'Design', value: 4.5 },
    { name: 'Data Science', value: 4.8 },
  ];
  
  const completionData = [
    { name: 'Week 1', completed: 95, incomplete: 5 },
    { name: 'Week 2', completed: 87, incomplete: 13 },
    { name: 'Week 3', completed: 78, incomplete: 22 },
    { name: 'Week 4', completed: 65, incomplete: 35 },
  ];

  const handleEditCourse = (courseId: string) => {
    navigate(`/dashboard/instructor/courses/${courseId}/edit`);
  };

  const handleManageCourse = (courseId: string) => {
    navigate(`/dashboard/instructor/courses/${courseId}/manage`);
  };
  
  const handleViewAnalytics = () => {
    navigate('/dashboard/instructor/analytics');
  };
  
  return (
    <DashboardLayout pageTitle="Instructor Dashboard">
      {/* Welcome Message */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Welcome back, {user?.name}!</h2>
        <p className="text-gray-600">
          Manage your courses, track student progress, and create new learning experiences.
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <Card className="stat-card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Courses</h3>
            <BookOpen className="h-5 w-5 text-course-blue-500" />
          </div>
          <p className="text-2xl font-bold">{instructorCourses.length}</p>
          <p className="text-sm text-gray-500 mt-1">
            {instructorCourses.length === 1 ? 'Active course' : 'Active courses'}
          </p>
        </Card>
        
        <Card className="stat-card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
            <Users className="h-5 w-5 text-course-blue-500" />
          </div>
          <p className="text-2xl font-bold">{totalStudents}</p>
          <p className="text-sm text-gray-500 mt-1">Across all courses</p>
        </Card>
        
        <Card className="stat-card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
            <Star className="h-5 w-5 text-course-blue-500" />
          </div>
          <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
          <p className="text-sm text-gray-500 mt-1">Based on student reviews</p>
        </Card>
        
        <Card className="stat-card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Next Session</h3>
            <Calendar className="h-5 w-5 text-course-blue-500" />
          </div>
          <p className="text-2xl font-bold">Today</p>
          <p className="text-sm text-gray-500 mt-1">6:00 PM - 8:00 PM</p>
        </Card>
      </div>
      
      {/* My Courses */}
      <Card className="mb-8 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between py-4 bg-gray-50">
          <CardTitle>My Courses</CardTitle>
          <Button variant="outline" size="sm">
            Create New Course
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="space-y-4 p-6">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="animate-pulse flex items-center p-3 rounded-lg border">
                  <div className="w-12 h-12 bg-gray-200 rounded mr-4"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : instructorCourses.length > 0 ? (
            <div className="divide-y">
              {instructorCourses.map((course) => (
                <div 
                  key={course.id}
                  className="flex flex-col md:flex-row md:items-center p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center mb-3 md:mb-0 md:w-1/3">
                    <div className="w-12 h-12 rounded overflow-hidden mr-4">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{course.title}</h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="h-3.5 w-3.5 text-yellow-500 fill-current mr-1" />
                        <span>{course.rating.toFixed(1)} ({course.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-y-2 md:w-1/3">
                    <div className="flex items-center mr-4">
                      <Users className="w-4 h-4 mr-1 text-gray-500" />
                      <span className="text-sm">{course.enrolledCount}/{course.capacity} students</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                      <span className="text-sm">{course.schedule.days.join(', ')}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 md:mt-0 md:ml-auto flex items-center space-x-2 md:w-1/4 justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditCourse(course.id)}
                    >
                      Edit
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleManageCourse(course.id)}
                    >
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500 mb-4">You haven't created any courses yet.</p>
              <Button>Create Your First Course</Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Course Analytics */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-4 bg-gray-50">
          <CardTitle>Course Analytics</CardTitle>
          <Button variant="ghost" size="sm" className="text-course-blue-600" onClick={handleViewAnalytics}>
            View Details <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6 flex flex-wrap gap-2">
            <Button 
              variant={activeAnalytic === 'enrollment' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveAnalytic('enrollment')}
            >
              Enrollment
            </Button>
            <Button 
              variant={activeAnalytic === 'ratings' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveAnalytic('ratings')}
            >
              Ratings
            </Button>
            <Button 
              variant={activeAnalytic === 'completion' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveAnalytic('completion')}
            >
              Completion Rates
            </Button>
          </div>
          
          <div className="h-80 w-full">
            <ChartContainer 
              config={{
                blue: { color: "#3b82f6" },
                green: { color: "#10b981" },
                red: { color: "#ef4444" },
              }}
            >
              {activeAnalytic === 'enrollment' && (
                <LineChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    strokeWidth={2} 
                    activeDot={{ r: 6 }} 
                    name="New Enrollments"
                    stroke="var(--color-blue)"
                  />
                </LineChart>
              )}
              
              {activeAnalytic === 'ratings' && (
                <BarChart data={ratingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 5]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Average Rating" 
                    fill="var(--color-blue)"
                  />
                </BarChart>
              )}
              
              {activeAnalytic === 'completion' && (
                <BarChart data={completionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="completed" name="Completed" stackId="a" fill="var(--color-green)" />
                  <Bar dataKey="incomplete" name="Incomplete" stackId="a" fill="var(--color-red)" />
                </BarChart>
              )}
            </ChartContainer>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h4 className="font-medium mb-2">Top Course</h4>
              <p className="text-sm text-gray-600 mb-1">Introduction to Web Development</p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">18/30 students</span>
                <span className="flex items-center">
                  <Star className="h-3.5 w-3.5 text-yellow-500 fill-current mr-1" />
                  4.7
                </span>
              </div>
            </div>
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h4 className="font-medium mb-2">Student Demographics</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Age</p>
                  <p>18-34 (65%)</p>
                </div>
                <div>
                  <p className="text-gray-500">Top Location</p>
                  <p>United States</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
