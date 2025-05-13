
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const NotFound = () => {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Determine dashboard URL based on user role
  const getDashboardUrl = () => {
    if (!user) return "/";
    
    switch (user.role) {
      case "student":
        return "/dashboard/student";
      case "instructor":
        return "/dashboard/instructor";
      case "admin":
        return "/dashboard/admin";
      default:
        return "/";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-6xl font-bold text-gray-800 mb-6">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default">
            <Link to={getDashboardUrl()}>
              Back to Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">
              Go to Home Page
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
