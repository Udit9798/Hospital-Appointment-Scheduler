# 🏥 Hospital Appointment Scheduler

A modern, responsive web application for managing hospital doctor appointments with intelligent load balancing and fair scheduling.

## 📋 Overview

This application provides a complete solution for scheduling doctor appointments efficiently. It automatically assigns patients to doctors based on specialization and current workload, ensuring fair distribution of appointments across all available doctors.

## ✨ Features

### 1. Add Doctor
- User-friendly form to add new doctors to the system
- Input validation for all fields
- Prevents duplicate doctor IDs
- Fields:
  - Doctor ID (unique identifier)
  - Specialization (e.g., Cardiology, Neurology)
  - Max Daily Patients (maximum capacity)
  - Current Appointments (starting count)

### 2. View All Doctors
- Comprehensive table displaying all registered doctors
- Real-time status indicators (Available/Full)
- Shows:
  - Doctor ID
  - Specialization
  - Maximum capacity
  - Current appointment count
  - Availability status

### 3. Book Appointment
- Smart appointment booking system
- Automatically selects the best available doctor based on:
  - Matching specialization
  - Lowest current appointment count
  - Deterministic tie-breaking
- Provides clear success/failure messages
- Suggests available specializations

### 4. Error Handling
- Comprehensive input validation
- Clear, user-friendly error messages
- Handles edge cases:
  - No doctors available for specialization
  - All doctors fully booked
  - Invalid input data
  - Duplicate doctor IDs

## 🛠️ Tech Stack

- **Frontend Framework:** React 18.2.0
- **Build Tool:** Vite 5.0.8
- **Styling:** Tailwind CSS 3.4.0
- **State Management:** React Hooks (useState, useEffect)
- **Language:** JavaScript (ES6+)
- **Deployment:** Vercel

## 🚀 Local Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd hospital-appointment-scheduler
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`
   - The application will hot-reload on code changes

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 📦 Project Structure

```
hospital-appointment-scheduler/
├── public/
├── src/
│   ├── components/
│   │   ├── AddDoctorForm.jsx       # Form to add new doctors
│   │   ├── DoctorList.jsx          # Display all doctors in table
│   │   ├── BookAppointment.jsx     # Appointment booking interface
│   │   └── OutputPanel.jsx         # Success/error message display
│   ├── utils/
│   │   └── appointmentLogic.js     # Core booking algorithm
│   ├── App.jsx                      # Main application component
│   ├── App.css                      # Application styles
│   ├── index.css                    # Global styles with Tailwind
│   └── main.jsx                     # React entry point
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎯 Core Algorithm

The appointment booking algorithm follows this logic:

1. **Filter by Specialization**: Find all doctors matching the requested specialization
2. **Check Availability**: Filter doctors who have not reached their max daily capacity
3. **Select Best Doctor**: Choose the doctor with the fewest current appointments
4. **Deterministic Tie-Breaking**: If multiple doctors have the same count, select the first one
5. **Update State**: Increment the selected doctor's appointment count

### Example
```javascript
// Initial state
Cardiology Doctors:
- DOC001: 2/10 appointments
- DOC002: 5/10 appointments

// After booking request for "Cardiology"
- DOC001 selected (fewest appointments)
- Updated to: DOC001: 3/10 appointments
```

## 🌐 Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Sign in with GitHub
4. Click "New Project"
5. Import your repository
6. Vercel auto-detects Vite configuration
7. Click "Deploy"
8. Your app will be live in ~2 minutes

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Deployment Configuration

Vercel automatically configures:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

No additional configuration needed

## 📝 Usage Guide

### Adding a Doctor
1. Fill in all fields in the "Add New Doctor" form
2. Click "Add Doctor"
3. Doctor appears in the "All Doctors" table

### Booking an Appointment
1. Enter the required specialization (e.g., "Cardiology")
2. Click "Book Appointment"
3. System automatically assigns the best available doctor
4. Success/failure message displays in the output panel

### Viewing Doctors
- All doctors are displayed in real-time in the table
- Green "Available" badge = doctor has capacity
- Red "Full" badge = doctor has reached max capacity

## 🧪 Testing Scenarios

### Test Case 1: Basic Booking
1. Add 2 Cardiology doctors with max 5 patients each
2. Book 3 Cardiology appointments
3. Verify appointments distribute fairly

### Test Case 2: Full Capacity
1. Add 1 Neurology doctor with max 2 patients
2. Set current appointments to 2
3. Try booking Neurology appointment
4. Verify rejection message appears

### Test Case 3: Multiple Specializations
1. Add doctors with different specializations
2. Book appointments for various specializations
3. Verify correct doctor selection each time

## 🤝 Contributing

This is an assignment project. For educational purposes only.

## 📄 License

This project is created as part of an assignment evaluation.

## 👤 Author

Developed for Round 2 Assignment evaluation.

---

**Live Demo:https://hospital-appointment-scheduler-zpg7.onrender.com

**Repository: https://github.com/Udit9798/Hospital-Appointment-Scheduler.git