
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, Clock, ChevronRight, MessageSquare } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Course } from '@/models/types';
import { getUserEnrolledCourses } from '@/services/courseService';
import ChatInterface from '@/components/dashboard/ChatInterface';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user) return;
      
      try {
        const courses = await getUserEnrolledCourses(user.id);
        setEnrolledCourses(courses);
        
        // Set the first course as selected by default for the chat
        if (courses.length > 0 && !selectedCourse) {
          setSelectedCourse(courses[0]);
        }
      } catch (error) {
        console.error("Failed to fetch enrolled courses:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEnrolledCourses();
  }, [user, selectedCourse]);

  // Get upcoming courses (first 2)
  const upcomingCourses = enrolledCourses.slice(0, 2);
  
  return (
    <DashboardLayout pageTitle="Student Dashboard">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          {/* Welcome Message */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Welcome back, {user?.name}!</h2>
            <p className="text-gray-600">
              Track your course progress, manage your enrollments, and explore new learning opportunities.
            </p>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="stat-card hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500">Enrolled Courses</h3>
                <BookOpen className="h-5 w-5 text-course-blue-500" />
              </div>
              <p className="text-2xl font-bold">{enrolledCourses.length}</p>
              <p className="text-sm text-gray-500 mt-1">
                {enrolledCourses.length === 1 ? 'Active course' : 'Active courses'}
              </p>
            </Card>
            
            <Card className="stat-card hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500">Next Session</h3>
                <Calendar className="h-5 w-5 text-course-blue-500" />
              </div>
              <p className="text-2xl font-bold">Today</p>
              <p className="text-sm text-gray-500 mt-1">
                {upcomingCourses.length > 0 ? `${upcomingCourses[0].title} at 6:00 PM` : 'No upcoming sessions'}
              </p>
            </Card>
            
            <Card className="stat-card hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500">Total Learning</h3>
                <Clock className="h-5 w-5 text-course-blue-500" />
              </div>
              <p className="text-2xl font-bold">
                {enrolledCourses.reduce((total, course) => total + course.duration, 0)} hrs
              </p>
              <p className="text-sm text-gray-500 mt-1">Course duration combined</p>
            </Card>
          </div>
          
          {/* Enrolled Courses */}
          <Card className="mb-8 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between py-4 bg-gray-50">
              <CardTitle>My Enrolled Courses</CardTitle>
              <Link to="/courses">
                <Button variant="ghost" size="sm" className="text-course-blue-600">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
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
              ) : enrolledCourses.length > 0 ? (
                <div className="space-y-4">
                  {enrolledCourses.map((course) => (
                    <div 
                      key={course.id} 
                      className="flex items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                      <Link to={`/courses/${course.id}`} className="flex-1 flex items-center">
                        <div className="w-12 h-12 rounded overflow-hidden mr-4">
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{course.title}</h4>
                          <p className="text-sm text-gray-500">
                            {course.schedule.days.join(', ')} • {course.schedule.timeStart} - {course.schedule.timeEnd}
                          </p>
                        </div>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="ml-2 text-gray-500 hover:text-course-blue-500"
                        onClick={() => {
                          setSelectedCourse(course);
                          setActiveTab('messages');
                        }}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet.</p>
                  <Link to="/courses">
                    <Button>Browse Courses</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Recommended Courses */}
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between py-4 bg-gray-50">
              <CardTitle>Recommended For You</CardTitle>
              <Link to="/courses">
                <Button variant="ghost" size="sm" className="text-course-blue-600">
                  Browse All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link to="/courses/5">
                  <div className="flex items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 rounded overflow-hidden mr-4">
                      <img 
                        src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=500&auto=format&fit=crop"
                        alt="Machine Learning for Beginners"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Machine Learning for Beginners</h4>
                      <p className="text-sm text-gray-500">
                        Build and train machine learning models for real-world problems.
                      </p>
                    </div>
                  </div>
                </Link>
                <Link to="/courses/4">
                  <div className="flex items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 rounded overflow-hidden mr-4">
                      <img 
                        src="https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=500&auto=format&fit=crop"
                        alt="UX/UI Design Workshop"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">UX/UI Design Workshop</h4>
                      <p className="text-sm text-gray-500">
                        Create intuitive and beautiful user interfaces with modern design principles.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="messages">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Course Messages</h2>
            <p className="text-gray-600">
              Chat with your course instructors and get help with your studies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader className="py-3 bg-gray-50">
                <CardTitle className="text-base">My Courses</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {enrolledCourses.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <p>You are not enrolled in any courses</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {enrolledCourses.map(course => (
                      <button
                        key={course.id}
                        className={`w-full text-left p-4 flex items-center hover:bg-gray-50 transition-colors ${
                          selectedCourse?.id === course.id ? 'bg-gray-50' : ''
                        }`}
                        onClick={() => setSelectedCourse(course)}
                      >
                        <div className="w-10 h-10 rounded overflow-hidden mr-3">
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{course.title}</h4>
                          <p className="text-xs text-gray-500">
                            Instructor: {course.instructor.name}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="md:col-span-2">
              {selectedCourse ? (
                <ChatInterface course={selectedCourse} />
              ) : (
                <Card className="h-[500px] flex items-center justify-center">
                  <div className="text-center p-8">
                    <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="font-semibold text-lg mb-2">No course selected</h3>
                    <p className="text-gray-500">
                      Select a course from the list to start chatting with the instructor.
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
