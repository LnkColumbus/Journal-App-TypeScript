import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { INote } from '../../interfaces';

interface JournalState {
    isSaving: boolean;
    messageSaved: string;
    notes: INote[];
    activeNote: INote | null;
}

const initialState: JournalState = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    activeNote: null
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {},
  extraReducers: {}
});

export const {} = journalSlice.actions;