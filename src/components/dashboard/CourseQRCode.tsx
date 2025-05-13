
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface CourseQRCodeProps {
  courseId: string;
  courseName: string;
}

const CourseQRCode: React.FC<CourseQRCodeProps> = ({ courseId, courseName }) => {
  // This is a simple placeholder for a QR code
  // In a real app, you'd use a library like qrcode.react
  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center">
        <div className="w-48 h-48 bg-white border border-gray-200 mb-4 relative overflow-hidden">
          {/* Simple QR code visualization */}
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-5">
            {Array.from({ length: 25 }).map((_, index) => (
              <div 
                key={index} 
                className={`border ${Math.random() > 0.7 ? 'bg-black' : 'bg-white'}`}
              />
            ))}
          </div>
          {/* Corner squares for QR code */}
          <div className="absolute top-1 left-1 w-8 h-8 border-4 border-black bg-white"></div>
          <div className="absolute top-1 right-1 w-8 h-8 border-4 border-black bg-white"></div>
          <div className="absolute bottom-1 left-1 w-8 h-8 border-4 border-black bg-white"></div>
        </div>
        <p className="text-sm text-gray-500 text-center">Scan to view course details</p>
        <p className="font-medium text-center mt-1">{courseName}</p>
        <p className="text-xs text-gray-400 text-center">Course ID: {courseId}</p>
      </CardContent>
    </Card>
  );
};

export default CourseQRCode;
