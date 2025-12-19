import React from 'react';

const BottomCTA = () => {
  return (
    <section className="relative min-h-[500px] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&h=800&fit=crop"
          alt="Modern Living Room"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 max-w-4xl mx-auto leading-tight">
          Learn more about our listing process, as well as our additional staging and design work.
        </h2>
        
        <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default BottomCTA;
