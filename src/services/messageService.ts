
import { Message } from '@/models/types';

// Mock data for messages
const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1', // Student
    recipientId: '2', // Instructor
    courseId: '1',
    content: 'Hello, I have a question about the assignment from week 3.',
    timestamp: '2025-05-12T10:15:00Z',
    read: true,
  },
  {
    id: '2',
    senderId: '2', // Instructor
    recipientId: '1', // Student
    courseId: '1',
    content: 'Hi there! Sure, what would you like to know?',
    timestamp: '2025-05-12T10:18:00Z',
    read: true,
  },
];

// Get all messages for a specific course and user
export const getMessages = async (courseId: string, userId: string): Promise<Message[]> => {
  // In a real app, this would be an API call
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return messages where the user is either sender or recipient
  return mockMessages.filter(
    message => 
      message.courseId === courseId && 
      (message.senderId === userId || message.recipientId === userId)
  );
};

// Send a new message
export const sendMessage = async ({
  senderId,
  recipientId,
  courseId,
  content
}: {
  senderId: string;
  recipientId: string;
  courseId: string;
  content: string;
}): Promise<Message> => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Create a new message
  const newMessage: Message = {
    id: `msg-${Date.now()}`,
    senderId,
    recipientId,
    courseId,
    content,
    timestamp: new Date().toISOString(),
    read: false,
  };
  
  // Add to mock data (in real app this would be saved to database)
  mockMessages.push(newMessage);
  
  // Simulate sending email notification to instructor
  if (recipientId !== senderId) {
    console.log(`Email notification sent to instructor ${recipientId} for message from student ${senderId}`);
    sendEmailNotification(newMessage);
  }
  
  return newMessage;
};

// Get unread message count
export const getUnreadCount = async (userId: string): Promise<number> => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return mockMessages.filter(message => message.recipientId === userId && !message.read).length;
};

// Mark message as read
export const markAsRead = async (messageId: string): Promise<void> => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const messageIndex = mockMessages.findIndex(message => message.id === messageId);
  if (messageIndex !== -1) {
    mockMessages[messageIndex].read = true;
  }
};

// Mock function for sending email notifications
const sendEmailNotification = (message: Message) => {
  // In a real app, this would call a backend API to send an email
  console.log('Email notification sent:', {
    to: `instructor-${message.recipientId}@example.com`,
    subject: 'New message from student',
    body: `You have a new message from a student in your course. Message: "${message.content.substring(0, 50)}${message.content.length > 50 ? '...' : ''}"`,
  });
  
  // Return a promise to simulate async operation
  return Promise.resolve();
};

// Get all course threads for an instructor
export const getInstructorThreads = async (instructorId: string): Promise<Message[]> => {
  // Group messages by course and student, get the latest message from each thread
  const threads = new Map();
  
  mockMessages.forEach(message => {
    if (message.recipientId === instructorId || message.senderId === instructorId) {
      const otherPersonId = message.senderId === instructorId ? message.recipientId : message.senderId;
      const threadKey = `${message.courseId}-${otherPersonId}`;
      
      if (!threads.has(threadKey) || new Date(threads.get(threadKey).timestamp) < new Date(message.timestamp)) {
        threads.set(threadKey, message);
      }
    }
  });
  
  return Array.from(threads.values());
};
