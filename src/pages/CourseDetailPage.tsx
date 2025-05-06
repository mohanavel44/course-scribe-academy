import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Clock, Calendar, Users, Star, CheckCircle2, BookOpen, AlertCircle } from 'lucide-react';
import { Course } from '@/models/types';
import { getCourseById, enrollInCourse, getUserEnrollments } from '@/services/courseService';
import { useAuth } from '@/context/AuthContext';

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseId) return;
      
      try {
        const courseData = await getCourseById(courseId);
        setCourse(courseData);
      } catch (error) {
        console.error("Failed to fetch course details:", error);
        toast({
          title: "Error",
          description: "Could not load course details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId, toast]);

  useEffect(() => {
    // Check if user is already enrolled in this course
    const checkEnrollmentStatus = async () => {
      if (!isAuthenticated || !user || !courseId) return;
      
      try {
        const enrollments = await getUserEnrollments(user.id);
        const enrolled = enrollments.some(
          enrollment => enrollment.courseId === courseId && enrollment.status === "confirmed"
        );
        setIsEnrolled(enrolled);
      } catch (error) {
        console.error("Failed to check enrollment status:", error);
      }
    };
    
    checkEnrollmentStatus();
  }, [courseId, user, isAuthenticated]);

  const handleEnrollment = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in or register to enroll in this course.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (!course || !user) return;

    setEnrolling(true);
    try {
      await enrollInCourse(user.id, course.id);
      
      // Instead of showing a toast, redirect to the payment page
      navigate('/payment', { state: { courseId: course.id } });
    } catch (error: any) {
      toast({
        title: "Enrollment Failed",
        description: error.message || "Could not complete enrollment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-2/3 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-12"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <div className="h-48 bg-gray-300 rounded"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
              <div className="h-64 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!course) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Course Not Found</h1>
          <p className="mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
        </div>
      </MainLayout>
    );
  }

  const isCourseFull = course.enrolledCount >= course.capacity;

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Badge className="mb-2">{course.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{course.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" />
              <span className="font-medium">{course.rating.toFixed(1)}</span>
              <span className="text-sm ml-1">({course.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-1 text-gray-500" />
              <span>{course.enrolledCount} enrolled</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-1 text-gray-500" />
              <span>{course.duration} hours</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Course Content - Left Side */}
          <div className="md:col-span-2 space-y-8">
            {/* Course Image */}
            <img 
              src={course.image} 
              alt={course.title} 
              className="w-full rounded-lg h-auto md:h-80 object-cover"
            />
            
            {/* Course Description */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">About This Course</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {course.description}
              </p>
            </div>

            <Separator />
            
            {/* Schedule Details */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Course Schedule</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 mr-2 text-course-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium">Dates</h3>
                    <p className="text-gray-600">
                      {new Date(course.schedule.startDate).toLocaleDateString()} - {new Date(course.schedule.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 mr-2 text-course-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium">Time</h3>
                    <p className="text-gray-600">
                      {course.schedule.timeStart} - {course.schedule.timeEnd}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-start">
                <Calendar className="w-5 h-5 mr-2 text-course-blue-600 mt-1" />
                <div>
                  <h3 className="font-medium">Meeting Days</h3>
                  <p className="text-gray-600">
                    {course.schedule.days.join(', ')}
                  </p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* Instructor Info */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Instructor</h2>
              <div className="flex items-center">
                {course.instructor.avatar ? (
                  <img 
                    src={course.instructor.avatar} 
                    alt={course.instructor.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                    <span className="text-xl text-gray-600">
                      {course.instructor.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold">{course.instructor.name}</h3>
                  <p className="text-gray-600">Course Instructor</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enrollment Card - Right Side */}
          <div>
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="text-3xl font-bold mb-4">${course.price.toFixed(2)}</div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <span>{course.duration} hours of content</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <span>Access on all devices</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <span>Course materials included</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                    <span>Certificate of completion</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {isEnrolled ? (
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={true}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Enrolled
                    </Button>
                  ) : (
                    <Button 
                      className="w-full" 
                      disabled={enrolling || isCourseFull}
                      onClick={handleEnrollment}
                    >
                      {enrolling ? 'Processing...' : isCourseFull ? 'Join Waitlist' : 'Enroll Now'}
                    </Button>
                  )}
                  
                  {isCourseFull && !isEnrolled && (
                    <div className="flex items-center justify-center text-amber-600 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      <span>Course is full. Join waitlist instead.</span>
                    </div>
                  )}
                  
                  <p className="text-center text-sm text-gray-500">
                    {isEnrolled ? (
                      "You are enrolled in this course"
                    ) : (
                      `${course.capacity - course.enrolledCount} spots left out of ${course.capacity}`
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
