import React, { useEffect, useState } from "react";

const HeroSection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  
  // Control the appearance of elements with CSS animations
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] bg-gradient-to-r from-gray-50 to-white overflow-hidden">
      {/* Background decorative elements - Updated with red and black theme */}
      <div 
        className={`absolute top-20 right-10 w-96 h-96 rounded-full bg-red-100 opacity-0 ${visible ? 'animate-fadeIn opacity-30' : ''}`}
        style={{ animationDelay: '0.2s' }}
      />
      <div 
        className={`absolute -bottom-20 left-10 w-80 h-80 rounded-full bg-gray-200 opacity-0 ${visible ? 'animate-fadeIn opacity-30' : ''}`}
        style={{ animationDelay: '0.4s' }}
      />
      
      {/* Added more medical-themed decorative elements */}
      <div 
        className={`absolute top-40 left-[25%] w-32 h-32 rounded-full bg-red-50 opacity-0 ${visible ? 'animate-fadeIn opacity-50' : ''}`}
        style={{ animationDelay: '0.5s' }}
      />
      <div 
        className={`absolute bottom-40 right-[15%] w-48 h-48 rounded-full bg-red-50 opacity-0 ${visible ? 'animate-fadeIn opacity-40' : ''}`}
        style={{ animationDelay: '0.7s' }}
      />
      
      {/* Medical cross symbol */}
      <div 
        className={`absolute top-32 right-[30%] opacity-0 ${visible ? 'animate-fadeIn opacity-20' : ''}`}
        style={{ animationDelay: '0.6s' }}
      >
        <div className="w-16 h-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-16 bg-red-500 rounded"></div>
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-16 h-4 bg-red-500 rounded"></div>
        </div>
      </div>
      
      {/* Medical heartbeat line - Updated with more faded opacity */}
      <div 
        className={`absolute bottom-24 right-[25%] opacity-0 ${visible ? 'animate-slideInLeft opacity-15' : ''}`} 
        style={{ animationDelay: '1s' }}
      >
        <svg width="200" height="40" viewBox="0 0 200 40">
          <path
            d="M0,20 L20,20 L25,10 L35,30 L45,10 L55,30 L60,20 L80,20 L85,5 L95,35 L105,15 L115,25 L120,20 L200,20"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
          />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Left side - Text content */}
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight opacity-0 ${visible ? 'animate-slideUp' : ''}`}
            style={{ animationDelay: '0.3s' }}
          >
            Welcome to HMS – <span className="text-red-500">Safe. Trusted. Caring.</span>
          </h1>
          
          <p 
            className={`text-lg text-gray-700 mb-8 max-w-lg opacity-0 ${visible ? 'animate-slideUp' : ''}`}
            style={{ animationDelay: '0.5s' }}
          >
            Your health is our priority. Our dedicated team of medical professionals 
            provides exceptional care in a comfortable and compassionate environment.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              className={`px-8 py-3 bg-red-500 text-white rounded-lg shadow-lg transition-all duration-300 hover:bg-red-600 hover:scale-105 transform-gpu opacity-0 ${visible ? 'animate-scaleIn' : ''}`}
              style={{ animationDelay: '0.8s' }}
            >
              Book Appointment
            </button>
            
            <button 
              className={`px-8 py-3 border-2 border-red-500 text-red-500 rounded-lg transition-all duration-300 hover:bg-black hover:text-white hover:border-black hover:scale-105 transform-gpu opacity-0 ${visible ? 'animate-scaleIn' : ''}`}
              style={{ animationDelay: '1s' }}
            >
              Learn More
            </button>
          </div>
          
          <div 
            className={`flex items-center mt-12 space-x-8 opacity-0 ${visible ? 'animate-slideUp' : ''}`}
            style={{ animationDelay: '1.2s' }}
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-red-500">24/7</span>
              <span className="text-sm text-gray-700">Emergency Care</span>
            </div>
            
            <div className="h-10 w-px bg-gray-300"></div>
            
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-red-500">100+</span>
              <span className="text-sm text-gray-700">Specialists</span>
            </div>
            
            <div className="h-10 w-px bg-gray-300"></div>
            
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-red-500">50K+</span>
              <span className="text-sm text-gray-700">Happy Patients</span>
            </div>
          </div>
        </div>
        
        {/* Right side - Image and medical elements */}
        <div 
          className={`md:w-1/2 flex justify-center opacity-0 ${visible ? 'animate-scaleIn' : ''}`}
          style={{ animationDelay: '0.7s' }}
        >
          <div className="relative">
            {/* Main image */}
            <img 
              src="/hospital-hero.jpg" 
              alt="Hospital Care" 
              className="rounded-lg shadow-xl max-w-full h-auto md:max-h-[500px] object-cover"
            />
            
            {/* Added more detailed medical elements */}
            <div
              className={`absolute -top-5 -left-5 bg-white p-4 rounded-lg shadow-lg translate-x-[-20px] opacity-0 ${visible ? 'animate-slideInLeft' : ''}`}
              style={{ animationDelay: '1.1s' }}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="ml-2 text-sm font-medium">Patient Satisfaction</span>
              </div>
            </div>
            
            <div
              className={`absolute -bottom-5 -right-5 bg-white p-4 rounded-lg shadow-lg translate-x-[20px] opacity-0 ${visible ? 'animate-slideInRight' : ''}`}
              style={{ animationDelay: '1.3s' }}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="ml-2 text-sm font-medium">Quick Appointments</span>
              </div>
            </div>
            
            {/* Added medical icon */}
            <div
              className={`absolute top-1/2 -right-12 transform -translate-y-1/2 bg-white p-4 rounded-full shadow-lg opacity-0 ${visible ? 'animate-slideInRight' : ''}`}
              style={{ animationDelay: '1.5s' }}
            >
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-8 bg-red-500 rounded"></div>
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-8 h-2 bg-red-500 rounded"></div>
                </div>
              </div>
            </div>
            
            {/* Added pulse animation circle */}
            <div
              className={`absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 ${visible ? 'animate-scaleIn' : ''}`}
              style={{ animationDelay: '1.7s' }}
            >
              <div className="w-16 h-16 border-4 border-red-500 rounded-full animate-ping opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
      
      
      {/* Wavy separator at the bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,42.7C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
