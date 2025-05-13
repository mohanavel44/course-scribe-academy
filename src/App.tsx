
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import NotFound from "./pages/NotFound";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";

// Dashboard Pages
import StudentDashboard from "./pages/dashboard/student/StudentDashboard";
import StudentProfilePage from "./pages/dashboard/student/StudentProfilePage";
import StudentSettingsPage from "./pages/dashboard/student/StudentSettingsPage";
import StudentCoursesPage from "./pages/dashboard/student/StudentCoursesPage";
import StudentSchedulePage from "./pages/dashboard/student/StudentSchedulePage";

// Instructor Dashboard Pages
import InstructorDashboard from "./pages/dashboard/instructor/InstructorDashboard";
import InstructorProfilePage from "./pages/dashboard/admin/AdminProfilePage"; // Reusing admin profile for now
import InstructorSettingsPage from "./pages/dashboard/admin/AdminSettingsPage"; // Reusing admin settings for now
import InstructorSchedulePage from "./pages/dashboard/admin/AdminSchedulePage"; // Reusing admin schedule for now

// Course Management Pages
import CourseEditPage from "./pages/dashboard/instructor/CourseEditPage";
import CourseManagePage from "./pages/dashboard/instructor/CourseManagePage";
import InstructorAnalyticsPage from "./pages/dashboard/instructor/InstructorAnalyticsPage";

// Admin Dashboard Pages
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import AdminProfilePage from "./pages/dashboard/admin/AdminProfilePage";
import AdminSettingsPage from "./pages/dashboard/admin/AdminSettingsPage";
import AdminCoursesPage from "./pages/dashboard/admin/AdminCoursesPage";
import AdminSchedulePage from "./pages/dashboard/admin/AdminSchedulePage";
import AdminFacultyPage from "./pages/dashboard/admin/AdminFacultyPage";

// Context Providers
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId" element={<CourseDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            
            {/* Student Dashboard Routes */}
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            <Route path="/dashboard/student/profile" element={<StudentProfilePage />} />
            <Route path="/dashboard/student/settings" element={<StudentSettingsPage />} />
            <Route path="/dashboard/student/courses" element={<StudentCoursesPage />} />
            <Route path="/dashboard/student/schedule" element={<StudentSchedulePage />} />
            
            {/* Instructor Dashboard Routes */}
            <Route path="/dashboard/instructor" element={<InstructorDashboard />} />
            <Route path="/dashboard/instructor/profile" element={<InstructorProfilePage />} />
            <Route path="/dashboard/instructor/settings" element={<InstructorSettingsPage />} />
            <Route path="/dashboard/instructor/schedule" element={<InstructorSchedulePage />} />
            <Route path="/dashboard/instructor/courses/:courseId/edit" element={<CourseEditPage />} />
            <Route path="/dashboard/instructor/courses/:courseId/manage" element={<CourseManagePage />} />
            <Route path="/dashboard/instructor/analytics" element={<InstructorAnalyticsPage />} />
            
            {/* Admin Dashboard Routes */}
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/admin/profile" element={<AdminProfilePage />} />
            <Route path="/dashboard/admin/settings" element={<AdminSettingsPage />} />
            <Route path="/dashboard/admin/courses" element={<AdminCoursesPage />} />
            <Route path="/dashboard/admin/faculty" element={<AdminFacultyPage />} />
            <Route path="/dashboard/admin/schedule" element={<AdminSchedulePage />} />
            <Route path="/dashboard/admin/analytics" element={<InstructorAnalyticsPage />} /> {/* Reusing instructor analytics */}
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
