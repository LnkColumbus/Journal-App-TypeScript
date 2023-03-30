import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createEmptyNote, deleteNote, getNotes, updateNote, uploadFiles } from './thunks';
import { INote } from '../../interfaces';

interface JournalState {
    isSaving: boolean;
    messageSaved: string;
    notes: INote[];
    activeNote: INote | null;
    errorMessage: string | null;
}

const initialState: JournalState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    activeNote: null,
    errorMessage: null,
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    setActiveNote: (state, action: PayloadAction<INote>) => {
        state.activeNote = action.payload;
        state.messageSaved = '';
    },
    clearNotesLogout: (state) => {
        state.isSaving = false;
        state.messageSaved = '';
        state.notes = [];
        state.activeNote = null;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(createEmptyNote.pending, (state) => {
        state.isSaving = true;
        state.messageSaved = '';
    })
    .addCase(createEmptyNote.fulfilled, (state, action: PayloadAction<INote>) => {
        state.isSaving = false;
        state.notes.push(action.payload);
        state.activeNote = action.payload;
        state.messageSaved = 'Nota creada';
        state.errorMessage = null;
    })
    .addCase(createEmptyNote.rejected, (state, action: PayloadAction<any>) => {
        state.isSaving = false;
        state.errorMessage = action.payload;
    })
    .addCase(getNotes.fulfilled, (state, action: PayloadAction<INote[]>) => {
        state.notes = action.payload;
    })
    .addCase(getNotes.rejected, (state, action: PayloadAction<any>) => {
        state.errorMessage = action.payload;
    })
    .addCase(updateNote.pending, (state) => {
        state.isSaving = true;
        state.messageSaved = '';
    })
    .addCase(updateNote.fulfilled, (state, action: PayloadAction<any>) => {
        state.isSaving = false;
        state.notes = state.notes.map(note => {
            if (note.id === action.payload.id) {
                return action.payload;
            }

            return note;
        });
        state.messageSaved = 'Nota actualizada correctamente';
    })
    .addCase(updateNote.rejected, (state, action: PayloadAction<any>) => {
        state.isSaving = false;
        state.errorMessage = action.payload;
    })
    .addCase(uploadFiles.pending, (state) => {
        state.isSaving = true;
    })
    .addCase(uploadFiles.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.isSaving = false;
        state.activeNote!.imageUrls = [...state.activeNote!.imageUrls, ...action.payload ];
    })
    .addCase(uploadFiles.rejected, (state, action: PayloadAction<any>) => {
        state.isSaving = false;
        state.errorMessage = action.payload;
    })
    .addCase(deleteNote.pending, (state) => {
        state.messageSaved = '';
    })
    .addCase(deleteNote.fulfilled, (state, action: PayloadAction<string>) => {
        state.notes = state.notes.filter( note => note.id !== action.payload );
        state.messageSaved = 'Nota borrada correctamente';
        state.activeNote = null;
    })
    .addCase(deleteNote.rejected, (state, action: PayloadAction<any>) => {
        state.errorMessage = action.payload;
    })
  }
});

export const { clearNotesLogout, setActiveNote } = journalSlice.actions;