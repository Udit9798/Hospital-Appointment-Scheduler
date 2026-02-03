import { useState } from 'react';
import './App.css';
import AddDoctorForm from './components/AddDoctorForm';
import DoctorList from './components/DoctorList';
import BookAppointment from './components/BookAppointment';
import OutputPanel from './components/OutputPanel';

function App() {
  // State for doctors list
  const [doctors, setDoctors] = useState([]);
  
  // State for output messages
  const [message, setMessage] = useState(null);

  // Handler to add a new doctor
  const handleAddDoctor = (newDoctor) => {
    setDoctors(prev => [...prev, newDoctor]);
  };

  // Handler for booking completion (updates doctors array)
  const handleBookingComplete = (updatedDoctors) => {
    setDoctors(updatedDoctors);
  };

  // Handler to display messages
  const handleMessage = (msg) => {
    setMessage(msg);
  };

  // Handler to clear message
  const handleClearMessage = () => {
    setMessage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🏥 Hospital Appointment Scheduler
          </h1>
          <p className="text-gray-600">
            Efficient and fair doctor appointment management system
          </p>
        </header>

        {/* Output Panel */}
        <OutputPanel message={message} onClear={handleClearMessage} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Left Column */}
          <div className="space-y-6">
            <AddDoctorForm 
              doctors={doctors}
              onAddDoctor={handleAddDoctor}
              onMessage={handleMessage}
            />
            
            <BookAppointment
              doctors={doctors}
              onBookingComplete={handleBookingComplete}
              onMessage={handleMessage}
            />
          </div>

          {/* Right Column */}
          <div>
            <DoctorList doctors={doctors} />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 text-gray-600 text-sm">
          <p>Built with React + Vite + Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}

export default App;