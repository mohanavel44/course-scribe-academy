
import { BookOpen, Users, BarChart2, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common administrative tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <Button className="justify-start">
            <BookOpen className="mr-2 h-4 w-4" />
            Add New Course
          </Button>
          
          <Button variant="outline" className="justify-start">
            <Users className="mr-2 h-4 w-4" />
            Manage Users
          </Button>
          
          <Button variant="outline" className="justify-start">
            <BarChart2 className="mr-2 h-4 w-4" />
            View Analytics
          </Button>
          
          <Button variant="outline" className="justify-start">
            <DollarSign className="mr-2 h-4 w-4" />
            Manage Payments
          </Button>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h4 className="font-medium text-blue-700 mb-2">System Status</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Platform Uptime</span>
              <span className="text-green-600">99.8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Database Status</span>
              <span className="text-green-600">Operational</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Backup</span>
              <span className="text-gray-600">Today, 5:00 AM</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
