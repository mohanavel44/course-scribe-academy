
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Menu, X, User, LogOut, BookOpen, Home } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Determine dashboard URL based on user role
  const getDashboardUrl = () => {
    if (!user) return "/login";
    
    switch (user.role) {
      case "student":
        return "/dashboard/student";
      case "instructor":
        return "/dashboard/instructor";
      case "admin":
        return "/dashboard/admin";
      default:
        return "/dashboard/student";
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <BookOpen className="h-8 w-8 text-course-blue-600" />
                <span className="ml-2 font-poppins text-xl font-bold text-gray-900 dark:text-white">
                  OCRS
                </span>
              </Link>
            </div>
            
            {/* Desktop Navigation Links */}
            <div className="hidden sm:ml-10 sm:flex sm:items-center sm:space-x-8">
              <Link 
                to="/" 
                className="font-medium text-gray-600 hover:text-course-blue-600 px-3 py-2 rounded-md text-sm dark:text-gray-200 dark:hover:text-course-blue-400"
              >
                Home
              </Link>
              <Link 
                to="/courses" 
                className="font-medium text-gray-600 hover:text-course-blue-600 px-3 py-2 rounded-md text-sm dark:text-gray-200 dark:hover:text-course-blue-400"
              >
                Courses
              </Link>
            </div>
          </div>
          
          {/* Desktop Authentication Buttons */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={getDashboardUrl()} className="w-full cursor-pointer">
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => logout()} className="text-red-500 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-course-blue-500 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="pt-2 pb-4 space-y-1">
            <Link 
              to="/" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <Home className="mr-3 h-5 w-5" />
                Home
              </div>
            </Link>
            <Link 
              to="/courses" 
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <BookOpen className="mr-3 h-5 w-5" />
                Courses
              </div>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to={getDashboardUrl()} 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <User className="mr-3 h-5 w-5" />
                    Dashboard
                  </div>
                </Link>
                <button
                  className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-800 hover:bg-gray-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-gray-700"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  <div className="flex items-center">
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                  </div>
                </button>
              </>
            ) : (
              <div className="px-3 py-3 flex flex-col space-y-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
