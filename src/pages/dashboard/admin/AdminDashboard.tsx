
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BookOpen, Users, DollarSign, BarChart2, ChevronRight, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Course } from '@/models/types';
import { getAllCourses } from '@/services/courseService';
import { mockUsers } from '@/context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const allCourses = await getAllCourses();
        setCourses(allCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);

  // Calculate platform statistics
  const totalCourses = courses.length;
  const totalRevenue = courses.reduce((sum, course) => sum + (course.price * course.enrolledCount), 0);
  const totalUsers = mockUsers.length;
  const totalEnrollments = courses.reduce((sum, course) => sum + course.enrolledCount, 0);
  
  return (
    <DashboardLayout pageTitle="Admin Dashboard">
      {/* Welcome Message */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Welcome, {user?.name}!</h2>
        <p className="text-gray-600">
          Monitor platform performance, manage courses and users, and analyze key metrics.
        </p>
      </div>
      
      {/* Platform Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <Card className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Courses</h3>
            <BookOpen className="h-5 w-5 text-course-blue-500" />
          </div>
          <p className="text-2xl font-bold">{totalCourses}</p>
          <p className="text-sm text-gray-500 mt-1">Active on platform</p>
        </Card>
        
        <Card className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
            <Users className="h-5 w-5 text-course-blue-500" />
          </div>
          <p className="text-2xl font-bold">{totalUsers}</p>
          <p className="text-sm text-gray-500 mt-1">Registered accounts</p>
        </Card>
        
        <Card className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <DollarSign className="h-5 w-5 text-course-blue-500" />
          </div>
          <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1">From all enrollments</p>
        </Card>
        
        <Card className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Enrollments</h3>
            <BarChart2 className="h-5 w-5 text-course-blue-500" />
          </div>
          <p className="text-2xl font-bold">{totalEnrollments}</p>
          <p className="text-sm text-gray-500 mt-1">Across all courses</p>
        </Card>
      </div>
      
      {/* Recent Courses */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between py-4">
          <div>
            <CardTitle>Recent Courses</CardTitle>
            <CardDescription>Monitor recently added courses</CardDescription>
          </div>
          <Link to="/dashboard/admin/courses">
            <Button variant="ghost" size="sm" className="text-course-blue-600">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded mb-4"></div>
              <div className="h-10 bg-gray-200 rounded mb-4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Enrollments</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.slice(0, 5).map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell>{course.instructor.name}</TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>{course.enrolledCount}/{course.capacity}</TableCell>
                    <TableCell>${course.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      {/* Recent Activities & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-green-100 rounded-full p-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">New User Registered</p>
                  <p className="text-sm text-gray-500">Maria Garcia created an account as a student</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-blue-100 rounded-full p-1">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">New Course Added</p>
                  <p className="text-sm text-gray-500">Alex Johnson published "Advanced React Development"</p>
                  <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-amber-100 rounded-full p-1">
                  <Clock className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Course Schedule Updated</p>
                  <p className="text-sm text-gray-500">David Wilson changed the schedule for "UX/UI Design Workshop"</p>
                  <p className="text-xs text-gray-400 mt-1">Yesterday at 4:30 PM</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-red-100 rounded-full p-1">
                  <XCircle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">Enrollment Cancelled</p>
                  <p className="text-sm text-gray-500">A student cancelled enrollment for "Data Science Fundamentals"</p>
                  <p className="text-xs text-gray-400 mt-1">Yesterday at 2:15 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <Button className="justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                Add New Course
              </Button>
              
              <Button variant="outline" className="justify-start">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Button>
              
              <Button variant="outline" className="justify-start">
                <BarChart2 className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
              
              <Button variant="outline" className="justify-start">
                <DollarSign className="mr-2 h-4 w-4" />
                Manage Payments
              </Button>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-700 mb-2">System Status</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Uptime</span>
                  <span className="text-green-600">99.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Database Status</span>
                  <span className="text-green-600">Operational</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Backup</span>
                  <span className="text-gray-600">Today, 5:00 AM</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
