export class MedicalRecord {
    id: string;
    patientId: string;
    appointmentId?: string | undefined;  // Optional: link to a specific appointment
    diagnosis: string;
    treatment: string;
    notes: string;
    recordDate: Date;

    constructor(
        patientId: string,
        diagnosis: string,
        treatment: string,
        notes: string,
        appointmentId?: string
    ) {
        if (!MedicalRecord.isValidText(diagnosis, 1, 100)) {
            throw new Error('Diagnosis must be between 1 and 100 characters.');
        }
        if (!MedicalRecord.isValidText(treatment, 1, 500)) {
            throw new Error('Treatment description must be between 1 and 500 characters.');
        }
        if (!MedicalRecord.isValidText(notes, 0, 500)) {
            throw new Error('Notes must be no more than 500 characters.');
        }

        this.id = Math.random().toString(36).substring(2);
        this.patientId = patientId;
        this.appointmentId = appointmentId;
        this.diagnosis = diagnosis.trim();
        this.treatment = treatment.trim();
        this.notes = notes.trim();
        this.recordDate = new Date();
    }

    static isValidText(text: string, minLength: number, maxLength: number): boolean {
        const trimmed = text.trim();
        return trimmed.length >= minLength && trimmed.length <= maxLength;
    }
}
