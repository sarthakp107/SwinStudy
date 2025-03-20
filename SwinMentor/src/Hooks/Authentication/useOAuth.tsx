import { useEffect, useState } from 'react';
import supabase from '@/config/supabase-client';

export const useOAuth = () => {

    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState<string>()
    const [isPending, setIsPending] = useState(false)

    const signInWithGithub = async() => {
        setError("");
        setIsPending(true);

        try {
            const res = await supabase.auth.signInWithOAuth({
                provider: 'github'
            });
            if (res.error) {
                throw res.error;
            }
            setIsPending(false);  
            
            if (!isCancelled) {
                setIsPending(false)
                setError("")
              }
            
        } catch (error) {
            if (!isCancelled) {
                setError("error in signing up with github")
                setIsPending(false)
              }
        }
    }

    const signInWithGoogle = async () =>{
        setError("");
        setIsPending(true);

        try {
            const res = await supabase.auth.signInWithOAuth({
                provider: 'google'
            });
            if (res.error) {
                throw res.error;
            }
            setIsPending(false);  
            
            if (!isCancelled) {
                setIsPending(false)
                setError("")
              }
            
        } catch (error) {
            if (!isCancelled) {
                setError("error in signing up with google")
                setIsPending(false)
              }
        }

    }
    useEffect(() => {
        return () => setIsCancelled(true)
      }, [])

      return {signInWithGithub,signInWithGoogle, error, isPending}
};
