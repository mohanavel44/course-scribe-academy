
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Define user roles
export type UserRole = "student" | "instructor" | "admin";

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  bio?: string;
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data (this would be replaced with actual backend authentication)
export const mockUsers = [
  {
    id: "1",
    email: "student@example.com",
    password: "password123",
    name: "Test Student",
    role: "student" as UserRole,
    phone: "555-123-4567",
    bio: "I am a student interested in learning new skills."
  },
  {
    id: "2",
    email: "instructor@example.com",
    password: "password123",
    name: "Test Instructor",
    role: "instructor" as UserRole,
    phone: "555-987-6543",
    bio: "Experienced instructor with 5+ years of teaching."
  },
  {
    id: "3",
    email: "admin@example.com",
    password: "password123",
    name: "Mohanavel",
    role: "admin" as UserRole,
    phone: "555-555-5555",
    bio: "System administrator responsible for platform management."
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  // Check for saved user in localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching credentials
      const foundUser = mockUsers.find(
        (u) => u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error("Invalid email or password");
      }
      
      // Create user object without password
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      
      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}!`,
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (mockUsers.some(user => user.email === email)) {
        throw new Error("Email already in use");
      }
      
      // Create new user (in a real app, this would be done on the server)
      const newUser = {
        id: `${mockUsers.length + 1}`,
        email,
        password,
        name,
        role,
        phone: "", // Adding default empty values to fix the TypeScript error
        bio: ""    // Adding default empty values to fix the TypeScript error
      };
      
      // Add to mock users (this would be done on the server in a real app)
      mockUsers.push(newUser);
      
      // Create user object without password
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      
      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Registration successful",
        description: `Welcome, ${name}!`,
      });
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
