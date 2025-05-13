
import { CheckCircle, BookOpen, Clock, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const RecentActivities = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Latest platform activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="mr-4 mt-1 bg-green-100 rounded-full p-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="font-medium">New User Registered</p>
              <p className="text-sm text-gray-500">Maria Garcia created an account as a student</p>
              <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="mr-4 mt-1 bg-blue-100 rounded-full p-1">
              <BookOpen className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium">New Course Added</p>
              <p className="text-sm text-gray-500">Alex Johnson published "Advanced React Development"</p>
              <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="mr-4 mt-1 bg-amber-100 rounded-full p-1">
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <p className="font-medium">Course Schedule Updated</p>
              <p className="text-sm text-gray-500">David Wilson changed the schedule for "UX/UI Design Workshop"</p>
              <p className="text-xs text-gray-400 mt-1">Yesterday at 4:30 PM</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="mr-4 mt-1 bg-red-100 rounded-full p-1">
              <XCircle className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <p className="font-medium">Enrollment Cancelled</p>
              <p className="text-sm text-gray-500">A student cancelled enrollment for "Data Science Fundamentals"</p>
              <p className="text-xs text-gray-400 mt-1">Yesterday at 2:15 PM</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
