
import { BookOpen, Users, DollarSign, BarChart2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Course } from '@/models/types';

interface AdminStatsProps {
  totalCourses: number;
  totalUsers: number;
  totalRevenue: number;
  totalEnrollments: number;
}

const AdminStats = ({ totalCourses, totalUsers, totalRevenue, totalEnrollments }: AdminStatsProps) => {
  return (
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
  );
};

export default AdminStats;
