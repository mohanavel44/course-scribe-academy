
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Message, Course } from '@/models/types';
import { sendMessage, getMessages } from '@/services/messageService';
import { useToast } from '@/components/ui/use-toast';
import { Send, User } from 'lucide-react';

interface ChatInterfaceProps {
  course: Course;
}

export default function ChatInterface({ course }: ChatInterfaceProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!user || !course) return;
    
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const fetchedMessages = await getMessages(course.id, user.id);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMessages();
    
    // Set up periodic polling for new messages
    const interval = setInterval(fetchMessages, 10000); // Poll every 10 seconds
    
    return () => clearInterval(interval);
  }, [user, course]);
  
  useEffect(() => {
    // Scroll to bottom when new messages are loaded
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user || !course) return;
    
    try {
      const messageData = {
        senderId: user.id,
        recipientId: course.instructor.id,
        courseId: course.id,
        content: newMessage,
      };
      
      // Add optimistic message first
      const optimisticMessage: Message = {
        id: `temp-${Date.now()}`,
        ...messageData,
        timestamp: new Date().toISOString(),
        read: false,
      };
      
      setMessages(prevMessages => [...prevMessages, optimisticMessage]);
      setNewMessage('');
      
      // Send message to service
      await sendMessage(messageData);
      
      toast({
        title: "Message sent",
        description: "Your instructor will be notified.",
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <Card className="flex flex-col h-[500px]">
      <CardHeader className="bg-gray-50 py-3">
        <CardTitle className="text-lg flex items-center">
          <User className="h-5 w-5 mr-2" />
          Chat with {course.instructor.name}
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-0 flex-1 flex flex-col">
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          {loading && messages.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500">Loading messages...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-gray-500 mb-2">No messages yet</p>
              <p className="text-sm text-gray-400">Send a message to start the conversation</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => {
                const isCurrentUser = message.senderId === user?.id;
                return (
                  <div 
                    key={message.id}
                    className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[75%] rounded-lg p-3 ${
                        isCurrentUser 
                          ? 'bg-course-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p>{message.content}</p>
                      <div 
                        className={`text-xs mt-1 ${
                          isCurrentUser ? 'text-course-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {formatTimestamp(message.timestamp)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex">
            <Textarea 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 resize-none"
              rows={2}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button 
              onClick={handleSendMessage} 
              size="icon" 
              className="ml-2 h-auto" 
              disabled={!newMessage.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
