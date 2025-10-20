import { MedicalService } from './services/MedicalService';

console.log('--- Medical Management System Starting ---');

const medicalSystem = new MedicalService();

// Add doctors and patients
const drKalnyk = medicalSystem.addDoctor('Ivan Kalnyk', 'JavaScript Pscychiatrist', 'ivan@example.com');
const patientJohn = medicalSystem.addPatient('John Kováč', new Date('1990-05-15'), '+421 900 123 456');
const patientJane = medicalSystem.addPatient('Jane Smith', new Date('1985-10-20'));

// Create appointments
const appointment1 = medicalSystem.createAppointment(patientJohn.id, drKalnyk.id, new Date('2025-10-21T10:00:00'), 'My life is undefined');
const appointment2 = medicalSystem.createAppointment(patientJane.id, drKalnyk.id, new Date('2025-10-22T14:00:00'), "Can't compile my feelings");

console.log('\n--- Managing Appointments ---');

// Confirm and update an appointment in a single call
if (appointment1) {
    console.log('Updating appointment 1: changing time and confirming status...');
    medicalSystem.updateAppointment(
        appointment1.id,
        new Date('2025-10-21T11:00:00'), // New time
        'Annual check-up & blood test', // New description
        'confirmed' // New status
    );
}

// Cancel another appointment
if (appointment2) {
    console.log('Cancelling appointment 2...');
    medicalSystem.updateAppointment(
        appointment2.id,
        appointment2.date, // Date remains the same
        appointment2.description, // Description remains the same
        'cancelled' // Only status is changed
    );
}

console.log('\n--- Final List of Appointments ---');
console.log(medicalSystem.getAllAppointments());
