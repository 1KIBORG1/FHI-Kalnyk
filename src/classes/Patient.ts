export class Patient {
    id: string;
    name: string;
    birthDate: Date;
    phone: string | undefined;

    constructor(name: string, birthDate: Date, phone?: string) {
        if (!Patient.isValidName(name)) {
            throw new Error('Invalid patient name. It must be 2-30 characters long and contain only letters and spaces (including Slovak characters).');
        }
        if (!Patient.isValidBirthDate(birthDate)) {
            throw new Error('Invalid birth date. The date must be in the past and the age cannot exceed 120 years.');
        }
        if (phone && !Patient.isValidPhone(phone)) {
            throw new Error('Invalid Slovak phone number format. Must be like +421 XXX XXX XXX.');
        }

        this.id = Math.random().toString(36).substring(2);
        this.name = name.trim();
        this.birthDate = birthDate;
        this.phone = phone;
    }

    static isValidName(name: string): boolean {
        if (typeof name !== 'string') return false;
        const trimmedName = name.trim();
        if (trimmedName.length < 2 || trimmedName.length > 30) return false;
        const nameRegex = /^[a-zA-ZáčďéíĺľňóôŕšťúýžÁČĎÉÍĹĽŇÓÔŔŠŤÚÝŽ\s]+$/;
        return nameRegex.test(trimmedName);
    }

    static isValidBirthDate(birthDate: Date): boolean {
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return birthDate < today && age >= 0 && age <= 120;
    }

    static isValidPhone(phone: string): boolean {
        const slovakPhoneRegex = /^\+421\s?(\d{3}\s?){2}\d{3}$/;
        return slovakPhoneRegex.test(phone);
    }
}
