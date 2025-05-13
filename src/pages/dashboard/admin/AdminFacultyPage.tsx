
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';
import { mockUsers } from '@/context/AuthContext';
import { Search, Plus, MoreHorizontal, Mail, BookOpen, User } from 'lucide-react';

// Filter only instructors from mockUsers
const getInstructors = () => mockUsers.filter(user => user.role === "instructor");

export default function AdminFacultyPage() {
  const { toast } = useToast();
  const [instructors, setInstructors] = useState<any[]>([]);
  const [filteredInstructors, setFilteredInstructors] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentInstructor, setCurrentInstructor] = useState<any>(null);
  
  useEffect(() => {
    // Fetch instructors
    const fetchInstructors = async () => {
      try {
        // In a real app, this would be an API call
        const facultyList = getInstructors();
        setInstructors(facultyList);
        setFilteredInstructors(facultyList);
      } catch (error) {
        console.error("Failed to fetch instructors:", error);
        toast({
          title: "Error",
          description: "Failed to load faculty members",
          variant: "destructive"
        });
      }
    };
    
    fetchInstructors();
  }, [toast]);
  
  useEffect(() => {
    // Filter instructors based on search query
    if (searchQuery) {
      const filtered = instructors.filter(instructor => 
        instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        instructor.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredInstructors(filtered);
    } else {
      setFilteredInstructors(instructors);
    }
  }, [searchQuery, instructors]);
  
  const handleAddInstructor = (formData: any) => {
    // In a real app, this would be an API call to create a new instructor
    const newInstructor = {
      id: `${instructors.length + 10}`, // Just for mock data
      ...formData,
      role: "instructor"
    };
    
    setInstructors([...instructors, newInstructor]);
    setFilteredInstructors([...filteredInstructors, newInstructor]);
    
    toast({
      title: "Instructor Added",
      description: `${newInstructor.name} has been added to the faculty.`
    });
    setIsDialogOpen(false);
  };
  
  const handleEditInstructor = (instructor: any) => {
    setCurrentInstructor(instructor);
    setIsEditing(true);
    setIsDialogOpen(true);
  };
  
  const handleUpdateInstructor = (formData: any) => {
    // Update instructor in the list
    const updatedInstructors = instructors.map(instructor => 
      instructor.id === currentInstructor.id 
        ? { ...instructor, ...formData }
        : instructor
    );
    
    setInstructors(updatedInstructors);
    setFilteredInstructors(
      filteredInstructors.map(instructor => 
        instructor.id === currentInstructor.id 
          ? { ...instructor, ...formData }
          : instructor
      )
    );
    
    toast({
      title: "Instructor Updated",
      description: "The instructor information has been updated successfully."
    });
    setIsDialogOpen(false);
    setIsEditing(false);
    setCurrentInstructor(null);
  };
  
  const handleDeleteInstructor = (id: string) => {
    // Remove instructor from the list
    setInstructors(instructors.filter(instructor => instructor.id !== id));
    setFilteredInstructors(filteredInstructors.filter(instructor => instructor.id !== id));
    
    toast({
      title: "Instructor Removed",
      description: "The instructor has been removed from the faculty."
    });
  };
  
  const resetForm = () => {
    setIsEditing(false);
    setCurrentInstructor(null);
    setIsDialogOpen(false);
  };
  
  return (
    <DashboardLayout pageTitle="Faculty Management">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Faculty Members</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setIsEditing(false); setCurrentInstructor(null); }}>
                <Plus className="mr-2 h-4 w-4" /> Add Instructor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>{isEditing ? "Edit Instructor" : "Add New Instructor"}</DialogTitle>
                <DialogDescription>
                  {isEditing 
                    ? "Update the instructor's information."
                    : "Fill in the details to add a new instructor to the faculty."}
                </DialogDescription>
              </DialogHeader>
              
              <InstructorForm 
                onSubmit={isEditing ? handleUpdateInstructor : handleAddInstructor}
                onCancel={resetForm}
                initialData={currentInstructor}
              />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search instructors by name or email..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInstructors.length > 0 ? (
                  filteredInstructors.map((instructor) => (
                    <TableRow key={instructor.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-course-blue-100 mr-3 flex items-center justify-center">
                            <span className="text-sm font-semibold text-course-blue-600">
                              {instructor.name.charAt(0)}
                            </span>
                          </div>
                          {instructor.name}
                        </div>
                      </TableCell>
                      <TableCell>{instructor.email}</TableCell>
                      <TableCell>{instructor.phone || "N/A"}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <BookOpen className="h-3.5 w-3.5 mr-1" /> View Courses
                        </Button>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditInstructor(instructor)}>
                              <User className="mr-2 h-4 w-4" /> Edit Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" /> Send Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteInstructor(instructor.id)}
                            >
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      No instructors found matching your search.
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

// Instructor form component
function InstructorForm({ 
  onSubmit, 
  onCancel,
  initialData,
}: { 
  onSubmit: (data: any) => void;
  onCancel: () => void;
  initialData: any;
}) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    bio: initialData?.bio || '',
    specialization: initialData?.specialization || '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter full name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="specialization">Specialization</Label>
        <Input
          id="specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          placeholder="Enter specialization or field of expertise"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="bio">Biography</Label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Enter a brief biography"
          className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? 'Save Changes' : 'Add Instructor'}
        </Button>
      </DialogFooter>
    </form>
  );
}
