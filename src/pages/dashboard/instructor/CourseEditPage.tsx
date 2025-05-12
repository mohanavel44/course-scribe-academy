
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { mockCourses } from '@/data/mockData';
import { Course } from '@/models/types';

export default function CourseEditPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [capacity, setCapacity] = useState('');
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  
  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      
      try {
        // In a real app, this would fetch from an API
        const foundCourse = mockCourses.find(c => c.id === courseId);
        if (!foundCourse) {
          throw new Error('Course not found');
        }
        
        setCourse(foundCourse);
        
        // Set form values
        setTitle(foundCourse.title);
        setDescription(foundCourse.description);
        setShortDescription(foundCourse.shortDescription);
        setPrice(foundCourse.price.toString());
        setDuration(foundCourse.duration.toString());
        setCapacity(foundCourse.capacity.toString());
        setCategory(foundCourse.category);
        setLevel(foundCourse.level);
      } catch (error) {
        console.error("Failed to fetch course:", error);
        toast({
          title: "Error",
          description: "Failed to load course information",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [courseId, toast]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send to an API
    toast({
      title: "Course updated",
      description: "Your changes have been saved successfully.",
    });
    
    // Navigate back to instructor dashboard
    navigate('/dashboard/instructor');
  };
  
  if (loading) {
    return (
      <DashboardLayout pageTitle="Edit Course">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (!course) {
    return (
      <DashboardLayout pageTitle="Edit Course">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Course not found</h2>
          <p className="text-gray-600 mb-6">
            The course you are trying to edit does not exist.
          </p>
          <Button onClick={() => navigate('/dashboard/instructor')}>
            Back to Dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout pageTitle="Edit Course">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Edit {course.title}</h2>
        <p className="text-gray-600">
          Update your course information and settings.
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input 
                  id="price" 
                  type="number" 
                  value={price} 
                  onChange={e => setPrice(e.target.value)}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Input 
                id="shortDescription" 
                value={shortDescription} 
                onChange={e => setShortDescription(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Full Description</Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={e => setDescription(e.target.value)}
                rows={6}
                required
              />
            </div>
            
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input 
                  id="category" 
                  value={category} 
                  onChange={e => setCategory(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select 
                  value={level} 
                  onValueChange={(val) => setLevel(val as 'beginner' | 'intermediate' | 'advanced')}
                >
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (hours)</Label>
                <Input 
                  id="duration" 
                  type="number" 
                  value={duration} 
                  onChange={e => setDuration(e.target.value)}
                  min="1"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capacity">Maximum capacity</Label>
              <Input 
                id="capacity" 
                type="number" 
                value={capacity} 
                onChange={e => setCapacity(e.target.value)}
                min="1"
                required
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end space-x-4">
          <Button 
            variant="outline" 
            type="button" 
            onClick={() => navigate('/dashboard/instructor')}
          >
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </DashboardLayout>
  );
}
