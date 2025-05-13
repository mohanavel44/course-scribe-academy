
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Course } from '@/models/types';

interface RecentCoursesProps {
  courses: Course[];
  loading: boolean;
}

const RecentCourses = ({ courses, loading }: RecentCoursesProps) => {
  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <div>
          <CardTitle>Recent Courses</CardTitle>
          <CardDescription>Monitor recently added courses</CardDescription>
        </div>
        <Link to="/dashboard/admin/courses">
          <Button variant="ghost" size="sm" className="text-course-blue-600">
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Enrollments</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.slice(0, 5).map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.instructor.name}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>{course.enrolledCount}/{course.capacity}</TableCell>
                  <TableCell>${course.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentCourses;
