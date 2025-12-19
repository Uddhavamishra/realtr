import React from 'react';

const CollageSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 opacity-50"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-50 rounded-full opacity-40 blur-3xl"></div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Image 1 - Tall */}
          <div className="row-span-2">
            <img 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=800&fit=crop"
              alt="Real estate consultation"
              className="w-full h-full object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Text Block */}
          <div className="bg-gray-50 p-8 rounded-2xl flex flex-col justify-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Professional Excellence
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We bring years of expertise in real estate consultation, design, and marketing 
              to help you achieve your property goals with confidence and success.
            </p>
          </div>

          {/* Image 2 */}
          <div>
            <img 
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=400&fit=crop"
              alt="Handshake"
              className="w-full h-64 object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Image 3 */}
          <div className="md:col-start-2">
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
              alt="Business meeting"
              className="w-full h-64 object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Image 4 */}
          <div>
            <img 
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop"
              alt="Team discussion"
              className="w-full h-64 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollageSection;
