
import { Link } from "react-router-dom";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-12 pb-8 px-4 md:px-6 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-course-blue-600" />
              <span className="ml-2 font-poppins text-xl font-bold text-gray-900 dark:text-white">
                CourseScribe
              </span>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
              An online platform for course registration and management.
              Find, book, and attend courses that match your interests and goals.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-course-blue-500 hover:text-course-blue-600">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-course-blue-500 hover:text-course-blue-600">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-course-blue-500 hover:text-course-blue-600">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="font-poppins text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-course-blue-500 dark:text-gray-400 dark:hover:text-course-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-600 hover:text-course-blue-500 dark:text-gray-400 dark:hover:text-course-blue-400">
                  Explore Courses
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-course-blue-500 dark:text-gray-400 dark:hover:text-course-blue-400">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-course-blue-500 dark:text-gray-400 dark:hover:text-course-blue-400">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="col-span-1">
            <h3 className="font-poppins text-lg font-semibold text-gray-800 dark:text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-course-blue-500 dark:text-gray-400 dark:hover:text-course-blue-400">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-course-blue-500 dark:text-gray-400 dark:hover:text-course-blue-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-course-blue-500 dark:text-gray-400 dark:hover:text-course-blue-400">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-course-blue-500 dark:text-gray-400 dark:hover:text-course-blue-400">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="font-poppins text-lg font-semibold text-gray-800 dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-course-blue-500 mr-2 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">
                  123 Education Street, Learning City, 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-course-blue-500 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  (555) 123-4567
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-course-blue-500 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  support@coursescribe.com
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            &copy; {currentYear} CourseScribe Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
