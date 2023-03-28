import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleAuthProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    googleAuthProvider.setCustomParameters({
        prompt: 'select_account'
    });
    try {
        const result = await signInWithPopup( FirebaseAuth, googleAuthProvider );
        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            // User Info
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error: any) {
        // Handle Errors here.
        const errorCode = error.code;
        console.log({ errorCode });
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }
}