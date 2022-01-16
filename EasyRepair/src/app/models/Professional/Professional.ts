export class Professional{
    firstname!: string;
    lastname!: string;
    email!: string;
    phonenumber!: number;
    address!: {
        strNumber: number;
        addressLine: string;
        city: string;
        zipCode: number;
    };
    profession!: string;
    role!: string;
}