import React, { useState, useEffect, useRef } from "react";

// Custom hook to detect when element is in viewport
const useElementOnScreen = <T extends HTMLElement = HTMLDivElement>(
  options = {}, 
  delay = 0
): [React.RefObject<T>, boolean] => {
  const containerRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Check if IntersectionObserver is available
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true); // Fallback to always visible
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setTimeout(() => {
        setIsVisible(entry.isIntersecting);
      }, delay);
    }, options);

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options, delay]);

  return [containerRef, isVisible];
};

const CTASection: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Create refs for animations
  const [headingRef, headingInView] = useElementOnScreen<HTMLHeadingElement>({ threshold: 0.2, rootMargin: '0px' }, 0);
  const [paragraphRef, paragraphInView] = useElementOnScreen<HTMLParagraphElement>({ threshold: 0.2, rootMargin: '0px' }, 100);
  const [buttonsRef, buttonsInView] = useElementOnScreen<HTMLDivElement>({ threshold: 0.2, rootMargin: '0px' }, 200);
  const [adminLinkRef, adminLinkInView] = useElementOnScreen<HTMLDivElement>({ threshold: 0.2, rootMargin: '0px' }, 300);

  // Animation styles
  const fadeInUp = (inView: boolean): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(30px)',
    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
  });

  useEffect(() => {
    // Check login status
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    // Check if user is admin
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.roles && user.roles[0] === "ADMIN") {
        setIsAdmin(true);
      }
    }
  }, []);

  // Handle navigation without react-router Link component
  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, path: string): void => {
    e.preventDefault();
    window.location.href = path;
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            ref={headingRef} 
            className="text-3xl md:text-4xl font-bold mb-6 text-gray-900"
            style={fadeInUp(headingInView)}
          >
            Take the Next Step in Your Healthcare
          </h2>
          
          <p 
            ref={paragraphRef}
            className="text-xl text-gray-600 mb-8"
            style={fadeInUp(paragraphInView)}
          >
            {isLoggedIn ? (
              isAdmin ? 
              "Access your administrative tools and manage hospital resources." :
              "Your health is our priority. Schedule appointments or access your medical records."
            ) : (
              "Join our healthcare community to easily book appointments and access your medical records."
            )}
          </p>
          
          <div 
            ref={buttonsRef}
            className="flex flex-col sm:flex-row justify-center gap-4"
            style={fadeInUp(buttonsInView)}
          >
            {isLoggedIn ? (
              isAdmin ? (
                <>
                  <a 
                    href="/adminpage" 
                    onClick={(e) => handleNavigate(e, "/adminpage")}
                    className="px-8 py-4 bg-red-500 text-white rounded-lg text-lg font-semibold transition-all hover:bg-red-600 shadow-lg hover:shadow-xl"
                  >
                    Admin Dashboard
                  </a>
                  <a
                    href="/staff"
                    onClick={(e) => handleNavigate(e, "/staff")}
                    className="px-8 py-4 border-2 border-red-500 text-red-500 rounded-lg text-lg font-semibold transition-all hover:bg-red-50"
                  >
                    Manage Staff
                  </a>
                </>
              ) : (
                <>
                  <a 
                    href="/appointments" 
                    onClick={(e) => handleNavigate(e, "/appointments")}
                    className="px-8 py-4 bg-red-500 text-white rounded-lg text-lg font-semibold transition-all hover:bg-red-600 shadow-lg hover:shadow-xl"
                  >
                    Book Appointment
                  </a>
                  <a 
                    href="/records" 
                    onClick={(e) => handleNavigate(e, "/records")}
                    className="px-8 py-4 border-2 border-red-500 text-red-500 rounded-lg text-lg font-semibold transition-all hover:bg-red-50"
                  >
                    View Your Records
                  </a>
                </>
              )
            ) : (
              <>
                <a 
                  href="/login" 
                  onClick={(e) => handleNavigate(e, "/login")}
                  className="px-8 py-4 bg-red-500 text-white rounded-lg text-lg font-semibold transition-all hover:bg-red-600 shadow-lg hover:shadow-xl"
                >
                  Login
                </a>
                <a 
                  href="/signup" 
                  onClick={(e) => handleNavigate(e, "/signup")}
                  className="px-8 py-4 border-2 border-red-500 text-red-500 rounded-lg text-lg font-semibold transition-all hover:bg-red-50"
                >
                  Register
                </a>
              </>
            )}
          </div>
          
          {isAdmin && (
            <div 
              ref={adminLinkRef}
              className="mt-8"
              style={fadeInUp(adminLinkInView)}
            >
              <a 
                href="/patients" 
                onClick={(e) => handleNavigate(e, "/patients")}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                View All Patients
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
