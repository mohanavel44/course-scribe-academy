
import { mockCourses, mockEnrollments } from "../data/mockData";
import { Course, Enrollment, EnrollmentStatus } from "../models/types";

// Get all courses
export const getAllCourses = (): Promise<Course[]> => {
  return Promise.resolve(mockCourses);
};

// Get a specific course by ID
export const getCourseById = (courseId: string): Promise<Course | null> => {
  const course = mockCourses.find(course => course.id === courseId);
  return Promise.resolve(course || null);
};

// Get courses by category
export const getCoursesByCategory = (category: string): Promise<Course[]> => {
  const filteredCourses = mockCourses.filter(course => course.category === category);
  return Promise.resolve(filteredCourses);
};

// Search courses by title or description
export const searchCourses = (query: string): Promise<Course[]> => {
  query = query.toLowerCase();
  const filteredCourses = mockCourses.filter(course => 
    course.title.toLowerCase().includes(query) || 
    course.description.toLowerCase().includes(query)
  );
  return Promise.resolve(filteredCourses);
};

// Filter courses by multiple criteria
export interface CourseFilterOptions {
  category?: string;
  level?: "beginner" | "intermediate" | "advanced";
  minPrice?: number;
  maxPrice?: number;
  query?: string;
}

export const filterCourses = (options: CourseFilterOptions): Promise<Course[]> => {
  let filtered = [...mockCourses];
  
  if (options.category) {
    filtered = filtered.filter(course => course.category === options.category);
  }
  
  if (options.level) {
    filtered = filtered.filter(course => course.level === options.level);
  }
  
  if (options.minPrice !== undefined) {
    filtered = filtered.filter(course => course.price >= options.minPrice);
  }
  
  if (options.maxPrice !== undefined) {
    filtered = filtered.filter(course => course.price <= options.maxPrice);
  }
  
  if (options.query) {
    const query = options.query.toLowerCase();
    filtered = filtered.filter(course => 
      course.title.toLowerCase().includes(query) || 
      course.description.toLowerCase().includes(query)
    );
  }
  
  return Promise.resolve(filtered);
};

// Get user's enrollments
export const getUserEnrollments = (userId: string): Promise<Enrollment[]> => {
  const userEnrollments = mockEnrollments.filter(enrollment => enrollment.userId === userId);
  return Promise.resolve(userEnrollments);
};

// Get enrolled courses for a user
export const getUserEnrolledCourses = async (userId: string): Promise<Course[]> => {
  const enrollments = await getUserEnrollments(userId);
  const confirmedEnrollments = enrollments.filter(
    enrollment => enrollment.status === "confirmed"
  );
  
  const enrolledCourses = await Promise.all(
    confirmedEnrollments.map(async enrollment => {
      const course = await getCourseById(enrollment.courseId);
      return course;
    })
  );
  
  // Filter out null courses
  return enrolledCourses.filter((course): course is Course => course !== null);
};

// Enroll user in a course
export const enrollInCourse = (userId: string, courseId: string): Promise<Enrollment> => {
  // Check if course exists
  const course = mockCourses.find(c => c.id === courseId);
  if (!course) {
    return Promise.reject(new Error("Course not found"));
  }
  
  // Check if user is already enrolled
  const existingEnrollment = mockEnrollments.find(
    e => e.courseId === courseId && e.userId === userId
  );
  
  if (existingEnrollment) {
    return Promise.reject(new Error("You are already enrolled in this course"));
  }
  
  // Check if course is full
  const status: EnrollmentStatus = 
    course.enrolledCount < course.capacity ? "confirmed" : "waitlisted";
  
  // Create new enrollment
  const newEnrollment: Enrollment = {
    id: `${mockEnrollments.length + 1}`,
    courseId,
    userId,
    status,
    enrolledAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // In a real app, this would update the database
  mockEnrollments.push(newEnrollment);
  
  // Update course enrollment count if confirmed
  if (status === "confirmed") {
    course.enrolledCount += 1;
  }
  
  return Promise.resolve(newEnrollment);
};

// Cancel enrollment
export const cancelEnrollment = (userId: string, courseId: string): Promise<boolean> => {
  const enrollmentIndex = mockEnrollments.findIndex(
    e => e.courseId === courseId && e.userId === userId
  );
  
  if (enrollmentIndex === -1) {
    return Promise.reject(new Error("Enrollment not found"));
  }
  
  const enrollment = mockEnrollments[enrollmentIndex];
  
  // Update enrollment status
  enrollment.status = "cancelled";
  enrollment.updatedAt = new Date().toISOString();
  
  // If was confirmed, decrease the enrolled count
  if (enrollment.status === "confirmed" as EnrollmentStatus) {
    const course = mockCourses.find(c => c.id === courseId);
    if (course && course.enrolledCount > 0) {
      course.enrolledCount -= 1;
    }
  }
  
  return Promise.resolve(true);
};
