import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            About Us
          </h2>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            With over 15 years of experience in the real estate industry, Real Trust has built 
            lasting relationships with clients by providing exceptional service and expert guidance. 
            Our team of dedicated professionals is committed to understanding your unique needs and 
            delivering results that exceed expectations.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            We believe in transparency, integrity, and building long-term partnerships. Whether you're 
            buying, selling, or investing, we're here to guide you every step of the way with 
            personalized solutions tailored to your goals.
          </p>

          <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-primary hover:text-primary transition-colors font-medium">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
