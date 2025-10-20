export class Appointment {
    id: string;
    patientId: string;
    doctorId: string;
    date: Date;
    description: string;
    status: 'new' | 'confirmed' | 'completed' | 'cancelled';

    constructor(patientId: string, doctorId: string, date: Date, description: string) {
        if (!Appointment.isValidDate(date)) {
            throw new Error('Appointment date cannot be in the past.');
        }
        if (!Appointment.isValidDescription(description)) {
            throw new Error('Description must be between 1 and 300 characters long.');
        }

        this.id = Math.random().toString(36).substring(2);
        this.patientId = patientId;
        this.doctorId = doctorId;
        this.date = date;
        this.description = description.trim();
        this.status = 'new';
    }

    static isValidDate(date: Date): boolean {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Compare dates only
        return date >= today;
    }

    static isValidStatus(status: string): status is 'new' | 'confirmed' | 'completed' | 'cancelled' {
        return ['new', 'confirmed', 'completed', 'cancelled'].includes(status);
    }

    static isValidDescription(description: string): boolean {
        return typeof description === 'string' && description.trim().length > 0 && description.trim().length <= 300;
    }
}
