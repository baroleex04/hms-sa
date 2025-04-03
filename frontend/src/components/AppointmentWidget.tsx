import React from "react";

interface AppointmentWidgetProps {
  totalAppointments: number;
}

const AppointmentWidget: React.FC<AppointmentWidgetProps> = ({ totalAppointments }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Total Appointments</h3>
      <div className="text-center">
        <span className="text-3xl font-bold">{totalAppointments}</span>
      </div>
    </div>
  );
};

export default AppointmentWidget;
