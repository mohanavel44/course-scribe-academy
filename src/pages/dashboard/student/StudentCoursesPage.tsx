
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BookOpen, Search, Calendar, Clock, ArrowRight } from 'lucide-react';
import { getUserEnrolledCourses } from '@/services/courseService';
import { useAuth } from '@/context/AuthContext';
import { Course } from '@/models/types';

export default function StudentCoursesPage() {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredCourses = enrolledCourses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate progress for each course (in a real app, this would come from the backend)
  const getRandomProgress = () => Math.floor(Math.random() * 100);

  return (
    <DashboardLayout pageTitle="My Courses">
      <div className="mb-6 space-y-2">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-course-blue-500" />
          <h1 className="text-2xl font-bold">My Courses</h1>
        </div>
        <p className="text-muted-foreground">
          Browse and manage your enrolled courses
        </p>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Courses ({enrolledCourses.length})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-40 bg-gray-200 rounded-t-lg" />
                  <CardContent className="p-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                    <div className="h-4 bg-gray-200 rounded mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <BookOpen className="h-6 w-6 text-gray-500" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No courses found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchQuery ? "Try a different search term" : "You haven't enrolled in any courses yet"}
                </p>
                {!searchQuery && (
                  <Button asChild className="mt-4">
                    <Link to="/courses">Browse Courses</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => {
                const progress = getRandomProgress();
                
                return (
                  <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Instructor: {course.instructor.name}
                      </p>
                      <Progress value={progress} className="h-2 mb-2" />
                      <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                        <span>{progress}% Complete</span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {course.duration} hrs
                        </span>
                      </div>
                      <Link to={`/courses/${course.id}`}>
                        <Button variant="outline" className="w-full flex items-center justify-center">
                          Continue <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="in-progress" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>In Progress Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This tab will show courses that you've started but not completed.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Completed Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This tab will show courses that you've successfully completed.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
