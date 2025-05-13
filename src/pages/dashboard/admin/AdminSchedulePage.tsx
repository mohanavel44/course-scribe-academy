
import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, Edit, Plus, Trash } from 'lucide-react';
import { mockCourses } from '@/data/mockData';
import { mockUsers } from '@/context/AuthContext';

// Mock schedule data
const mockSchedule = [
  {
    id: '1',
    courseId: '1',
    courseName: 'Introduction to React',
    instructorId: '2',
    instructorName: 'Test Instructor',
    startDate: '2025-05-20',
    endDate: '2025-06-20',
    daysOfWeek: ['Monday', 'Wednesday'],
    startTime: '10:00',
    endTime: '12:00',
    room: 'Virtual Room A',
  },
  {
    id: '2',
    courseId: '2',
    courseName: 'Advanced JavaScript',
    instructorId: '2',
    instructorName: 'Test Instructor',
    startDate: '2025-06-01',
    endDate: '2025-07-15',
    daysOfWeek: ['Tuesday', 'Thursday'],
    startTime: '13:00',
    endTime: '15:00',
    room: 'Virtual Room B',
  },
  {
    id: '3',
    courseId: '3',
    courseName: 'UX/UI Design Fundamentals',
    instructorId: '2',
    instructorName: 'Test Instructor',
    startDate: '2025-05-15',
    endDate: '2025-06-30',
    daysOfWeek: ['Friday'],
    startTime: '09:00',
    endTime: '13:00',
    room: 'Virtual Room C',
  },
];

export default function AdminSchedulePage() {
  const { toast } = useToast();
  const [schedules, setSchedules] = useState(mockSchedule);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState<any>(null);
  
  // Get instructors (filtered from mockUsers)
  const instructors = mockUsers.filter(user => user.role === 'instructor');
  
  // Get courses 
  const courses = mockCourses;
  
  const handleAddSchedule = (formData: any) => {
    const newSchedule = {
      id: `${schedules.length + 1}`,
      ...formData,
      courseName: courses.find(c => c.id === formData.courseId)?.title || '',
      instructorName: instructors.find(i => i.id === formData.instructorId)?.name || '',
    };
    
    setSchedules([...schedules, newSchedule]);
    toast({
      title: "Schedule Added",
      description: `${newSchedule.courseName} has been scheduled successfully.`
    });
    setIsDialogOpen(false);
  };
  
  const handleEditSchedule = (schedule: any) => {
    setCurrentSchedule(schedule);
    setIsEditing(true);
    setIsDialogOpen(true);
  };
  
  const handleUpdateSchedule = (formData: any) => {
    const updatedSchedules = schedules.map(schedule => 
      schedule.id === currentSchedule.id 
        ? { 
            ...schedule, 
            ...formData, 
            courseName: courses.find(c => c.id === formData.courseId)?.title || schedule.courseName,
            instructorName: instructors.find(i => i.id === formData.instructorId)?.name || schedule.instructorName,
          }
        : schedule
    );
    
    setSchedules(updatedSchedules);
    toast({
      title: "Schedule Updated",
      description: "The course schedule has been updated successfully."
    });
    setIsDialogOpen(false);
    setIsEditing(false);
    setCurrentSchedule(null);
  };
  
  const handleDeleteSchedule = (id: string) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
    toast({
      title: "Schedule Deleted",
      description: "The course schedule has been deleted successfully."
    });
  };
  
  const resetForm = () => {
    setIsEditing(false);
    setCurrentSchedule(null);
    setIsDialogOpen(false);
  };
  
  return (
    <DashboardLayout pageTitle="Course Scheduling">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Course Schedule</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setIsEditing(false); setCurrentSchedule(null); }}>
                <Plus className="mr-2 h-4 w-4" /> Add Schedule
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>{isEditing ? "Edit Schedule" : "Create New Schedule"}</DialogTitle>
                <DialogDescription>
                  {isEditing 
                    ? "Update the scheduling details for this course."
                    : "Set up a new course schedule with instructor and timing."}
                </DialogDescription>
              </DialogHeader>
              
              <ScheduleForm 
                onSubmit={isEditing ? handleUpdateSchedule : handleAddSchedule}
                onCancel={resetForm}
                initialData={currentSchedule}
                courses={courses}
                instructors={instructors}
              />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Days</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.length > 0 ? (
                  schedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell className="font-medium">{schedule.courseName}</TableCell>
                      <TableCell>{schedule.instructorName}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          <span>{schedule.startDate} to {schedule.endDate}</span>
                        </div>
                      </TableCell>
                      <TableCell>{schedule.daysOfWeek.join(', ')}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          <span>{schedule.startTime} - {schedule.endTime}</span>
                        </div>
                      </TableCell>
                      <TableCell>{schedule.room}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditSchedule(schedule)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteSchedule(schedule.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                      No schedules found. Add your first course schedule.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

// Schedule form component
function ScheduleForm({ 
  onSubmit, 
  onCancel,
  initialData,
  courses,
  instructors
}: { 
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData: any;
  courses: any[];
  instructors: any[];
}) {
  const [formData, setFormData] = useState({
    courseId: initialData?.courseId || '',
    instructorId: initialData?.instructorId || '',
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    daysOfWeek: initialData?.daysOfWeek || [],
    startTime: initialData?.startTime || '',
    endTime: initialData?.endTime || '',
    room: initialData?.room || ''
  });
  
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const handleChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleDayToggle = (day: string) => {
    const currentDays = [...formData.daysOfWeek];
    if (currentDays.includes(day)) {
      handleChange('daysOfWeek', currentDays.filter(d => d !== day));
    } else {
      handleChange('daysOfWeek', [...currentDays, day]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="course">Course</Label>
          <Select 
            value={formData.courseId} 
            onValueChange={(value) => handleChange('courseId', value)}
          >
            <SelectTrigger id="course">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="instructor">Instructor</Label>
          <Select 
            value={formData.instructorId} 
            onValueChange={(value) => handleChange('instructorId', value)}
          >
            <SelectTrigger id="instructor">
              <SelectValue placeholder="Select Instructor" />
            </SelectTrigger>
            <SelectContent>
              {instructors.map((instructor) => (
                <SelectItem key={instructor.id} value={instructor.id}>
                  {instructor.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleChange('startDate', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => handleChange('endDate', e.target.value)}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Days of Week</Label>
        <div className="flex flex-wrap gap-2">
          {daysOfWeek.map((day) => (
            <Button
              key={day}
              type="button"
              variant={formData.daysOfWeek.includes(day) ? "default" : "outline"}
              size="sm"
              onClick={() => handleDayToggle(day)}
              className="flex-grow sm:flex-grow-0"
            >
              {day.substring(0, 3)}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            id="startTime"
            type="time"
            value={formData.startTime}
            onChange={(e) => handleChange('startTime', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="endTime">End Time</Label>
          <Input
            id="endTime"
            type="time"
            value={formData.endTime}
            onChange={(e) => handleChange('endTime', e.target.value)}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="room">Room / Location</Label>
        <Input
          id="room"
          value={formData.room}
          onChange={(e) => handleChange('room', e.target.value)}
          placeholder="e.g., Virtual Room A, Room 101, etc."
        />
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Update Schedule' : 'Add Schedule'}
        </Button>
      </DialogFooter>
    </form>
  );
}
