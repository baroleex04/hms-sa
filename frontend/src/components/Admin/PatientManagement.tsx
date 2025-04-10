import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { UserPlus, Search, Plus, Edit2, Trash2, FileText, X } from 'lucide-react';

interface MedicalHistory {
  history_id: string;
  patient_id: string;
  condition: string;
  allergies: string[];
}

interface Patient {
  patient_id: string;
  name: string;
  date_of_birth: string;
  gender: string;
  contact_info: string;
  medical_history: MedicalHistory;
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

const PatientManagement: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<PatientFormData>({
    patient_id: '',
    name: '',
    date_of_birth: '',
    gender: 'Male',
    contact_info: '',
    condition: '',
    allergies: '',
  });
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/patients');
      const data = await res.json();
      setPatients(data);
    } catch (err) {
      console.error('Failed to fetch patients:', err);
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.medical_history.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.patient_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateAge = (dateOfBirth: string) => {
    const dob = new Date(dateOfBirth);
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = !!editingPatient;
    const allergiesArray = formData.allergies
    .split(',')
    .map(item => item.trim())
    .filter(item => item);

    let patientData: any = { patient_id: formData.patient_id };
    let endpoint = '';
    let method = isEdit ? 'PUT' : 'POST';
    if (!isEdit) {
      // Add new patient
      endpoint = 'http://127.0.0.1:5000/patient/add';
      patientData = {
        ...formData,
        allergies: allergiesArray,
      };

      try {
        await fetch(endpoint, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(patientData),
        });
    
        console.log('Submitted patient data:', patientData);
        await fetchPatients();
        handleCloseModal();
      } catch (err) {
        console.error('Error submitting patient:', err);
      }
    } else {
      // Determine what is being updated
      const updatingConditionOnly = formData.condition;
  
      const updatingAllergiesOnly = allergiesArray.length > 0;
  
      if (updatingConditionOnly) {
        endpoint = 'http://127.0.0.1:5000/patient/update_condition';
        patientData = {
          patient_id: formData.patient_id,
          condition: formData.condition,
        };

        try {
          await fetch(endpoint, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patientData),
          });
      
          console.log('Submitted patient data:', patientData);
          await fetchPatients();
          handleCloseModal();
        } catch (err) {
          console.error('Error submitting patient:', err);
        }
      }
      if (updatingAllergiesOnly) {
        endpoint = 'http://127.0.0.1:5000/patient/update_allergies';
        patientData = {
          patient_id: formData.patient_id,
          new_allergies: allergiesArray,
        };
        try {
          await fetch(endpoint, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patientData),
          });
      
          console.log('Submitted patient data:', patientData);
          await fetchPatients();
          handleCloseModal();
        } catch (err) {
          console.error('Error submitting patient:', err);
        }
      } 
        // Full info update
      endpoint = 'http://127.0.0.1:5000/patient/update_info';
      patientData = {
        ...formData,
        allergies: allergiesArray,
      };
      try {
        await fetch(endpoint, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(patientData),
        });
    
        console.log('Submitted patient data:', patientData);
        await fetchPatients();
        handleCloseModal();
      } catch (err) {
        console.error('Error submitting patient:', err);
      }
      
    } 
   
  };

  const handleDelete = async (patient_id: string) => {
    if (confirm('Are you sure you want to delete this patient?')) {
      try {
        await fetch(`http://127.0.0.1:5000/patient/delete?patient_id=${patient_id}`, {
          method: 'DELETE',
        });
        await fetchPatients();
      } catch (err) {
        console.error('Error deleting patient:', err);
      }
    }
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
        condition: patient.medical_history?.condition,
        allergies: patient.medical_history.allergies.join(', ')
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
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingPatient(null);
  };

  return (
    <div className="space-y-6 mb-8">
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
                    <div className="text-sm text-gray-500">{patient.medical_history.condition}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                    {(patient.medical_history.allergies || []).join(', ')}
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
      {modalOpen && (
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 bg-gray-200"
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
                    <option value="OTHER">Other</option>
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
};

export default PatientManagement;
