import React from "react";

interface PatientWidgetProps {
  totalPatients: number;
}

const PatientWidget: React.FC<PatientWidgetProps> = ({ totalPatients }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Total Patients</h3>
      <div className="text-center">
        <span className="text-3xl font-bold">{totalPatients}</span>
      </div>
    </div>
  );
};

export default PatientWidget;
