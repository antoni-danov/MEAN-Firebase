import { AbstractControl, FormControl } from "@angular/forms";

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
}