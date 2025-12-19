import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { toast } from 'react-toastify';
import { newsletterAPI } from '../services/api';

const NewFooter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      await newsletterAPI.subscribe(email);
      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
    } catch (error) {
      if (error.response?.data?.message === 'Email already subscribed') {
        toast.info('This email is already subscribed');
      } else {
        toast.error('Failed to subscribe. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#1E40AF] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-blue-700">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Left Side - Navigation Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              <a href="#home" className="text-white font-medium hover:text-blue-200 transition-colors" style={{ textDecoration: 'none' }}>
                Home
              </a>
              <a href="#services" className="text-white font-medium hover:text-blue-200 transition-colors" style={{ textDecoration: 'none' }}>
                Services
              </a>
              <a href="#projects" className="text-white font-medium hover:text-blue-200 transition-colors" style={{ textDecoration: 'none' }}>
                Projects
              </a>
              <a href="#testimonials" className="text-white font-medium hover:text-blue-200 transition-colors" style={{ textDecoration: 'none' }}>
                Testimonials
              </a>
              <a href="#contact" className="text-white font-medium hover:text-blue-200 transition-colors" style={{ textDecoration: 'none' }}>
                Contact
              </a>
            </div>

            {/* Right Side - Subscription Area */}
            <div className="flex items-center md:items-end gap-3">
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <span className="text-white font-medium">Subscribe Us</span>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 bg-transparent border border-white text-white placeholder-white rounded focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-white text-[#1E40AF] px-6 py-2 rounded font-medium hover:bg-blue-50 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-black">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Real Trust. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NewFooter;
