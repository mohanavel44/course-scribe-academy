
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { Course } from '@/models/types';
import { getAllCourses } from '@/services/courseService';
import { mockUsers } from '@/context/AuthContext';

// Import the newly created components
import WelcomeSection from '@/components/dashboard/admin/WelcomeSection';
import AdminStats from '@/components/dashboard/admin/AdminStats';
import RecentCourses from '@/components/dashboard/admin/RecentCourses';
import RecentActivities from '@/components/dashboard/admin/RecentActivities';
import QuickActions from '@/components/dashboard/admin/QuickActions';

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
      <WelcomeSection userName={user?.name || ""} />
      
      {/* Platform Stats */}
      <AdminStats 
        totalCourses={totalCourses}
        totalUsers={totalUsers}
        totalRevenue={totalRevenue}
        totalEnrollments={totalEnrollments}
      />
      
      {/* Recent Courses */}
      <RecentCourses courses={courses} loading={loading} />
      
      {/* Recent Activities & Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <RecentActivities />
        <QuickActions />
      </div>
    </DashboardLayout>
  );
}
