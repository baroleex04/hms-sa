import React, { useState, useEffect, useRef } from "react";

const Testimonials: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const testimonialRef = useRef<HTMLDivElement>(null);

  // Example testimonial data with default avatars
  const testimonialsData = [
    {
      id: 1,
      name: "Jane Smith",
      role: "Patient",
      avatar: "JS", // Initials for default avatar
      color: "bg-blue-500", // Background color for avatar
      text: "The care I received at HMS was exceptional. From the doctors to the nursing staff, everyone was professional and compassionate."
    },
    {
      id: 2,
      name: "John Davis",
      role: "Family Member",
      avatar: "JD",
      color: "bg-green-500",
      text: "During my mother's treatment, the staff went above and beyond to keep our family informed and comfortable. We're forever grateful."
    },
    {
      id: 3,
      name: "Maria Garcia",
      role: "Patient",
      avatar: "MG",
      color: "bg-purple-500",
      text: "Thanks to the dedicated specialists at HMS, my recovery was faster than expected. Their modern facilities and personalized care made all the difference."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (testimonialRef.current) {
      observer.observe(testimonialRef.current);
    }

    return () => {
      if (testimonialRef.current) {
        observer.unobserve(testimonialRef.current);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-gray-50" ref={testimonialRef}>
      <div className="container mx-auto px-4">
        <h2 className={`text-4xl font-bold text-center mb-12 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          What Our Patients Say
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`bg-white p-6 rounded-lg shadow-md transition-all duration-1000 transform ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center mb-4">
                {/* Default avatar with initials */}
                <div className={`w-14 h-14 rounded-full ${testimonial.color} text-white flex items-center justify-center font-bold text-lg mr-4`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="italic text-gray-700">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
