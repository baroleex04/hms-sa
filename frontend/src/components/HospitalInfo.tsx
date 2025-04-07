import React, { useState, useEffect, useRef } from "react";

const HospitalInfo: React.FC = () => {
  // Create separate visibility states for different sections
  const [headerVisible, setHeaderVisible] = useState(false);
  const [missionVisible, setMissionVisible] = useState(false);
  const [valuesVisible, setValuesVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  
  // Create refs for each section
  const headerRef = useRef<HTMLHeadingElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create intersection observers for each element
    const createObserver = (
      ref: React.RefObject<HTMLElement>,
      setVisibility: React.Dispatch<React.SetStateAction<boolean>>,
      threshold = 0.1
    ) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibility(true);
            observer.disconnect();
          }
        },
        { threshold, rootMargin: '0px 0px -100px 0px' } // Start animation slightly before element comes into full view
      );
      
      if (ref.current) {
        observer.observe(ref.current);
      }
      
      return observer;
    };
    
    // Create observers for each section
    const observers = [
      createObserver(headerRef, setHeaderVisible),
      createObserver(missionRef, setMissionVisible),
      createObserver(valuesRef, setValuesVisible, 0.05),
      createObserver(contactRef, setContactVisible),
      createObserver(mapRef, setMapVisible, 0.05),
    ];
    
    // Cleanup function to disconnect all observers
    return () => observers.forEach(observer => observer.disconnect());
  }, []);
  
  // Function to generate animation classes with different delays
  const getAnimationClass = (isVisible: boolean, delay: number = 0) => {
    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`
    };
  };

  return (
    <section 
      id="hospital-info-section"
      className="py-16 bg-white"
    >
      <div className="container mx-auto px-4">
        <h2 
          ref={headerRef}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900"
          style={getAnimationClass(headerVisible)}
        >
          About <span className="text-red-500">Our Hospital</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* About Hospital Section */}
          <div ref={missionRef}>
            <h3 
              className="text-2xl font-semibold mb-4 text-gray-800"
              style={getAnimationClass(missionVisible, 100)}
            >
              Our Mission
            </h3>
            <p 
              className="text-gray-600 mb-4"
              style={getAnimationClass(missionVisible, 200)}
            >
              Founded in 1985, HMS is dedicated to providing exceptional healthcare services with 
              compassion and integrity. Our state-of-the-art facilities and dedicated medical 
              professionals ensure that every patient receives the highest standard of care.
            </p>
            <p 
              className="text-gray-600 mb-4"
              style={getAnimationClass(missionVisible, 300)}
            >
              We believe in a patient-centered approach, combining advanced medical technology with 
              human touch. Our team of over 200 medical experts across various specialties works 
              tirelessly to improve health outcomes and enhance the quality of life for our patients.
            </p>
            
            <div ref={valuesRef}>
              <h3 
                className="text-2xl font-semibold mb-4 mt-8 text-gray-800"
                style={getAnimationClass(valuesVisible, 100)}
              >
                Our Values
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    title: "Excellence",
                    description: "Striving for the highest standards in healthcare",
                    delay: 200
                  },
                  {
                    title: "Compassion",
                    description: "Treating all with kindness and empathy",
                    delay: 300
                  },
                  {
                    title: "Innovation",
                    description: "Embracing new technologies and approaches",
                    delay: 400
                  },
                  {
                    title: "Integrity",
                    description: "Upholding the highest ethical standards",
                    delay: 500
                  }
                ].map((value, index) => (
                  <div 
                    key={index} 
                    className="flex items-start"
                    style={getAnimationClass(valuesVisible, value.delay)}
                  >
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">{value.title}</h4>
                      <p className="text-sm text-gray-600">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Contact Info & Map Section */}
          <div ref={contactRef}>
            <h3 
              className="text-2xl font-semibold mb-4 text-gray-800"
              style={getAnimationClass(contactVisible, 100)}
            >
              Contact Information
            </h3>
            
            <div 
              className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6"
              style={getAnimationClass(contactVisible, 200)}
            >
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  title: "Address",
                  lines: ["123 Medical Center Drive", "Ho Chi Minh City, Vietnam"],
                  delay: 50
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  title: "Phone",
                  lines: ["Main: (84) 28-1234-5678", "Emergency: (84) 28-8765-4321"],
                  delay: 150
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: "Email",
                  lines: ["info@hms-hospital.com", "appointments@hms-hospital.com"],
                  delay: 250
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Hours",
                  lines: ["Mon-Fri: 8:00 AM - 8:00 PM", "Sat-Sun: 10:00 AM - 6:00 PM", <span key="emergency" className="text-red-500 font-medium">Emergency Services: 24/7</span>],
                  delay: 350
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className={`flex items-start ${index < 3 ? 'mb-4' : ''}`}
                  style={getAnimationClass(contactVisible, 200 + item.delay)}
                >
                  <div className="bg-red-100 p-2 rounded-full mr-3">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    {item.lines.map((line, i) => (
                      <p key={i} className={typeof line === 'string' ? "text-gray-600" : ""}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Map Section (Static Image Placeholder) */}
            <div 
              ref={mapRef}
              className="rounded-lg overflow-hidden shadow-md border border-gray-200 h-64 relative"
              style={getAnimationClass(mapVisible, 300)}
            >
              {/* Add a subtle pulse animation to the map placeholder */}
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center animate-pulse">
                <div className="text-center">
                  <div className="mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-sm">Interactive map loading...</p>
                  <p className="text-gray-500 text-xs mt-1">Click to open directions in Google Maps</p>
                </div>
              </div>
              <a 
                href="https://maps.google.com/?q=123+Medical+Center+Drive+Ho+Chi+Minh+City+Vietnam" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
                aria-label="Open in Google Maps"
              ></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HospitalInfo;
