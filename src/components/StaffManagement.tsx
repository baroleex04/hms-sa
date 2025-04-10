import React, { useState } from 'react';
import { Users, Search, Plus, Edit2, Trash2, X } from 'lucide-react';
import { Link } from "react-router-dom";

interface Staff {
  staff_id: string;
  name: string;
  role: string;
  contact_info: string;
  department: string;
  specialization: string;
  shift: string[];
  ward: string;
  status: 'active' | 'inactive';
}

const initialStaff: Staff[] = [
  { 
    staff_id: "S001",
    name: "Harry Potter",
    role: "Doctor",
    contact_info: "0363439975",
    department: "Emergency Department",
    specialization: "Trauma Surgery",
    shift: ["Monday 08:00-16:00", "Wednesday 08:00-16:00", "Friday 08:00-16:00"],
    ward: "Emergency",
    status: 'active'
  },
  // Add more staff members as needed
];

interface StaffFormData {
  staff_id: string;
  name: string;
  role: string;
  contact_info: string;
  department: string;
  specialization: string;
  shift: string[];
  ward: string;
  status: 'active' | 'inactive';
}

export default function StaffManagement() {
  const [staff, setStaff] = useState<Staff[]>(initialStaff);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [formData, setFormData] = useState<StaffFormData>({
    staff_id: '',
    name: '',
    role: '',
    contact_info: '',
    department: '',
    specialization: '',
    shift: [],
    ward: '',
    status: 'active'
  });

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (member?: Staff) => {
    if (member) {
      setEditingStaff(member);
      setFormData({
        staff_id: member.staff_id,
        name: member.name,
        role: member.role,
        contact_info: member.contact_info,
        department: member.department,
        specialization: member.specialization,
        shift: [...member.shift], // Create a new array copy
        ward: member.ward,
        status: member.status
      });
    } else {
      setEditingStaff(null);
      setFormData({
        staff_id: '', // Will be generated when submitting new staff
        name: '',
        role: '',
        contact_info: '',
        department: '',
        specialization: '',
        shift: [],
        ward: '',
        status: 'active'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStaff(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStaff) {
      setStaff(staff.map(member =>
        member.staff_id === editingStaff.staff_id
          ? { ...member, ...formData }
          : member
      ));
    } else {
      const newStaff = {
        ...formData,
        staff_id: `S${(Math.max(0, ...staff.map(s => parseInt(s.staff_id.substring(1)))) + 1)}`.padStart(3, '0')
      };
      setStaff([...staff, newStaff]);
    }
    handleCloseModal();
  };
      

  const handleDelete = (staff_id: string) => {
    if (confirm('Are you sure you want to delete this staff member?')) {
      setStaff(staff.filter(member => member.staff_id !== staff_id));
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
            <Users className="h-6 w-6 text-gray-600" />
            <h2 className="ml-3 text-xl font-semibold text-gray-900">Staff Management</h2>
          </div>
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Staff
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search staff..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
          <thead>
  <tr>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff ID</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ward</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
  </tr>
</thead>
<tbody className="bg-white divide-y divide-gray-200">
  {filteredStaff.map((member) => (
    <tr key={member.staff_id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{member.staff_id}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{member.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{member.role}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{member.contact_info}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{member.department}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{member.specialization}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{member.ward}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {member.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button 
          onClick={() => handleOpenModal(member)}
          className="text-blue-600 hover:text-blue-900 mr-4"
        >
          <Edit2 className="h-5 w-5" />
        </button>
        <button 
          onClick={() => handleDelete(member.staff_id)}
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
                {editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-500">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">Staff ID</label>
      <input
        type="text"
        required
        value={formData.staff_id}
        onChange={(e) => setFormData({ ...formData, staff_id: e.target.value })}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Name</label>
      <input
        type="text"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Role</label>
      <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    >
                      <option value="Doctor">Doctor</option>
                      <option value="Nurse">Nurse</option>
                      
                    </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Contact Info</label>
      <input
        type="text"
        required
        value={formData.contact_info}
        onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Department</label>
      <input
        type="text"
        required
        value={formData.department}
        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Specialization</label>
      <input
        type="text"
        required
        value={formData.specialization}
        onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Ward</label>
      <input
        type="text"
        required
        value={formData.ward}
        onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Shift (comma separated)</label>
      <input
        type="text"
        required
        value={formData.shift.join(', ')}
        onChange={(e) => setFormData({ ...formData, shift: e.target.value.split(', ') })}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Status</label>
      <select
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
                  </select>
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingStaff ? 'Update' : 'Add'}
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