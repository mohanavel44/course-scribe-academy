
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, Star, Clock } from 'lucide-react';
import { Course } from '@/models/types';
import { getAllCourses, getCoursesByCategory } from '@/services/courseService';

export default function HomePage() {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [popularCategories, setPopularCategories] = useState<string[]>([
    'Programming', 'Data Science', 'Design', 'Marketing'
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const courses = await getAllCourses();
        // Sort by rating and take top 3
        const featured = [...courses]
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
        setFeaturedCourses(featured);
      } catch (error) {
        console.error("Failed to load courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-course-blue-700 to-course-blue-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Discover, Learn, and Excel with CourseScribe
            </h1>
            <p className="text-xl mb-8">
              Find and book courses that match your interests and goals.
              Start your learning journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button size="lg" className="bg-white text-course-blue-600 hover:bg-gray-100">
                  Explore Courses
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-course-blue-600">
                  Register Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center mb-12">
            Featured Courses
          </h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course) => (
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
                      <div className="mt-auto pt-4 flex flex-wrap gap-y-2 text-sm text-gray-600">
                        <div className="flex items-center mr-4">
                          <Users className="w-4 h-4 mr-1 text-gray-500" />
                          {course.enrolledCount}/{course.capacity}
                        </div>
                        <div className="flex items-center mr-4">
                          <Clock className="w-4 h-4 mr-1 text-gray-500" />
                          {course.duration} hours
                        </div>
                        <div className="flex items-center ml-auto">
                          <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                          <span>{course.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
          
          <div className="mt-10 text-center">
            <Link to="/courses">
              <Button variant="outline">View All Courses</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center mb-12">
            Popular Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCategories.map((category, index) => (
              <Link to={`/courses?category=${category}`} key={index}>
                <Card className="hover:shadow-lg transition-all text-center">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{category}</h3>
                    <p className="text-gray-600 mb-4">
                      Explore {category.toLowerCase()} courses
                    </p>
                    <Button variant="ghost" className="text-course-blue-600 hover:text-course-blue-700">
                      Browse Courses
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center mb-12">
            Why Choose CourseScribe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-course-blue-100 text-course-blue-600">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Courses</h3>
              <p className="text-gray-600">
                Our courses are designed by industry experts to ensure you receive high-quality education.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-course-blue-100 text-course-blue-600">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Schedule</h3>
              <p className="text-gray-600">
                Choose courses that fit your schedule and learn at your own pace.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-course-blue-100 text-course-blue-600">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from industry professionals with years of experience in their fields.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-course-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students and expand your knowledge with our wide range of courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" className="bg-white text-course-blue-600 hover:bg-gray-100">
                Browse Courses
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-course-blue-700">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
