
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
  Users,
  BarChart2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
  sidebarOpen: boolean;
}

export default function DashboardSidebar({ sidebarOpen }: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
          name: "Faculty",
          href: "/dashboard/admin/faculty",
          icon: Users
        },
        {
          name: "Schedule",
          href: "/dashboard/admin/schedule",
          icon: Calendar
        },
        {
          name: "Analytics",
          href: "/dashboard/admin/analytics",
          icon: BarChart2
        }
      ];
    }
    
    return baseLinks;
  };

  const navLinks = getNavLinks();

  return (
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
                      // This will be handled by the parent component
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
  );
}
