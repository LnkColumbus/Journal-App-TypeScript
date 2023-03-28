import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile
} from 'firebase/auth';

import { FirebaseAuth } from '../../firebase';

export const authRegister = createAsyncThunk<
    any,
    { displayName: string, email: string, password: string }
>('auth/register', async({ displayName, email, password }, { rejectWithValue }) => {
    try {
        const res = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        console.log({ res });
        const { photoURL, uid } = res.user;
        await updateProfile( FirebaseAuth.currentUser!, { displayName });
        return {
            ok: true,
            displayName,
            email,
            password,
            photoURL,
            uid
        }
    } catch (error: any) {
        // Handle Errors here.
        const errorCode = error.code;
        console.log({ errorCode });
        const errorMessage = error.message;

        return rejectWithValue(errorMessage);
    }
});

export const authLogin = createAsyncThunk<
    any,
    { email: string, password: string }
>('auth/login', async({ email, password }, { rejectWithValue }) => {
    try {
        const response = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { displayName, photoURL, uid } = response.user;
        return {
            ok: true,
            displayName,
            email,
            password,
            photoURL,
            uid
        }
    } catch (error: any) {
        // Handle Errors here.
        const errorCode = error.code;
        console.log({ errorCode });
        const errorMessage = error.message;

        return rejectWithValue(errorMessage);
    }
});

export const loginWithGoogle = createAsyncThunk('auth/google', async(obj, { rejectWithValue }) => {
    const googleAuthProvider = new GoogleAuthProvider();
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

        return rejectWithValue(errorMessage);
    }
});

export const authLogout = createAsyncThunk('auth/logout', async(obj, { rejectWithValue }) => {
    try {
        await FirebaseAuth.signOut();
        return {
            ok: true
        }
    } catch (error: any) {
        // Handle Errors here.
        const errorCode = error.code;
        console.log({ errorCode });
        const errorMessage = error.message;

        return rejectWithValue(errorMessage);
    }
})