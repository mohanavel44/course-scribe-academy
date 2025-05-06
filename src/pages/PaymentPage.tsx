
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { Course } from '@/models/types';
import { getCourseById } from '@/services/courseService';
import { CreditCard, Wallet, DollarSign } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface PaymentFormValues {
  paymentMethod: 'card' | 'gpay' | 'paypal';
  cardNumber?: string;
  cardName?: string;
  expiryDate?: string;
  cvv?: string;
}

export default function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  
  const form = useForm<PaymentFormValues>({
    defaultValues: {
      paymentMethod: 'card',
    },
  });
  
  // Get the course ID from the state passed from the enrollment page
  useEffect(() => {
    const fetchCourse = async () => {
      if (!state || !state.courseId) {
        toast({
          title: "Error",
          description: "Course information not found",
          variant: "destructive",
        });
        navigate('/courses');
        return;
      }
      
      try {
        const courseData = await getCourseById(state.courseId);
        if (!courseData) {
          throw new Error("Course not found");
        }
        setCourse(courseData);
      } catch (error) {
        console.error("Failed to load course:", error);
        toast({
          title: "Error",
          description: "Failed to load course information",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [state, toast, navigate]);
  
  const onSubmit = async (values: PaymentFormValues) => {
    if (!course || !user) return;
    
    setProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Normally this would call a payment API
      console.log("Processing payment:", values);
      
      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully",
      });
      
      // Redirect to success page with course info
      navigate('/payment-success', { 
        state: { 
          courseId: course.id,
          paymentMethod: values.paymentMethod,
          amount: course.price
        }
      });
    } catch (error) {
      console.error("Payment failed:", error);
      toast({
        title: "Payment Failed",
        description: "There was a problem processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!course) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Button onClick={() => navigate('/courses')}>Browse Courses</Button>
        </div>
      </MainLayout>
    );
  }
  
  const watchedPaymentMethod = form.watch('paymentMethod');
  
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Complete Your Payment</h1>
        <p className="text-gray-600 mb-6">
          You're enrolling in <span className="font-medium">{course.title}</span>
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Select your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Payment Method</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2 border rounded-md p-3">
                                <RadioGroupItem value="card" id="card" />
                                <Label htmlFor="card" className="flex items-center cursor-pointer">
                                  <CreditCard className="mr-2 h-5 w-5" />
                                  Credit/Debit Card
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2 border rounded-md p-3">
                                <RadioGroupItem value="gpay" id="gpay" />
                                <Label htmlFor="gpay" className="flex items-center cursor-pointer">
                                  <Wallet className="mr-2 h-5 w-5" />
                                  Google Pay
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2 border rounded-md p-3">
                                <RadioGroupItem value="paypal" id="paypal" />
                                <Label htmlFor="paypal" className="flex items-center cursor-pointer">
                                  <DollarSign className="mr-2 h-5 w-5" />
                                  PayPal
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {watchedPaymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <FormField
                            control={form.control}
                            name="cardName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cardholder Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="1234 5678 9012 3456" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="expiryDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Expiry Date</FormLabel>
                                  <FormControl>
                                    <Input placeholder="MM/YY" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="cvv"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>CVV</FormLabel>
                                  <FormControl>
                                    <Input placeholder="123" type="password" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {watchedPaymentMethod === 'gpay' && (
                      <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">You will be redirected to Google Pay after proceeding</p>
                        <img src="https://developers.google.com/static/pay/images/buttons/gpay_white.svg" alt="Google Pay" className="h-12 mx-auto" />
                      </div>
                    )}
                    
                    {watchedPaymentMethod === 'paypal' && (
                      <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">You will be redirected to PayPal after proceeding</p>
                        <div className="bg-[#0070ba] text-white py-2 px-4 rounded-md inline-flex items-center">
                          <span className="font-bold">Pay</span>
                          <span className="font-light">Pal</span>
                        </div>
                      </div>
                    )}
                    
                    <Button type="submit" className="w-full" disabled={processing}>
                      {processing ? "Processing..." : `Pay $${course.price.toFixed(2)}`}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Course</span>
                  <span className="font-medium">{course.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price</span>
                  <span className="font-medium">${course.price.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold">${course.price.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 text-sm text-gray-600">
                <p>Your payment information is encrypted and secure.</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
