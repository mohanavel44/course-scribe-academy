
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Calendar, Clock } from 'lucide-react';
import { Course } from '@/models/types';
import { getCourseById } from '@/services/courseService';
import { useToast } from '@/components/ui/use-toast';

export default function PaymentSuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!state || !state.courseId) {
      navigate('/courses');
      return;
    }
    
    const fetchCourse = async () => {
      try {
        const courseData = await getCourseById(state.courseId);
        if (!courseData) {
          throw new Error("Course not found");
        }
        setCourse(courseData);
      } catch (error) {
        console.error("Failed to load course:", error);
        toast({
          title: "Error",
          description: "Failed to load course information",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [state, navigate, toast]);
  
  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!course) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Enrollment Successful!</h1>
          <p className="text-gray-600">
            Thank you for your payment. You have successfully enrolled in the course.
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Enrollment Details</CardTitle>
            <CardDescription>Your course information and schedule</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-lg">{course.title}</p>
                <Badge>{course.category}</Badge>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Paid Amount</p>
                <p className="font-bold">${state?.amount?.toFixed(2) || course.price.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-start">
                <Calendar className="w-5 h-5 mr-2 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Course Dates</p>
                  <p className="text-gray-600">
                    {new Date(course.schedule.startDate).toLocaleDateString()} - {new Date(course.schedule.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="w-5 h-5 mr-2 text-gray-500 mt-0.5" />
                <div>
                  <p className="font-medium">Schedule</p>
                  <p className="text-gray-600">
                    {course.schedule.days.join(', ')} • {course.schedule.timeStart} - {course.schedule.timeEnd}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <p className="font-medium">Payment Method</p>
              <p className="text-gray-600">
                {state?.paymentMethod === 'card' && 'Credit/Debit Card'}
                {state?.paymentMethod === 'gpay' && 'Google Pay'}
                {state?.paymentMethod === 'paypal' && 'PayPal'}
                {!state?.paymentMethod && 'Online Payment'}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 bg-gray-50">
            <Button asChild className="flex-1">
              <Link to="/dashboard/student">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link to="/courses">Browse More Courses</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <div className="text-center text-sm text-gray-500">
          <p>A confirmation email has been sent to your registered email address.</p>
          <p>If you have any questions, please contact our support team.</p>
        </div>
      </div>
    </MainLayout>
  );
}
