import { useEffect, useState } from 'react';
import {useAuthContext} from '../Context/useAuthContext';
import supabase from '@/config/supabase-client';

export const useSignOut = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext();

    const signOut = async() => {
        setError(null);
        setIsPending(true);
        try {
            await supabase.auth.signOut();
            dispatch({type: "LOGOUT"})

            setIsPending(false);
            setError(null);

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
              }
        } catch (error : any) {
            if (!isCancelled) {
                setError(error?.message || "An unknown error has occured.");
                setIsPending(false)
              }
        }
    }
    useEffect(() => {
        return () => setIsCancelled(true)
      }, [])

      return {signOut,isPending, error}
}