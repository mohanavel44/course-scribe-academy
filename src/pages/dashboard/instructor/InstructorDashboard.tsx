
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Star, Calendar, ChevronRight, TrendingUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Course } from '@/models/types';
import { mockCourses } from '@/data/mockData';

export default function InstructorDashboard() {
  const { user } = useAuth();
  const [instructorCourses, setInstructorCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
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
        <Card className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Courses</h3>
            <BookOpen className="h-5 w-5 text-course-blue-500" />
          </div>
          <p className="text-2xl font-bold">{instructorCourses.length}</p>
          <p className="text-sm text-gray-500 mt-1">
            {instructorCourses.length === 1 ? 'Active course' : 'Active courses'}
          </p>
        </Card>
        
        <Card className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
            <Users className="h-5 w-5 text-course-blue-500" />
          </div>
          <p className="text-2xl font-bold">{totalStudents}</p>
          <p className="text-sm text-gray-500 mt-1">Across all courses</p>
        </Card>
        
        <Card className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
            <Star className="h-5 w-5 text-course-blue-500" />
          </div>
          <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
          <p className="text-sm text-gray-500 mt-1">Based on student reviews</p>
        </Card>
        
        <Card className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Next Session</h3>
            <Calendar className="h-5 w-5 text-course-blue-500" />
          </div>
          <p className="text-2xl font-bold">Today</p>
          <p className="text-sm text-gray-500 mt-1">6:00 PM - 8:00 PM</p>
        </Card>
      </div>
      
      {/* My Courses */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <CardTitle>My Courses</CardTitle>
          <Button variant="outline" size="sm">
            Create New Course
          </Button>
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
          ) : instructorCourses.length > 0 ? (
            <div className="space-y-4">
              {instructorCourses.map((course) => (
                <div 
                  key={course.id}
                  className="flex flex-col md:flex-row md:items-center p-4 rounded-lg border"
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
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button size="sm">Manage</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500 mb-4">You haven't created any courses yet.</p>
              <Button>Create Your First Course</Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Course Analytics */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <CardTitle>Course Analytics</CardTitle>
          <Button variant="ghost" size="sm" className="text-course-blue-600">
            View Details <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Enrollment Trends</h4>
                <span className="flex items-center text-green-600 text-sm font-medium">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +12.5% this month
                </span>
              </div>
              <div className="h-48 flex items-end justify-between border-b border-l">
                <div className="h-20 w-8 bg-course-blue-200 rounded-t"></div>
                <div className="h-24 w-8 bg-course-blue-300 rounded-t"></div>
                <div className="h-16 w-8 bg-course-blue-200 rounded-t"></div>
                <div className="h-32 w-8 bg-course-blue-400 rounded-t"></div>
                <div className="h-28 w-8 bg-course-blue-300 rounded-t"></div>
                <div className="h-40 w-8 bg-course-blue-600 rounded-t"></div>
                <div className="h-36 w-8 bg-course-blue-500 rounded-t"></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
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
              <div className="p-4 border rounded-lg">
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
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
