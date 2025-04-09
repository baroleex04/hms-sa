import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection"; 
import ServicesOverview from "../components/ServicesOverview";
import StaffOverview from "../components/StaffOverview";
import AppointmentWidget from "../components/AppointmentWidget";
import PatientWidget from "../components/PatientWidget";
import CTASection from "../components/CTASection"; // Import the CTA Section
import HospitalInfo from "../components/HospitalInfo"; // Import the new HospitalInfo component
import Testimonials from "../components/Testimonials"; // Import the Testimonials component

const HomePage: React.FC = () => {
  const [totalAppointments, setTotalAppointments] = useState<number>(0);
  const [totalPatients, setTotalPatients] = useState<number>(0);

  useEffect(() => {
    // Fetch total appointments and patients (simulated with dummy values)
    // You would replace this with an API call to fetch real data
    setTotalAppointments(120); // Example static value
    setTotalPatients(200); // Example static value
  }, []);

  return (
    <div className="container mx-auto">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Services Overview Section */}
      <ServicesOverview />
      
      {/* CTA Section - Added between Services and Overview */}
      <CTASection />
      
      {/* Hospital Information Section */}
      <HospitalInfo />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* Overview Section */}
      <div className="p-4 my-8">
        <h1 className="text-4xl font-bold text-center mb-6">Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Appointment Widget */}
          <AppointmentWidget totalAppointments={totalAppointments} />

          {/* Patient Widget */}
          <PatientWidget totalPatients={totalPatients} />

          {/* Staff Overview Widget */}
          {/* <StaffOverview /> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
