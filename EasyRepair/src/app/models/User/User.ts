export class User {
    uid: any;
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
    role!: string;
}