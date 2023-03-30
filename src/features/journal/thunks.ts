import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';

import { RootState } from '../../store/store';
import { FirebaseDB } from '../../firebase/config';
import { fileUpload } from '../../helpers';

export const createEmptyNote = createAsyncThunk('journal/createNote', async(obj, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { uid } = state.auth;
    
    try {
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        }

        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ) );
        await setDoc( newDoc, newNote );

        return {
            id: newDoc.id,
            ...newNote
        };
    } catch (error: any) {
        // Handle Errors here.
        const errorCode = error.code;
        console.log({ errorCode });
        const errorMessage = error.message;

        return rejectWithValue(errorMessage);
    }

});

export const getNotes = createAsyncThunk('journal/getNotes', async(obj, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { uid } = state.auth;

    try {
        const colRef = collection( FirebaseDB, `${uid}/journal/notes` );
        const docs = await getDocs( colRef );

        const notes: any[] = [];
        docs.forEach(doc => {
            notes.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        return notes;
    } catch (error: any) {
        // Handle Errors here.
        const errorCode = error.code;
        console.log({ errorCode });
        const errorMessage = error.message;

        return rejectWithValue(errorMessage);
    }
});

export const updateNote = createAsyncThunk('journal/updateNote', async(obj, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { activeNote } = state.journal;
    const { uid } = state.auth;

    try {
        const noteToFirestore = { ...activeNote };
        delete noteToFirestore.id;

        console.log(noteToFirestore);

        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${activeNote!.id}`);
        await setDoc(docRef, noteToFirestore, { merge: true });

        return {
            ...activeNote
        };
    } catch (error: any) {
        // Handle Errors here.
        const errorCode = error.code;
        console.log({ errorCode });
        const errorMessage = error.message;

        return rejectWithValue(errorMessage);
    }
});

export const uploadFiles = createAsyncThunk('journal/uploadFiles', async(files: Blob[], { getState, rejectWithValue }) => {
    const fileUploadPromises = [];
    for (const file of files) {
        fileUploadPromises.push( fileUpload(file) );
    }

    try {
        const imageUrls = await Promise.all( fileUploadPromises );

        return imageUrls;
    } catch (error) {
        console.log(error);
        throw new Error("Algo salio mal");
    }


});

export const deleteNote = createAsyncThunk('journal/deleteNote', async(obj, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const { uid } = state.auth;
    const { activeNote } = state.journal;

    try {
        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${activeNote!.id}`);
        await deleteDoc(docRef);

        return activeNote!.id;
    } catch (error: any) {
        // Handle Errors here.
        const errorCode = error.code;
        console.log({ errorCode });
        const errorMessage = error.message;

        return rejectWithValue(errorMessage);
    }
});