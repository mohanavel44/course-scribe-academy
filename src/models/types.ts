
// User types
export type UserRole = "student" | "instructor" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
}

// Course types
export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  price: number;
  duration: number; // in hours
  capacity: number;
  enrolledCount: number;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  schedule: {
    startDate: string;
    endDate: string;
    days: string[];
    timeStart: string;
    timeEnd: string;
  };
  instructor: {
    id: string;
    name: string;
    avatar?: string;
  };
  tags: string[];
  rating: number;
  reviewCount: number;
}

// Enrollment types
export type EnrollmentStatus = "confirmed" | "waitlisted" | "cancelled";

export interface Enrollment {
  id: string;
  courseId: string;
  userId: string;
  status: EnrollmentStatus;
  enrolledAt: string;
  updatedAt: string;
}
