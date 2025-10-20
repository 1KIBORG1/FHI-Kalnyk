export class Doctor {
    id: string;
    name: string;
    specialization: string;
    email: string | undefined;

    constructor(name: string, specialization: string, email?: string) {
        if (!Doctor.isValidName(name)) {
            throw new Error('Invalid doctor name. It must be 2-30 characters long and contain only letters and spaces.');
        }
        if (!Doctor.isValidSpecialization(specialization)) {
            throw new Error('Invalid specialization. It must be 2-50 characters long.');
        }
        if (email && !Doctor.isValidEmail(email)) {
            throw new Error('Invalid email format.');
        }

        this.id = Math.random().toString(36).substring(2);
        this.name = name.trim();
        this.specialization = specialization.trim();
        this.email = email;
    }

    static isValidName(name: string): boolean {
        if (typeof name !== 'string') return false;
        const trimmedName = name.trim();
        if (trimmedName.length < 2 || trimmedName.length > 30) return false;
        const nameRegex = /^[a-zA-ZáčďéíĺľňóôŕšťúýžÁČĎÉÍĹĽŇÓÔŔŠŤÚÝŽ\s]+$/;
        return nameRegex.test(trimmedName);
    }

    static isValidSpecialization(spec: string): boolean {
        if (typeof spec !== 'string') return false;
        const trimmedSpec = spec.trim();
        if (trimmedSpec.length < 2 || trimmedSpec.length > 50) return false;
        const specRegex = /^[a-zA-ZáčďéíĺľňóôŕšťúýžÁČĎÉÍĹĽŇÓÔŔŠŤÚÝŽ\s]+$/;
        return specRegex.test(trimmedSpec);
    }

    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
