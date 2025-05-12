
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, Line, LineChart, Pie, PieChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
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
            <ChartContainer 
              className="h-full" 
              config={{
                blue: { color: "#3b82f6" }
              }}
            >
              <LineChart
                data={enrollmentData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent 
                          active={active} 
                          payload={payload}
                          formatter={(value) => [`${value} students`]}
                        />
                      );
                    }
                    return null;
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="var(--color-blue)" 
                  strokeWidth={2} 
                  dot={{ strokeWidth: 2 }} 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ChartContainer>
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
            <ChartContainer 
              className="h-full" 
              config={{
                green: { color: "#22c55e" }
              }}
            >
              <BarChart
                data={ratingData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 5]} />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent 
                          active={active} 
                          payload={payload}
                          formatter={(value) => [`${Number(value).toFixed(1)}/5.0`]}
                        />
                      );
                    }
                    return null;
                  }} 
                />
                <Legend />
                <Bar dataKey="value" fill="var(--color-green)" />
              </BarChart>
            </ChartContainer>
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
            <ChartContainer 
              className="h-full" 
              config={{
                green: { color: "#22c55e" },
                red: { color: "#ef4444" }
              }}
            >
              <BarChart
                data={completionData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent 
                          active={active} 
                          payload={payload}
                          formatter={(value) => [`${value}%`]}
                        />
                      );
                    }
                    return null;
                  }} 
                />
                <Legend />
                <Bar dataKey="completed" fill="var(--color-green)" stackId="a" />
                <Bar dataKey="incomplete" fill="var(--color-red)" stackId="a" />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
