
import { Card } from "@/components/ui/card";
import { BookOpen, Users, Star, Calendar } from "lucide-react";

interface StatsOverviewProps {
  coursesCount: number;
  totalStudents: number;
  averageRating: number;
}

export default function StatsOverview({ coursesCount, totalStudents, averageRating }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      <Card className="stat-card hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">Total Courses</h3>
          <BookOpen className="h-5 w-5 text-course-blue-500" />
        </div>
        <p className="text-2xl font-bold">{coursesCount}</p>
        <p className="text-sm text-gray-500 mt-1">
          {coursesCount === 1 ? 'Active course' : 'Active courses'}
        </p>
      </Card>
      
      <Card className="stat-card hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
          <Users className="h-5 w-5 text-course-blue-500" />
        </div>
        <p className="text-2xl font-bold">{totalStudents}</p>
        <p className="text-sm text-gray-500 mt-1">Across all courses</p>
      </Card>
      
      <Card className="stat-card hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
          <Star className="h-5 w-5 text-course-blue-500" />
        </div>
        <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
        <p className="text-sm text-gray-500 mt-1">Based on student reviews</p>
      </Card>
      
      <Card className="stat-card hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">Next Session</h3>
          <Calendar className="h-5 w-5 text-course-blue-500" />
        </div>
        <p className="text-2xl font-bold">Today</p>
        <p className="text-sm text-gray-500 mt-1">6:00 PM - 8:00 PM</p>
      </Card>
    </div>
  );
}
