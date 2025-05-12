
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { mockCourses } from '@/data/mockData';
import { Course, Enrollment } from '@/models/types';
import { Check, ChevronLeft, Mail, User } from 'lucide-react';
import { getInstructorThreads } from '@/services/messageService';
import ChatInterface from '@/components/dashboard/ChatInterface';

export default function CourseManagePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      
      try {
        // In a real app, this would fetch from an API
        const foundCourse = mockCourses.find(c => c.id === courseId);
        if (!foundCourse) {
          throw new Error('Course not found');
        }
        
        setCourse(foundCourse);
        
        // Mock enrollments data
        const mockEnrollments: Enrollment[] = Array.from({ length: foundCourse.enrolledCount }, (_, i) => ({
          id: `enroll-${i + 1}`,
          courseId: foundCourse.id,
          userId: `stud-${i + 1}`,
          status: 'confirmed' as const,
          enrolledAt: new Date(Date.now() - i * 86400000).toISOString(), // Random dates
          updatedAt: new Date().toISOString(),
        }));
        
        setEnrollments(mockEnrollments);
        
        // Fetch messages
        if (foundCourse.instructor.id) {
          const courseMessages = await getInstructorThreads(foundCourse.instructor.id);
          setMessages(courseMessages.filter(msg => msg.courseId === courseId));
        }
      } catch (error) {
        console.error("Failed to fetch course:", error);
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
  }, [courseId, toast]);
  
  if (loading) {
    return (
      <DashboardLayout pageTitle="Manage Course">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (!course) {
    return (
      <DashboardLayout pageTitle="Manage Course">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Course not found</h2>
          <p className="text-gray-600 mb-6">
            The course you are trying to manage does not exist.
          </p>
          <Button onClick={() => navigate('/dashboard/instructor')}>
            Back to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout pageTitle="Manage Course">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Button 
            variant="ghost" 
            className="mb-2 pl-0" 
            onClick={() => navigate('/dashboard/instructor')}
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Back to Dashboard
          </Button>
          <h2 className="text-xl font-semibold">{course.title}</h2>
          <p className="text-gray-600">
            Manage enrollments, view student progress, and communicate with students.
          </p>
        </div>
        <Button 
          onClick={() => navigate(`/dashboard/instructor/courses/${courseId}/edit`)}
          variant="outline"
        >
          Edit Course
        </Button>
      </div>
      
      <Tabs defaultValue="enrollments">
        <TabsList className="mb-6">
          <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="materials">Course Materials</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enrollments">
          <Card>
            <CardHeader>
              <CardTitle>Student Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              {enrollments.length > 0 ? (
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Enrolled On
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {enrollments.map((enrollment, index) => (
                        <tr key={enrollment.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-gray-500" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">Student {index + 1}</p>
                                <p className="text-xs text-gray-500">student{index + 1}@example.com</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-500">
                              {new Date(enrollment.enrolledAt).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <Check className="w-3 h-3 mr-1" />
                              Confirmed
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="outline" size="sm" className="mr-2">
                              <Mail className="h-3.5 w-3.5 mr-1" />
                              Message
                            </Button>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No students have enrolled in this course yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="messages">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader className="py-3">
                <CardTitle className="text-base">Students</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {enrollments.length > 0 ? (
                    enrollments.map((enrollment, index) => (
                      <button
                        key={enrollment.id}
                        className={`w-full text-left p-4 flex items-center hover:bg-gray-50 transition-colors ${
                          selectedStudent === enrollment.userId ? 'bg-gray-50' : ''
                        }`}
                        onClick={() => setSelectedStudent(enrollment.userId)}
                      >
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">Student {index + 1}</h4>
                          <p className="text-xs text-gray-500">Last message: 2 hours ago</p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      <p>No students enrolled yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <div className="md:col-span-2">
              {selectedStudent && course ? (
                <ChatInterface course={course} />
              ) : (
                <Card className="h-[500px] flex items-center justify-center">
                  <div className="text-center p-8">
                    <Mail className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="font-semibold text-lg mb-2">No conversation selected</h3>
                    <p className="text-gray-500">
                      Select a student from the list to view or start a conversation.
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="materials">
          <Card>
            <CardHeader>
              <CardTitle>Course Materials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Upload lecture notes, assignments, and other materials for your students.</p>
                <Button>Upload Materials</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
