import { useEffect, useState } from 'react';
import {useAuthContext} from '../Context/useAuthContext';
import supabase from '@/config/supabase-client';


export const useEmailAuth = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState<string>()
    const [isPending, setIsPending] = useState(false)
    const { dispatch, user } = useAuthContext()


    //login to existing acc
    const signInWithPassword = async(email : string, password : string) => {
        setError("")
        setIsPending(true)

        try{
            const res = await supabase.auth.signInWithPassword({email,password});

            //can add online status

            if(res.data.user){
                dispatch({type: "LOGIN" , payload: res.data.user});
            } else{
                setError("No user found");
            } 
        }
        catch(err) {      
              setError("Invalid Login Credentials");
              setIsPending(false);
          }
    };

    //SIGNUP

    const signUpWithEmail = async(email:string, password: string, displayName: string) => {
        setError("");
        setIsPending(true);

        try {
            const res = await supabase.auth.signUp({email,password});

            if(!res){
                throw new Error("Could not complete signup.")
            }

            if(res.data.user){
               
                const displayNameResponse = await supabase.from('profile').upsert({
                    id: res.data.user.id,
                    displayName: displayName
                })

                if(displayNameResponse.error) throw displayNameResponse.error;
                
                if(user){
                    dispatch({type: "LOGIN", payload: user});
                }else{
                    setError("User is NULL");
                }
                setIsPending(false);

                if (!isCancelled) {
                    setIsPending(false);
                    setError("");
                  }
               
            }
            

            setIsPending(false);
        } catch (error) {
            setError("Signup Failed. Try Again");
            if (!isCancelled) {
                setError("signup with email hook wrong");
                setIsPending(false)
              }
        }
    }
    useEffect(() => {
        return () => setIsCancelled(true)
      }, [])

    return{signInWithPassword, signUpWithEmail, error, isPending}
}