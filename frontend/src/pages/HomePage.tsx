import React, { useState, useEffect } from "react";
import StaffOverview from "../components/StaffOverview"; // Import StaffOverview component
import AppointmentWidget from "../components/AppointmentWidget"; // A widget for appointments (you can create one)
import PatientWidget from "../components/PatientWidget"; // A widget for patients (you can create one)

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
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Appointment Widget */}
        <AppointmentWidget totalAppointments={totalAppointments} />

        {/* Patient Widget */}
        <PatientWidget totalPatients={totalPatients} />

        {/* Staff Overview Widget */}
        <StaffOverview />
      </div>
    </div>
  );
};

export default HomePage;
