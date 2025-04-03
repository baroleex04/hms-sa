import React from "react";
import { Link } from "react-router-dom";

const AdminPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Widget for Appointment Management */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Appointments</h2>
          <p>View and manage patient appointments.</p>
          <Link to="/appointments" className="text-blue-500 hover:underline">
            Go to Appointments
          </Link>
        </div>

        {/* Widget for Staff Management */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Staff Management</h2>
          <p>Manage staff members and assign roles.</p>
          <Link to="/staff" className="text-blue-500 hover:underline">
            Go to Staff Management
          </Link>
        </div>

        {/* Widget for Order Management */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Order Management</h2>
          <p>Track and manage all orders placed by patients or customers.</p>
          <Link to="/orders" className="text-blue-500 hover:underline">
            Go to Order Management
          </Link>
        </div>

        {/* Widget for Patient Management */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Patient Management</h2>
          <p>View and manage patient records and history.</p>
          <Link to="/patients" className="text-blue-500 hover:underline">
            Go to Patient Management
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
