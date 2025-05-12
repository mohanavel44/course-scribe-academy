
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
import InstructorDashboard from "./pages/dashboard/instructor/InstructorDashboard";
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";

// Course Management Pages
import CourseEditPage from "./pages/dashboard/instructor/CourseEditPage";
import CourseManagePage from "./pages/dashboard/instructor/CourseManagePage";
import InstructorAnalyticsPage from "./pages/dashboard/instructor/InstructorAnalyticsPage";

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
            <Route path="/dashboard/instructor/courses/:courseId/edit" element={<CourseEditPage />} />
            <Route path="/dashboard/instructor/courses/:courseId/manage" element={<CourseManagePage />} />
            <Route path="/dashboard/instructor/analytics" element={<InstructorAnalyticsPage />} />
            
            {/* Admin Dashboard Routes */}
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
