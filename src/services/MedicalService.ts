import { Patient } from '../classes/Patient';
import { Doctor } from '../classes/Doctor';
import { Appointment } from '../classes/Appointment';
import { MedicalRecord } from '../classes/MedicalRecord';

export class MedicalService {
    private patients: Patient[] = [];
    private doctors: Doctor[] = [];
    private appointments: Appointment[] = [];
    private medicalRecords: MedicalRecord[] = [];

    addDoctor(name: string, specialization: string, email?: string): Doctor {
        const doctor = new Doctor(name, specialization, email);
        this.doctors.push(doctor);
        console.log(`Doctor added: ${doctor.name} (${doctor.specialization})`);
        return doctor;
    }

    getDoctorById(id: string): Doctor | undefined {
        return this.doctors.find((d) => d.id === id);
    }

    getAllDoctors(): Doctor[] {
        return this.doctors;
    }

    addPatient(name: string, birthDate: Date, phone?: string): Patient {
        const patient = new Patient(name, birthDate, phone);
        this.patients.push(patient);
        console.log(`Patient added: ${patient.name}`);
        return patient;
    }

    getPatientById(id: string): Patient | undefined {
        return this.patients.find((p) => p.id === id);
    }

    getAllPatients(): Patient[] {
        return this.patients;
    }

    createAppointment(
        patientId: string,
        doctorId: string,
        date: Date,
        description: string
    ): Appointment | null {
        const patient = this.getPatientById(patientId);
        const doctor = this.getDoctorById(doctorId);
        if (!patient || !doctor) {
            console.error('Error: Patient or doctor not found.');
            return null;
        }

        try {
            const appointment = new Appointment(
                patientId,
                doctorId,
                date,
                description
            );
            this.appointments.push(appointment);
            console.log(
                `Patient ${patient.name} has been scheduled with Dr. ${
                    doctor.name
                } on ${date.toLocaleString()}`
            );
            return appointment;
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Failed to create appointment: ${error.message}`);
            }
            return null;
        }
    }

    getAppointmentById(id: string): Appointment | undefined {
        return this.appointments.find((a) => a.id === id);
    }

    getAllAppointments(): Appointment[] {
        return this.appointments;
    }

    /**
     * Updates an existing appointment, including its date, description, and status.
     * This is the single point of truth for all appointment modifications.
     */
    updateAppointment(
        id: string,
        newDate: Date,
        newDescription: string,
        newStatus?: 'new' | 'confirmed' | 'completed' | 'cancelled'
    ): Appointment | null {
        const appointment = this.getAppointmentById(id);
        if (!appointment) {
            console.error(`Error: Appointment with ID ${id} not found.`);
            return null;
        }

        try {
            appointment.setDate(newDate);
        } catch (e) {
            if (e instanceof Error) {
                console.error(`Update failed: ${e.message}`);
            }
            return null;
        }

        if (newStatus && !Appointment.isValidStatus(newStatus)) {
            console.error('Update failed: Invalid appointment status.');
            return null;
        }

        if (!Appointment.isValidDescription(newDescription)) {
            console.error(
                'Update failed: Description must be between 1 and 300 characters.'
            );
            return null;
        }

        appointment.description = newDescription.trim();

        if (newStatus) {
            appointment.status = newStatus;
        }

        console.log(`Appointment ${id} has been updated.`);
        return appointment;
    }

    deleteAppointment(id: string): boolean {
        const index = this.appointments.findIndex((a) => a.id === id);
        if (index !== -1) {
            this.appointments.splice(index, 1);
            console.log(`Appointment ${id} has been deleted.`);
            return true;
        }
        console.error(`Error: Appointment with ID ${id} not found.`);
        return false;
    }

    searchPatientsByName(namePart: string): Patient[] {
        const lowerCaseNamePart = namePart.toLowerCase();
        return this.patients.filter((p) =>
            p.name.toLowerCase().includes(lowerCaseNamePart)
        );
    }

    getAppointmentsByPatient(patientId: string): Appointment[] {
        return this.appointments.filter((a) => a.patientId === patientId);
    }

    getAppointmentsByDoctor(doctorId: string): Appointment[] {
        return this.appointments.filter((a) => a.doctorId === doctorId);
    }

}
