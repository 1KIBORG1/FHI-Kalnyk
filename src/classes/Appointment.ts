export class Appointment {
    readonly id: string;
    readonly patientId: string;
    readonly doctorId: string;

    private _date: Date;
    description: string;
    status: 'new' | 'confirmed' | 'completed' | 'cancelled';

    constructor(patientId: string, doctorId: string, date: Date, description: string) {
        if (!Appointment.isValidDate(date)) {
            throw new Error('Appointment date and time cannot be in the past.');
        }
        if (!Appointment.isValidDescription(description)) {
            throw new Error('Description must be between 1 and 300 characters long.');
        }

        this.id = Appointment.generateUniqueId(); // Используем наш внутренний генератор
        this.patientId = patientId;
        this.doctorId = doctorId;
        this._date = date;
        this.description = description.trim();
        this.status = 'new';
    }

    static generateUniqueId(): string {
        return `${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;
    }

    get date(): Date {
        return this._date;
    }

    public setDate(newDate: Date) {
        if (!Appointment.isValidDate(newDate)) {
            throw new Error('New appointment date and time cannot be in the past.');
        }
        this._date = newDate;
    }

    static isValidDate(date: Date): boolean {
        const now = new Date();
        return date >= now; // Сравниваем с текущим моментом
    }

    static isValidStatus(status: string): status is 'new' | 'confirmed' | 'completed' | 'cancelled' {
        return ['new', 'confirmed', 'completed', 'cancelled'].includes(status);
    }

    static isValidDescription(description: string): boolean {
        return typeof description === 'string' && description.trim().length > 0 && description.trim().length <= 300;
    }
}
