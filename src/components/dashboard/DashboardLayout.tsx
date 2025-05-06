
import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BookOpen, 
  Home, 
  Calendar, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X 
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  pageTitle: string;
}

export default function DashboardLayout({ children, pageTitle }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Close sidebar on navigate on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    
    // Set initial state based on screen size
    handleResize();
    
    // Listen for window resize events
    window.addEventListener('resize', handleResize);
    
    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Get navigation links based on user role
  const getNavLinks = () => {
    const baseLinks = [
      {
        name: "Dashboard",
        href: `/dashboard/${user?.role}`,
        icon: Home
      },
      {
        name: "Profile",
        href: `/dashboard/${user?.role}/profile`,
        icon: User
      },
      {
        name: "Settings",
        href: `/dashboard/${user?.role}/settings`,
        icon: Settings
      }
    ];
    
    if (user?.role === "student") {
      return [
        ...baseLinks,
        {
          name: "My Courses",
          href: "/dashboard/student/courses",
          icon: BookOpen
        },
        {
          name: "Schedule",
          href: "/dashboard/student/schedule",
          icon: Calendar
        }
      ];
    }
    
    if (user?.role === "instructor") {
      return [
        ...baseLinks,
        {
          name: "My Courses",
          href: "/dashboard/instructor/courses",
          icon: BookOpen
        },
        {
          name: "Schedule",
          href: "/dashboard/instructor/schedule",
          icon: Calendar
        }
      ];
    }
    
    if (user?.role === "admin") {
      return [
        ...baseLinks,
        {
          name: "Manage Courses",
          href: "/dashboard/admin/courses",
          icon: BookOpen
        },
        {
          name: "Users",
          href: "/dashboard/admin/users",
          icon: User
        }
      ];
    }
    
    return baseLinks;
  };

  const navLinks = getNavLinks();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Dashboard Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="flex items-center">
                  <BookOpen className="h-8 w-8 text-course-blue-600" />
                  <span className="ml-2 font-poppins text-xl font-bold text-gray-900 dark:text-white">
                    CourseScribe
                  </span>
                </Link>
              </div>
            </div>
            
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-course-blue-500"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <span className="sr-only">Open sidebar</span>
                {sidebarOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
              
              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                <Link to="/courses">
                  <Button variant="ghost">Browse Courses</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside 
          className={`
            ${sidebarOpen ? 'block' : 'hidden'} 
            md:block w-full md:w-64 bg-white dark:bg-gray-800 border-r
          `}
        >
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="p-4">
              {/* User Profile Section */}
              <Card className="mb-6">
                <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-course-blue-100 flex items-center justify-center">
                    <span className="text-2xl font-semibold text-course-blue-600">
                      {user?.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{user?.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Navigation Links */}
              <nav className="space-y-1">
                {navLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <Link 
                      key={index}
                      to={link.href}
                      className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-course-blue-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                      onClick={() => {
                        if (window.innerWidth < 768) {
                          setSidebarOpen(false);
                        }
                      }}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
              
              <Separator className="my-4" />
              
              {/* Logout Button */}
              <Button 
                variant="ghost" 
                className="w-full flex items-center justify-start text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900 dark:hover:bg-opacity-20"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
            </div>
            
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
