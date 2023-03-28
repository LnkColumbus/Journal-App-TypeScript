import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { FirebaseAuth } from '../firebase/config';
import { useAppDispatch, useAppSelector } from '../store/hooks';

import { setUser, unSetUser } from '../features/auth';

export const useCheckAuth = () => {
    const { status } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async( user ) => {
            if ( !user ) return dispatch( unSetUser() );

            const { displayName, email, photoURL, uid } = user;
            dispatch( setUser({ displayName, email, photoURL, uid }) );
        })
    }, [])
  
    return {
        status
    }
}
