
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Star } from "lucide-react";
import { Course } from '@/models/types';

interface CoursesListProps {
  courses: Course[];
  loading: boolean;
}

export default function CoursesList({ courses, loading }: CoursesListProps) {
  const navigate = useNavigate();
  
  const handleEditCourse = (courseId: string) => {
    navigate(`/dashboard/instructor/courses/${courseId}/edit`);
  };

  const handleManageCourse = (courseId: string) => {
    navigate(`/dashboard/instructor/courses/${courseId}/manage`);
  };
  
  return (
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
        ) : courses.length > 0 ? (
          <div className="divide-y">
            {courses.map((course) => (
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
  );
}
