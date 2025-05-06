
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Users, Star, Clock, Search, Filter, X } from 'lucide-react';
import { Course } from '@/models/types';
import { filterCourses, CourseFilterOptions } from '@/services/courseService';

export default function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200]);
  
  // Filter state
  const [filters, setFilters] = useState<CourseFilterOptions>({
    category: searchParams.get('category') || undefined,
    level: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    query: searchParams.get('query') || '',
  });
  
  // Categories
  const categories = ['Programming', 'Data Science', 'Design', 'Marketing'];
  
  // Load courses based on filters
  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      try {
        const filteredCourses = await filterCourses({
          ...filters,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
        });
        setCourses(filteredCourses);
      } catch (error) {
        console.error("Failed to load courses:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCourses();
  }, [filters, priceRange]);
  
  // Update URL search params when filters change
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    
    if (filters.category) {
      newSearchParams.set('category', filters.category);
    }
    
    if (filters.query) {
      newSearchParams.set('query', filters.query);
    }
    
    setSearchParams(newSearchParams);
  }, [filters, setSearchParams]);
  
  // Handle search input
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query') as string;
    setFilters({ ...filters, query });
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: undefined,
      level: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      query: '',
    });
    setPriceRange([0, 200]);
    setSearchParams({});
  };

  return (
    <MainLayout>
      {/* Courses Header */}
      <section className="bg-gradient-to-r from-course-blue-700 to-course-blue-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Our Courses
            </h1>
            <p className="text-lg max-w-2xl mx-auto">
              Browse through our selection of high-quality courses taught by expert instructors.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-4">
            <Button 
              variant="outline" 
              className="w-full flex justify-between items-center"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <span className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filter Courses
              </span>
              {filterOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <span className="text-xs bg-course-blue-100 text-course-blue-600 px-2 py-1 rounded-full">
                  {Object.values(filters).filter(Boolean).length} active
                </span>
              )}
            </Button>
          </div>
          
          {/* Sidebar Filters - Desktop always visible, mobile conditional */}
          <div className={`md:w-1/4 ${filterOpen ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={clearFilters}
                >
                  Clear all
                </Button>
              </div>
              
              <Separator className="my-4" />
              
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Category</h3>
                <RadioGroup 
                  value={filters.category || ''}
                  onValueChange={(value) => setFilters({ ...filters, category: value || undefined })}
                  className="space-y-2"
                >
                  {categories.map((category) => (
                    <div className="flex items-center space-x-2" key={category}>
                      <RadioGroupItem value={category} id={`category-${category}`} />
                      <Label htmlFor={`category-${category}`}>{category}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <Separator className="my-4" />
              
              {/* Level Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Level</h3>
                <RadioGroup 
                  value={filters.level || ''}
                  onValueChange={(value) => setFilters({ 
                    ...filters, 
                    level: (value as "beginner" | "intermediate" | "advanced" | undefined) || undefined 
                  })}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="level-beginner" />
                    <Label htmlFor="level-beginner">Beginner</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="level-intermediate" />
                    <Label htmlFor="level-intermediate">Intermediate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="level-advanced" />
                    <Label htmlFor="level-advanced">Advanced</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Separator className="my-4" />
              
              {/* Price Range Filter */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">Price Range</h3>
                  <span className="text-sm text-gray-500">
                    ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
                <Slider
                  defaultValue={priceRange}
                  max={200}
                  step={5}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="my-6"
                />
              </div>
            </div>
          </div>
          
          {/* Courses List Section */}
          <div className="md:w-3/4">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-6 flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  name="query"
                  placeholder="Search courses..."
                  value={filters.query || ''}
                  onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                  className="pl-9"
                />
              </div>
              <Button type="submit">Search</Button>
            </form>
            
            {/* Sort Controls */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {loading ? 'Loading courses...' : `Showing ${courses.length} courses`}
              </p>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Course Cards */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, index) => (
                  <Card key={index} className="course-card animate-pulse">
                    <div className="h-48 bg-gray-300"></div>
                    <CardContent className="p-6">
                      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <Link to={`/courses/${course.id}`} key={course.id}>
                    <Card className="course-card h-full flex flex-col">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-6 flex flex-col flex-grow">
                        <div className="mb-2 flex items-center text-sm text-course-blue-600 font-medium">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {course.category}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{course.shortDescription}</p>
                        <div className="mt-auto pt-4 border-t flex justify-between items-center">
                          <span className="text-xl font-bold text-gray-900">${course.price.toFixed(2)}</span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                            <span className="text-gray-700">{course.rating.toFixed(1)}</span>
                            <span className="text-gray-500 text-sm ml-1">({course.reviewCount})</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter criteria.
                </p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
