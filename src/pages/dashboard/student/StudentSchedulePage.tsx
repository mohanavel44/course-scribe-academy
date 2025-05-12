
import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, MapPin, BookOpen } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';

export default function StudentSchedulePage() {
  const { user } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');

  // Sample schedule data - in a real app, this would come from an API
  const scheduleEvents = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      start: "09:00",
      end: "10:30",
      location: "Room A101",
      instructor: "John Smith",
      type: "lecture"
    },
    {
      id: 2,
      title: "Database Design Lab",
      start: "11:00",
      end: "12:30",
      location: "Computer Lab B",
      instructor: "Sarah Johnson",
      type: "lab"
    },
    {
      id: 3,
      title: "Algorithm Study Group",
      start: "14:00",
      end: "15:30",
      location: "Study Room 203",
      instructor: null,
      type: "group"
    },
    {
      id: 4,
      title: "Office Hours",
      start: "16:00",
      end: "17:00",
      location: "Faculty Office 305",
      instructor: "David Williams",
      type: "office-hours"
    }
  ];

  // Function to get events for the selected date
  const getEventsForDate = () => {
    // In a real app, filter events based on the selected date
    return scheduleEvents;
  };

  // Get the formatted current date
  const formattedDate = date ? format(date, 'EEEE, MMMM d, yyyy') : '';

  return (
    <DashboardLayout pageTitle="Schedule">
      <div className="mb-6 space-y-2">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5 text-course-blue-500" />
          <h1 className="text-2xl font-bold">Class Schedule</h1>
        </div>
        <p className="text-muted-foreground">
          View and manage your course schedule
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Calendar</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              
              <div className="p-4 border-t">
                <h3 className="font-medium mb-2">Legend</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300 mr-2">Lecture</Badge>
                    <span className="text-sm text-muted-foreground">Regular class sessions</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300 mr-2">Lab</Badge>
                    <span className="text-sm text-muted-foreground">Practical sessions</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300 mr-2">Group</Badge>
                    <span className="text-sm text-muted-foreground">Study groups</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-300 mr-2">Office Hours</Badge>
                    <span className="text-sm text-muted-foreground">Instructor availability</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>{formattedDate}</CardTitle>
              <Tabs value={view} onValueChange={(v) => setView(v as 'day' | 'week' | 'month')}>
                <TabsList className="grid w-[200px] grid-cols-3">
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <TabsContent value="day" className="mt-0">
                {getEventsForDate().length > 0 ? (
                  <div className="space-y-4">
                    {getEventsForDate().map((event) => (
                      <div key={event.id} className="flex flex-col p-3 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{event.title}</h4>
                          <Badge 
                            variant="outline"
                            className={`
                              ${event.type === 'lecture' ? 'bg-blue-100 text-blue-700 border-blue-300' : ''}
                              ${event.type === 'lab' ? 'bg-green-100 text-green-700 border-green-300' : ''}
                              ${event.type === 'group' ? 'bg-purple-100 text-purple-700 border-purple-300' : ''}
                              ${event.type === 'office-hours' ? 'bg-amber-100 text-amber-700 border-amber-300' : ''}
                            `}
                          >
                            {event.type === 'office-hours' ? 'Office Hours' : 
                             event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </Badge>
                        </div>
                        <div className="flex flex-col space-y-2 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{event.start} - {event.end}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{event.location}</span>
                          </div>
                          {event.instructor && (
                            <div className="flex items-center text-muted-foreground">
                              <BookOpen className="h-4 w-4 mr-2" />
                              <span>Instructor: {event.instructor}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-medium mb-1">No events scheduled</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You have no classes or events scheduled for this day
                    </p>
                    <Button variant="outline">Add Event</Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="week" className="mt-0">
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium mb-1">Week View</h3>
                  <p className="text-sm text-muted-foreground">
                    This view will show your schedule for the entire week
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="month" className="mt-0">
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium mb-1">Month View</h3>
                  <p className="text-sm text-muted-foreground">
                    This view will show your schedule for the entire month
                  </p>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
