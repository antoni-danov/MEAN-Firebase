export class UpdateProfessional{
    phonenumber!: number;
    address!: {
        strNumber: number;
        addressLine: string;
        city: string;
        zipCode: number;
    };
    profession!: string;
}