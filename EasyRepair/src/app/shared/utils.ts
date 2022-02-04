import { AbstractControl, FormControl } from "@angular/forms";
import { emailVerification } from '../services/auth/auth.service';

export class RegisterValidators {
    static equalPasswords(password: string) {
        return (control: AbstractControl): { [key: string]: boolean } | null => {

            const initialPassword = control.parent?.get(password)?.value;
            const controlPassword = control.value;

            if (control.value !== null && initialPassword !== controlPassword) {
                return { 'equalPasswords': true }
            }

            return null;
        }
    };
    static WhiteSpacesNotAllowed(control: FormControl) {
        const isWhiteSpace = control.value.trim().length === 0;
        const isValid = !isWhiteSpace;
        return isValid ? null : { 'WhiteSpacesNotAllowed': true };
    }
    static async CheckForEmail(control: FormControl) { //TODO

        var check: boolean = false;

        var result = await emailVerification(control.value.trim()).then(doc => {
            check = doc;
        });

        return check ? { 'CheckForEmail': true } : null;

    }
}