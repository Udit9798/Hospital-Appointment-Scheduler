/**
 * Core appointment allocation logic
 * Implements fair scheduling based on doctor availability and current load
 */

/**
 * Books an appointment for a given specialization
 * @param {Array} doctors - Array of doctor objects
 * @param {string} specialization - The specialization required
 * @returns {Object} - Result object with success flag, message, and updated doctors array
 */
export function bookAppointment(doctors, specialization) {
  // Step 1: Filter doctors by the given specialization
  const eligibleDoctors = doctors.filter(
    doctor => doctor.specialization.toLowerCase() === specialization.toLowerCase()
  );

  // Check if any doctors exist for this specialization
  if (eligibleDoctors.length === 0) {
    return {
      success: false,
      message: `No doctors found for specialization: ${specialization}`,
      doctors: doctors
    };
  }

  // Step 2: Filter doctors who have availability (currentAppointments < maxDailyPatients)
  const availableDoctors = eligibleDoctors.filter(
    doctor => doctor.currentAppointments < doctor.maxDailyPatients
  );

  // Check if all doctors are full
  if (availableDoctors.length === 0) {
    return {
      success: false,
      message: `All ${specialization} doctors are fully booked for today.`,
      doctors: doctors
    };
  }

  // Step 3: Select the doctor with the FEWEST currentAppointments
  // If multiple doctors tie, select the first one deterministically (by array order)
  let selectedDoctor = availableDoctors[0];
  
  for (let i = 1; i < availableDoctors.length; i++) {
    if (availableDoctors[i].currentAppointments < selectedDoctor.currentAppointments) {
      selectedDoctor = availableDoctors[i];
    }
  }

  // Step 4: Increment the selected doctor's currentAppointments
  const updatedDoctors = doctors.map(doctor => {
    if (doctor.doctorId === selectedDoctor.doctorId) {
      return {
        ...doctor,
        currentAppointments: doctor.currentAppointments + 1
      };
    }
    return doctor;
  });

  return {
    success: true,
    message: `Appointment booked successfully with Dr. ${selectedDoctor.doctorId} (${selectedDoctor.specialization}). Current appointments: ${selectedDoctor.currentAppointments + 1}/${selectedDoctor.maxDailyPatients}`,
    doctors: updatedDoctors,
    bookedDoctor: selectedDoctor
  };
}

/**
 * Validates doctor input data
 * @param {Object} doctor - Doctor object to validate
 * @returns {Object} - Validation result with isValid flag and error message
 */
export function validateDoctorInput(doctor) {
  const { doctorId, specialization, maxDailyPatients, currentAppointments } = doctor;

  // Check for empty fields
  if (!doctorId || !doctorId.trim()) {
    return { isValid: false, error: 'Doctor ID is required' };
  }

  if (!specialization || !specialization.trim()) {
    return { isValid: false, error: 'Specialization is required' };
  }

  // Validate numeric fields
  const maxPatients = Number(maxDailyPatients);
  if (isNaN(maxPatients) || maxPatients <= 0) {
    return { isValid: false, error: 'Max Daily Patients must be a number greater than 0' };
  }

  const currentAppts = Number(currentAppointments);
  if (isNaN(currentAppts) || currentAppts < 0) {
    return { isValid: false, error: 'Current Appointments must be a number greater than or equal to 0' };
  }

  // Validate that current appointments don't exceed max
  if (currentAppts > maxPatients) {
    return { isValid: false, error: 'Current Appointments cannot exceed Max Daily Patients' };
  }

  return { isValid: true };
}

/**
 * Checks if a doctor ID already exists
 * @param {Array} doctors - Array of existing doctors
 * @param {string} doctorId - ID to check
 * @returns {boolean} - True if ID exists, false otherwise
 */
export function isDoctorIdDuplicate(doctors, doctorId) {
  return doctors.some(doctor => doctor.doctorId === doctorId);
}