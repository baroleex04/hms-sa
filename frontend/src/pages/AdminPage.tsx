import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, UserPlus } from 'lucide-react';

const AdminPage: React.FC = () => {
  const [staffCount, setStaffCount] = useState<number>(0);
  const [patientCount, setPatientCount] = useState<number>(0);

  useEffect(() => {
    // Fetch staff count
    fetch("http://127.0.0.1:5000/staffs")
      .then((res) => res.json())
      .then((data) => {
        setStaffCount(data.length);
      })
      .catch((err) => console.error("Error fetching staffs:", err));

    // Fetch patient count
    fetch("http://127.0.0.1:5000/patients")
      .then((res) => res.json())
      .then((data) => {
        setPatientCount(data.length);
      })
      .catch((err) => console.error("Error fetching patients:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:flex items-center justify-center sm:grid-cols-2 lg:grid-cols-3 gap-6">
       
        {/* Widget for Patient Management */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <Link to="/patient-management"
            className="block p-6 h-[150px] sm:h-[190px] md:h-[180px] lg:h-[150px] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <UserPlus className="h-8 w-8 text-green-500" />
              <h2 className="ml-3 text-xl font-semibold text-gray-900">Patient Management</h2>
            </div>
            <p className="mt-3 text-gray-600">Managing patient information efficiently</p>
            <p className="mt-2 text-sm text-gray-500">
              Total Patients: {patientCount}
            </p>
          </Link>
        </div>

        {/* Widget for Staff Management */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          
          <Link 
            to="/staff-management"
            className="block p-6 h-[150px] sm:h-[190px] md:h-[180px] lg:h-[150px] bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <h2 className="ml-3 text-xl font-semibold text-gray-900">Staff Management</h2>
            </div>
            <p className="mt-3 text-gray-600">Managing staff information efficiently</p>
            <p className="mt-2 text-sm text-gray-500">
              Total Staff: {staffCount}
            </p>
          </Link>
        </div>               
      </div>
    </div>
  );
};

export default AdminPage;