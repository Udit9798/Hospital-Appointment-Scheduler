import { useState } from 'react';
import { validateDoctorInput, isDoctorIdDuplicate } from '../utils/appointmentLogic';

function AddDoctorForm({ doctors, onAddDoctor, onMessage }) {
  const [formData, setFormData] = useState({
    doctorId: '',
    specialization: '',
    maxDailyPatients: '',
    currentAppointments: '0'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for duplicate doctor ID
    if (isDoctorIdDuplicate(doctors, formData.doctorId.trim())) {
      onMessage({
        type: 'error',
        text: `Doctor ID "${formData.doctorId}" already exists. Please use a unique ID.`
      });
      return;
    }

    // Create doctor object with trimmed strings and parsed numbers
    const newDoctor = {
      doctorId: formData.doctorId.trim(),
      specialization: formData.specialization.trim(),
      maxDailyPatients: Number(formData.maxDailyPatients),
      currentAppointments: Number(formData.currentAppointments)
    };

    // Validate doctor input
    const validation = validateDoctorInput(newDoctor);
    
    if (!validation.isValid) {
      onMessage({
        type: 'error',
        text: validation.error
      });
      return;
    }

    // Add doctor
    onAddDoctor(newDoctor);
    onMessage({
      type: 'success',
      text: `Doctor ${newDoctor.doctorId} added successfully!`
    });

    // Reset form
    setFormData({
      doctorId: '',
      specialization: '',
      maxDailyPatients: '',
      currentAppointments: '0'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Doctor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700 mb-1">
            Doctor ID *
          </label>
          <input
            type="text"
            id="doctorId"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., DOC001"
            required
          />
        </div>

        <div>
          <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
            Specialization *
          </label>
          <input
            type="text"
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Cardiology"
            required
          />
        </div>

        <div>
          <label htmlFor="maxDailyPatients" className="block text-sm font-medium text-gray-700 mb-1">
            Max Daily Patients *
          </label>
          <input
            type="number"
            id="maxDailyPatients"
            name="maxDailyPatients"
            value={formData.maxDailyPatients}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 10"
            min="1"
            required
          />
        </div>

        <div>
          <label htmlFor="currentAppointments" className="block text-sm font-medium text-gray-700 mb-1">
            Current Appointments *
          </label>
          <input
            type="number"
            id="currentAppointments"
            name="currentAppointments"
            value={formData.currentAppointments}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 0"
            min="0"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
}

export default AddDoctorForm;