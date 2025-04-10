import React, { useState } from 'react';
import { UserPlus, Search, Plus, Edit2, Trash2, FileText, X } from 'lucide-react';
import { Link } from "react-router-dom";

interface Patient {
  patient_id: string;
  name: string;
  date_of_birth: string;
  gender: string;
  contact_info: string;
  condition: string;
  allergies: string[];
}

interface PatientFormData {
  patient_id: string;
  name: string;
  date_of_birth: string;
  gender: string;
  contact_info: string;
  condition: string;
  allergies: string;
}

const initialPatients: Patient[] = [
  { 
    patient_id: 'P001', 
    name: 'Alice Brown', 
    date_of_birth: '1979-03-15', 
    gender: 'Female', 
    contact_info: '09123456789', 
    condition: 'Hypertension', 
    allergies: ['Penicillin'] 
  },
  { 
    patient_id: 'P002', 
    name: 'Bob Wilson', 
    date_of_birth: '1992-07-10', 
    gender: 'Male', 
    contact_info: '09234567890', 
    condition: 'Diabetes', 
    allergies: ['Sulfa'] 
  },
  { 
    patient_id: 'P003', 
    name: 'Carol Smith', 
    date_of_birth: '1996-11-25', 
    gender: 'Female', 
    contact_info: '09345678901', 
    condition: 'Asthma', 
    allergies: ['Peanuts', 'Dust'] 
  },
];

export default function PatientManagement() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState<PatientFormData>({
    patient_id: '',
    name: '',
    date_of_birth: '',
    gender: 'Male',
    contact_info: '',
    condition: '',
    allergies: ''
  });

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.patient_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateAge = (dateOfBirth: string) => {
    const dob = new Date(dateOfBirth);
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleOpenModal = (patient?: Patient) => {
    if (patient) {
      setEditingPatient(patient);
      setFormData({
        patient_id: patient.patient_id,
        name: patient.name,
        date_of_birth: patient.date_of_birth,
        gender: patient.gender,
        contact_info: patient.contact_info,
        condition: patient.condition,
        allergies: patient.allergies.join(', ')
      });
    } else {
      // Generate new patient ID
      const lastId = patients.length > 0 
        ? parseInt(patients[patients.length - 1].patient_id.substring(1)) 
        : 0;
      const newId = `P${(lastId + 1).toString().padStart(3, '0')}`;
      
      setEditingPatient(null);
      setFormData({
        patient_id: newId,
        name: '',
        date_of_birth: '',
        gender: 'Male',
        contact_info: '',
        condition: '',
        allergies: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPatient(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const patientData = {
      ...formData,
      allergies: formData.allergies.split(',').map(item => item.trim()).filter(item => item)
    };

    if (editingPatient) {
      setPatients(patients.map(patient =>
        patient.patient_id === editingPatient.patient_id
          ? { ...patient, ...patientData }
          : patient
      ));
    } else {
      setPatients([...patients, patientData as Patient]);
    }
    handleCloseModal();
  };

  const handleDelete = (patient_id: string) => {
    if (confirm('Are you sure you want to delete this patient?')) {
      setPatients(patients.filter(patient => patient.patient_id !== patient_id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Back link outside the main box */}
      <div className="pt-8">
        <div className="px-6">
          <Link 
            to="/adminpage" 
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                clipRule="evenodd" 
              />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <UserPlus className="h-6 w-6 text-gray-600" />
              <h2 className="ml-3 text-xl font-semibold text-gray-900">Patient Management</h2>
            </div>
            <button 
              onClick={() => handleOpenModal()}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Patient
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age/Gender</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allergies</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPatients.map((patient) => (
                  <tr key={patient.patient_id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{patient.patient_id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{calculateAge(patient.date_of_birth)} / {patient.gender}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{patient.contact_info}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{patient.condition}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {patient.allergies.length > 0 ? patient.allergies.join(', ') : 'None'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      
                      <button 
                        onClick={() => handleOpenModal(patient)}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(patient.patient_id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {editingPatient ? 'Edit Patient' : 'Add New Patient'}
                </h3>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-500">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Patient ID</label>
                    <input
                      type="text"
                      required
                      value={formData.patient_id}
                      readOnly
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                      type="date"
                      required
                      value={formData.date_of_birth}
                      onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Info</label>
                    <input
                      type="text"
                      required
                      value={formData.contact_info}
                      onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Condition</label>
                    <input
                      type="text"
                      required
                      value={formData.condition}
                      onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Allergies (comma separated)</label>
                    <input
                      type="text"
                      value={formData.allergies}
                      onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="Peanuts, Dust, Penicillin"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    {editingPatient ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}