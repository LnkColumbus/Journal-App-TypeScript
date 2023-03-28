import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authLogin, authRegister, loginWithGoogle } from './';
import { authLogout } from './thunks';

interface AuthState {
  status: string; // 'checking' | 'not-authenticated' | 'authenticated';
  uid: null | string;
  email: null | string;
  displayName: null | string;
  photoURL: null | string;
  errorMessage: null | string;
}

const initialState: AuthState = {
  status: 'checking',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
}

type FirebaseUser = {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string;
}

type Result =
| {
  ok: boolean;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string;
  errorMessage?: undefined;
} | {
  ok: boolean;
  errorMessage: any;
  displayName?: undefined;
  email?: undefined;
  photoURL?: undefined;
  uid?: undefined;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<FirebaseUser>) => {
      state.status = 'authenticated';
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL;
      state.uid = action.payload.uid;
    },
    unSetUser: (state) => {
      state.status = 'not-authenticated';
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.status = 'checking';
      })
      .addCase(loginWithGoogle.fulfilled, (state, action: PayloadAction<Result>) => {
        state.status = 'authenticated';
        state.uid = action.payload.uid!;
        state.email = action.payload.email!;
        state.displayName = action.payload.displayName!;
        state.photoURL = action.payload.photoURL!;
        state.errorMessage = null;
      })
      .addCase(loginWithGoogle.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'not-authenticated';
        state.errorMessage = action.payload;
        state.uid = null;
        state.email = null;
        state.displayName = null;
        state.photoURL = null;
      })
      .addCase( authRegister.pending, (state) => {
        state.status = 'checking';
      })
      .addCase( authRegister.fulfilled, (state, action: PayloadAction<Result>) => {
        state.status = 'authenticated';
        state.uid = action.payload.uid!;
        state.email = action.payload.email!;
        state.displayName = action.payload.displayName!;
        state.photoURL = action.payload.photoURL!;
        state.errorMessage = null;
      })
      .addCase( authRegister.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'not-authenticated';
        state.errorMessage = action.payload;
        state.uid = null;
        state.email = null;
        state.displayName = null;
        state.photoURL = null;
      })
      .addCase( authLogin.pending, (state) => {
        state.status = 'checking';
      })
      .addCase( authLogin.fulfilled, (state, action: PayloadAction<Result>) => {
        state.status = 'authenticated';
        state.uid = action.payload.uid!;
        state.email = action.payload.email!;
        state.displayName = action.payload.displayName!;
        state.photoURL = action.payload.photoURL!;
        state.errorMessage = null;
      })
      .addCase( authLogin.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'not-authenticated';
        state.errorMessage = action.payload;
        state.uid = null;
        state.email = null;
        state.displayName = null;
        state.photoURL = null;
      })
      .addCase( authLogout.pending, (state) => {
        state.status = 'checking';
      })
      .addCase( authLogout.fulfilled, (state) => {
        state.status = 'not-authenticated';
        state.uid = null;
        state.email = null;
        state.displayName = null;
        state.photoURL = null;
      })
      .addCase( authLogout.rejected, (state) => {
        state.status = 'authenticated';
      })
  }
});

export const { setUser, unSetUser } = authSlice.actions;