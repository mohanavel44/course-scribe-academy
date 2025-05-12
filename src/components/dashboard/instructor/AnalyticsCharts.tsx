
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Star } from "lucide-react";
import { 
  LineChart,
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

// Analytics data types
type EnrollmentData = Array<{ name: string; value: number }>;
type RatingData = Array<{ name: string; value: number }>;
type CompletionData = Array<{ name: string; completed: number; incomplete: number }>;

interface AnalyticsChartsProps {
  enrollmentData: EnrollmentData;
  ratingData: RatingData;
  completionData: CompletionData;
}

export default function AnalyticsCharts({ 
  enrollmentData, 
  ratingData, 
  completionData 
}: AnalyticsChartsProps) {
  const navigate = useNavigate();
  const [activeAnalytic, setActiveAnalytic] = useState('enrollment');
  
  const handleViewAnalytics = () => {
    navigate('/dashboard/instructor/analytics');
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between py-4 bg-gray-50">
        <CardTitle>Course Analytics</CardTitle>
        <Button variant="ghost" size="sm" className="text-course-blue-600" onClick={handleViewAnalytics}>
          View Details <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6 flex flex-wrap gap-2">
          <Button 
            variant={activeAnalytic === 'enrollment' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveAnalytic('enrollment')}
          >
            Enrollment
          </Button>
          <Button 
            variant={activeAnalytic === 'ratings' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveAnalytic('ratings')}
          >
            Ratings
          </Button>
          <Button 
            variant={activeAnalytic === 'completion' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveAnalytic('completion')}
          >
            Completion Rates
          </Button>
        </div>
        
        <div className="h-80 w-full">
          <ChartContainer 
            config={{
              blue: { color: "#3b82f6" },
              green: { color: "#10b981" },
              red: { color: "#ef4444" },
            }}
          >
            {activeAnalytic === 'enrollment' && (
              <ResponsiveContainer>
                <LineChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    strokeWidth={2} 
                    activeDot={{ r: 6 }} 
                    name="New Enrollments"
                    stroke="var(--color-blue)"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
            
            {activeAnalytic === 'ratings' && (
              <ResponsiveContainer>
                <BarChart data={ratingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 5]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Average Rating" 
                    fill="var(--color-blue)"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
            
            {activeAnalytic === 'completion' && (
              <ResponsiveContainer>
                <BarChart data={completionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="completed" name="Completed" stackId="a" fill="var(--color-green)" />
                  <Bar dataKey="incomplete" name="Incomplete" stackId="a" fill="var(--color-red)" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartContainer>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h4 className="font-medium mb-2">Top Course</h4>
            <p className="text-sm text-gray-600 mb-1">Introduction to Web Development</p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">18/30 students</span>
              <span className="flex items-center">
                <Star className="h-3.5 w-3.5 text-yellow-500 fill-current mr-1" />
                4.7
              </span>
            </div>
          </div>
          <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h4 className="font-medium mb-2">Student Demographics</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Age</p>
                <p>18-34 (65%)</p>
              </div>
              <div>
                <p className="text-gray-500">Top Location</p>
                <p>United States</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
