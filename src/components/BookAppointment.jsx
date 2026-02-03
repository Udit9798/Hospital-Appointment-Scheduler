import { useState } from 'react';
import { bookAppointment } from '../utils/appointmentLogic';

function BookAppointment({ doctors, onBookingComplete, onMessage }) {
  const [specialization, setSpecialization] = useState('');

  // Get unique specializations from current doctors
  const uniqueSpecializations = [...new Set(doctors.map(d => d.specialization))];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!specialization || !specialization.trim()) {
      onMessage({
        type: 'error',
        text: 'Please enter a specialization'
      });
      return;
    }

    // Call the core booking logic
    const result = bookAppointment(doctors, specialization.trim());

    if (result.success) {
      onBookingComplete(result.doctors);
      onMessage({
        type: 'success',
        text: result.message
      });
      setSpecialization('');
    } else {
      onMessage({
        type: 'error',
        text: result.message
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Book Appointment</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">
            Specialization *
          </label>
          <input
            type="text"
            id="specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g., Cardiology"
            list="specializations"
            required
          />
          {uniqueSpecializations.length > 0 && (
            <datalist id="specializations">
              {uniqueSpecializations.map((spec, index) => (
                <option key={index} value={spec} />
              ))}
            </datalist>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Enter the specialization you need (e.g., Cardiology, Neurology, Orthopedics)
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 font-medium"
        >
          Book Appointment
        </button>
      </form>

      {uniqueSpecializations.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <p className="text-sm font-medium text-blue-800 mb-1">Available Specializations:</p>
          <div className="flex flex-wrap gap-2">
            {uniqueSpecializations.map((spec, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BookAppointment;