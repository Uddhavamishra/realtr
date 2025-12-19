import React, { useState, useEffect } from 'react';
import { clientsAPI } from '../services/api';

const TestimonialsSection = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await clientsAPI.getAll();
      setClients(response.data.slice(0, 5)); // Limit to 5 testimonials
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  // Default testimonials if none exist
  const defaultTestimonials = [
    {
      _id: '1',
      name: 'Sarah Johnson',
      designation: 'Home Owner',
      description: 'Working with Real Trust was an absolute pleasure. Their attention to detail and commitment to finding the perfect property exceeded all my expectations.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
    },
    {
      _id: '2',
      name: 'Michael Chen',
      designation: 'Property Investor',
      description: 'Professional, knowledgeable, and always available. Real Trust helped me build a successful real estate portfolio with their expert guidance.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
    },
    {
      _id: '3',
      name: 'Emily Rodriguez',
      designation: 'First-Time Buyer',
      description: 'As a first-time buyer, I was nervous about the process. The team at Real Trust made everything smooth and stress-free. Highly recommended!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
    },
    {
      _id: '4',
      name: 'David Thompson',
      designation: 'Commercial Developer',
      description: 'Their market knowledge and strategic approach helped me secure prime commercial properties at competitive prices. True professionals.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
    },
    {
      _id: '5',
      name: 'Lisa Anderson',
      designation: 'Real Estate Agent',
      description: 'I have worked with many agencies, but Real Trust stands out for their integrity, expertise, and dedication to client satisfaction.',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop'
    }
  ];

  const displayClients = clients.length > 0 ? clients : defaultTestimonials;

  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Happy Clients
          </h2>
        </div>

        {/* Testimonials Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading testimonials...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {displayClients.map((client) => (
              <div 
                key={client._id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Avatar */}
                <div className="flex justify-center mb-4">
                  <img 
                    src={client.image.startsWith('http') ? client.image : `${process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000'}${client.image}`}
                    alt={client.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                  />
                </div>

                {/* Quote */}
                <p className="text-gray-600 text-sm italic mb-4 text-center line-clamp-4">
                  "{client.description}"
                </p>

                {/* Name and Role */}
                <div className="text-center">
                  <h4 className="text-primary font-bold text-lg">
                    {client.name}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {client.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
