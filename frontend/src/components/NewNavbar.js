import React from 'react';
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

const NewNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-primary">Real Trust</span>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Home
            </a>
            <a href="#services" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Services
            </a>
            <a href="#projects" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Projects
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-primary transition-colors font-medium">
              Testimonials
            </a>
          </div>
          
          {/* Contact Button */}
          <div className="flex items-center gap-4">
            <a 
              href="#contact" 
              className="bg-action text-white px-6 py-2.5 rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              Contact
            </a>
            <Link 
              to="/admin" 
              className="hidden lg:block text-primary hover:text-blue-700 transition-colors font-medium"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NewNavbar;
