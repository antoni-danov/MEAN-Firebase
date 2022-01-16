export class errorMessage{
    static fireBase(errorCode: string){
        switch(errorCode){
            case 'auth/too-many-requests':{
                return 'You was try to login too many times.';
            }
            case 'auth/user-disabled':{
                return 'Your account has been disabled.';
            }
            case 'auth/user-not-found': {
                return 'User is not found.';
            }
            case 'auth/invalid-email': {
                return 'You have entered an invalid username or password.';
            }
            case 'auth/wrong-password': {
                return 'You have entered an invalid username or password.';
            }
            case 'auth/email-already-in-use': {
                return 'This email already exist.';
            }
            default: {
                return 'Login error try again later.';
            }
        }
            
    }
}