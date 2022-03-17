export class UpdateUser {
    phonenumber!: number;
    address!: {
        strNumber: number;
        addressLine: string;
        city: string;
        zipCode: number;
    };
}