import { useEffect, useState } from 'react';
import { useAuthContext } from '../Context/useAuthContext';
import supabase from '@/config/supabase-client';
import { useNavigate } from 'react-router-dom';


export const useEmailAuth = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState<string | null>()
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate();


    //login to existing acc
    const signInWithPassword = async (email: string, password: string) => {
        setError(null)
        setIsPending(true)

        try {
            const res = await supabase.auth.signInWithPassword({ email, password });

            //can add online status

            if (res.data.user) {
                console.log(res.data);
                navigate("/survey")
                dispatch({ type: "LOGIN", payload: res.data.user });
            } else {
                setError(res.error?.message);
            }
        }
        catch (err) {
            setError("Invalid Login Credentials");
            setIsPending(false);
        } finally {
            setIsPending(false);
        }
    };

    //SIGNUP

    const signUpWithEmail = async (email: string, password: string, displayName: string) => {
        setError(null);
        setIsPending(true);

        try {
            const { data, error } = await supabase.auth.signUp({ email, password });

            if (error) {
                throw new Error(error.message)
            }

            if (data.user) {
                const user = data.user;

                const displayNameResponse = await supabase.from('profile').upsert({
                    id: user.id,
                    display_name: displayName
                })
                console.log("User ID:", user.id);
                console.log("Display Name:", displayName);


                if (displayNameResponse.error) throw displayNameResponse.error.message;

                if (user) {
                    dispatch({ type: "LOGIN", payload: user });
                    // navigate("/survey")
                } else {
                    setError(error);
                }
                setIsPending(false);

                if (!isCancelled) {
                    setIsPending(false);
                    setError(null);
                }

            }
            setIsPending(false);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
                setIsPending(false);
            } else {
                setError("An unknown error occurred.");
                setIsPending(false);
            }
        } finally {
            if (!isCancelled) {
                setIsPending(false);
            }
        }
    }
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { signInWithPassword, signUpWithEmail, error, isPending }
}