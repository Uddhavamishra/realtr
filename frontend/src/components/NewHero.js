import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { contactsAPI } from '../services/api';

const NewHero = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    serviceType: '',
    details: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email) {
      toast.error('Please fill in required fields');
      return;
    }

    setLoading(true);
    try {
      await contactsAPI.create({
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.serviceType || 'N/A',
        city: formData.details || 'N/A'
      });
      toast.success('Thank you! We will contact you soon.');
      setFormData({
        fullName: '',
        email: '',
        serviceType: '',
        details: ''
      });
    } catch (error) {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop"
          alt="Consultation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Hero Text */}
          <div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Consultation,<br />
              Design, &<br />
              Marketing
            </h1>
          </div>

          {/* Right Side - Floating Form */}
          <div id="contact" className="lg:absolute lg:right-20 lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-96">
            <div className="bg-blue-900/50 backdrop-blur-md p-8 rounded-2xl shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Get a Free Consultation</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Your Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/90 border-0 focus:outline-none focus:ring-2 focus:ring-action"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/90 border-0 focus:outline-none focus:ring-2 focus:ring-action"
                    required
                  />
                </div>

                <div>
                  <textarea
                    name="serviceType"
                    placeholder="Mobile Number"
                    value={formData.serviceType}
                    onChange={handleChange}
                    rows="1"
                    className="w-full px-4 py-3 rounded-lg bg-white/90 border-0 focus:outline-none focus:ring-2 focus:ring-action resize-none"
                  ></textarea>
                </div>

                <div>
                  <textarea
                    name="details"
                    placeholder="Area, City"
                    value={formData.details}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg bg-white/90 border-0 focus:outline-none focus:ring-2 focus:ring-action resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-action text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Get Quick Quote'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHero;
