import React, { useState, useEffect } from "react";

const StaffOverview: React.FC = () => {
  const [staffCount, setStaffCount] = useState({ doctors: 0, nurses: 0 });

  useEffect(() => {
    // Fetch staff data (simulated with dummy values)
    // Replace this with an API call to get real staff data
    setStaffCount({ doctors: 15, nurses: 25 }); // Example static values
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Staff Overview</h2>
      <div className="flex justify-between mb-4">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold">{staffCount.doctors}</span>
          <span className="text-gray-500">Doctors</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold">{staffCount.nurses}</span>
          <span className="text-gray-500">Nurses</span>
        </div>
      </div>

      {/* Additional staff statistics could go here */}
      <div className="mt-4">
        <p>Total active staff members: {staffCount.doctors + staffCount.nurses}</p>
      </div>
    </div>
  );
};

export default StaffOverview;
