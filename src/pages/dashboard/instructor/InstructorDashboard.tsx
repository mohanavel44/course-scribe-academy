
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useInstructorCourses, calculateInstructorStats } from '@/hooks/useInstructorCourses';
import { enrollmentData, ratingData, completionData } from '@/data/analyticsData';

// Import refactored components
import StatsOverview from '@/components/dashboard/instructor/StatsOverview';
import CoursesList from '@/components/dashboard/instructor/CoursesList';
import AnalyticsCharts from '@/components/dashboard/instructor/AnalyticsCharts';

export default function InstructorDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Use our custom hook to fetch instructor courses
  const { instructorCourses, loading } = useInstructorCourses(user?.id || '2'); // Using '2' as fallback for mock data
  
  // Calculate statistics using our helper function
  const { totalStudents, averageRating } = calculateInstructorStats(instructorCourses);
  
  return (
    <DashboardLayout pageTitle="Instructor Dashboard">
      {/* Welcome Message */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Welcome back, {user?.name}!</h2>
        <p className="text-gray-600">
          Manage your courses, track student progress, and create new learning experiences.
        </p>
      </div>
      
      {/* Stats Overview Component */}
      <StatsOverview 
        coursesCount={instructorCourses.length}
        totalStudents={totalStudents}
        averageRating={averageRating}
      />
      
      {/* Courses List Component */}
      <CoursesList 
        courses={instructorCourses}
        loading={loading}
      />
      
      {/* Analytics Charts Component */}
      <AnalyticsCharts 
        enrollmentData={enrollmentData}
        ratingData={ratingData}
        completionData={completionData}
      />
    </DashboardLayout>
  );
}
