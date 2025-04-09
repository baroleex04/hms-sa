import React from "react";
import { Link } from "react-router-dom";
import { Users, UserPlus, ArrowLeft, LayoutDashboard, CalendarClock, ClipboardList } from 'lucide-react';



const AdminPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Widget for Appointment Management */}
       {/* <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Appointments</h2>
          <p>View and manage patient appointments.</p>
          <Link to="/appointments" className="text-blue-500 hover:underline">
            Go to Appointments
          </Link>
        </div>*/}

        {/* Widget for Staff Management */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          
          <Link to="/staff"
                  className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-blue-500" />
                    <h2 className="ml-3 text-xl font-semibold text-gray-900">Staff Management</h2>
                  </div>
                  <p className="mt-3 text-gray-600">Manage hospital staff members and their roles</p>
          </Link>
        </div>

        {/* Widget for Order Management */}
        {/*<div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Order Management</h2>
          <p>Track and manage all orders placed by patients or customers.</p>
          <Link to="/orders" className="text-blue-500 hover:underline">
            Go to Order Management
          </Link>
        </div>*/}

        {/* Widget for Patient Management */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          
          <Link to="/patients"
                  className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center">
                    <UserPlus className="h-8 w-8 text-green-500" />
                    <h2 className="ml-3 text-xl font-semibold text-gray-900">Patient Management</h2>
                  </div>
                  <p className="mt-3 text-gray-600">View and manage the patient records</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
