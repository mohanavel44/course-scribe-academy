
import { useState, useEffect } from 'react';
import { Course } from '@/models/types';
import { mockCourses } from '@/data/mockData';

export function useInstructorCourses(instructorId: string | undefined) {
  const [instructorCourses, setInstructorCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchInstructorCourses = async () => {
      if (!instructorId) return;
      
      try {
        // In a real app, this would fetch from an API
        // Mock data for now - filter courses where the instructor ID matches
        const courses = mockCourses.filter(course => course.instructor.id === instructorId);
        setInstructorCourses(courses);
      } catch (error) {
        console.error("Failed to fetch instructor courses:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInstructorCourses();
  }, [instructorId]);
  
  return { instructorCourses, loading };
}

// Helper function to calculate statistics
export function calculateInstructorStats(courses: Course[]) {
  const totalStudents = courses.reduce((sum, course) => sum + course.enrolledCount, 0);
  const averageRating = courses.length > 0
    ? courses.reduce((sum, course) => sum + course.rating, 0) / courses.length
    : 0;
    
  return {
    totalStudents,
    averageRating
  };
}
