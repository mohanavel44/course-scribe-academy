
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, PieChart, LineChart } from "@/components/ui/chart";
import { Fragment } from "react";

interface EnrollmentDataPoint {
  name: string;
  value: number;
}

interface RatingDataPoint {
  name: string;
  value: number;
}

interface CompletionDataPoint {
  name: string;
  completed: number;
  incomplete: number;
}

interface AnalyticsChartsProps {
  enrollmentData: EnrollmentDataPoint[];
  ratingData: RatingDataPoint[];
  completionData: CompletionDataPoint[];
}

export default function AnalyticsCharts({
  enrollmentData,
  ratingData,
  completionData
}: AnalyticsChartsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Enrollment Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Enrollment Trends</CardTitle>
          <CardDescription>Monthly enrollment activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <LineChart 
              data={enrollmentData}
              categories={["value"]}
              index="name"
              valueFormatter={(value) => `${value} students`}
              colors={["blue"]}
              className="h-full"
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Course Ratings */}
      <Card>
        <CardHeader>
          <CardTitle>Course Ratings</CardTitle>
          <CardDescription>Average ratings by course</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <BarChart 
              data={ratingData}
              categories={["value"]}
              index="name"
              valueFormatter={(value) => `${value.toFixed(1)}/5.0`}
              colors={["green"]}
              className="h-full"
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Completion Rates */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Completion Rates</CardTitle>
          <CardDescription>Weekly course completion statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <BarChart 
              data={completionData}
              categories={["completed", "incomplete"]}
              index="name"
              valueFormatter={(value) => `${value}%`}
              colors={["green", "red"]}
              className="h-full"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
