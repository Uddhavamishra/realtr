import React from 'react';

const IntroSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="relative">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Not Your Average<br />
              <span className="text-primary">Realtor</span>
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            {/* Decorative Dotted Grid Pattern */}
            <div className="absolute -left-8 bottom-0 w-24 h-24 grid grid-cols-6 gap-2 opacity-30">
              {[...Array(36)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              ))}
            </div>
          </div>

          {/* Right Side - Image Composition */}
          <div className="relative h-[500px]">
            {/* Large Center Circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full overflow-hidden shadow-2xl z-10">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=400&fit=crop"
                alt="Real Estate"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Top Right Small Circle */}
            <div className="absolute top-8 right-12 w-32 h-32 rounded-full overflow-hidden shadow-xl z-20 border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=200&h=200&fit=crop"
                alt="Modern Home"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom Right Small Circle */}
            <div className="absolute bottom-8 right-8 w-36 h-36 rounded-full overflow-hidden shadow-xl z-20 border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&h=200&fit=crop"
                alt="Interior Design"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Accent Dots */}
            <div className="absolute top-4 left-4 w-4 h-4 bg-primary rounded-full"></div>
            <div className="absolute top-12 left-16 w-3 h-3 bg-primary rounded-full"></div>
            <div className="absolute bottom-20 left-8 w-5 h-5 bg-action rounded-full"></div>
            <div className="absolute bottom-12 right-32 w-4 h-4 bg-action rounded-full"></div>
            <div className="absolute top-32 right-4 w-3 h-3 bg-primary rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
