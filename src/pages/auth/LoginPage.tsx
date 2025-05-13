
import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { LogIn, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const user = await login(email, password);
      toast({
        title: "Success",
        description: `Welcome back, ${user.name}!`
      });
      
      // Navigate based on user role
      switch(user.role) {
        case 'student':
          navigate('/dashboard/student');
          break;
        case 'instructor':
          navigate('/dashboard/instructor');
          break;
        case 'admin':
          navigate('/dashboard/admin');
          break;
        default:
          navigate('/');
      }
    } catch (error: any) {
      // Error is already handled in the auth context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto px-4 py-16">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link 
                    to="#" 
                    className="text-sm text-course-blue-600 hover:text-course-blue-800"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="text-sm text-gray-500">
                <p>Demo Accounts:</p>
                <ul className="mt-1">
                  <li><span className="font-medium">Student:</span> student@example.com / password123</li>
                  <li><span className="font-medium">Instructor:</span> instructor@example.com / password123</li>
                  <li><span className="font-medium">Admin:</span> admin@example.com / password123</li>
                </ul>
              </div>
            </CardContent>
            
            <CardFooter className="flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>
              
              <p className="text-center text-sm">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="text-course-blue-600 hover:text-course-blue-800 font-medium"
                >
                  Sign Up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
}
