
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, Clock, ChevronRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Course } from '@/models/types';
import { getUserEnrolledCourses } from '@/services/courseService';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user) return;
      
      try {
        const courses = await getUserEnrolledCourses(user.id);
        setEnrolledCourses(courses);
      } catch (error) {
        console.error("Failed to fetch enrolled courses:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEnrolledCourses();
  }, [user]);

  // Get upcoming courses (first 2)
  const upcomingCourses = enrolledCourses.slice(0, 2);
  
  return (
    <DashboardLayout pageTitle="Student Dashboard">
      {/* Welcome Message */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Welcome back, {user?.name}!</h2>
        <p className="text-gray-600">
          Track your course progress, manage your enrollments, and explore new learning opportunities.
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Enrolled Courses</h3>
            <BookOpen className="h-5 w-5 text-course-blue-500" />
          </div>
          <p className="text-2xl font-bold">{enrolledCourses.length}</p>
          <p className="text-sm text-gray-500 mt-1">
            {enrolledCourses.length === 1 ? 'Active course' : 'Active courses'}
          </p>
        </Card>
        
        <Card className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Next Session</h3>
            <Calendar className="h-5 w-5 text-course-blue-500" />
          </div>
          <p className="text-2xl font-bold">Today</p>
          <p className="text-sm text-gray-500 mt-1">
            {upcomingCourses.length > 0 ? `${upcomingCourses[0].title} at 6:00 PM` : 'No upcoming sessions'}
          </p>
        </Card>
        
        <Card className="stat-card">
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
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <CardTitle>My Enrolled Courses</CardTitle>
          <Link to="/dashboard/student/courses">
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
                <Link to={`/courses/${course.id}`} key={course.id}>
                  <div className="flex items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors">
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
                  </div>
                </Link>
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
      <Card>
        <CardHeader className="flex flex-row items-center justify-between py-4">
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
    </DashboardLayout>
  );
}
