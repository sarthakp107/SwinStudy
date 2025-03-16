import {  User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../config/supabase-client"
import { Navigate } from "react-router-dom";


interface AuthContextType {
    user: User | null;
    signUpWithEmail: (email:string, password: string)=>Promise<void>;
    signInWithGithub: () => void; 
    signInWithGoogle: () => void;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({data : {session} }) => {
            setUser(session?.user ?? null);
        })

        //event listener
        const{data : listener} = supabase.auth.onAuthStateChange((_, session) => {
            setUser(session?.user ?? null);
        })
        

        return () => {
            listener.subscription.unsubscribe(); 
        }

    }, [])
    
    const signInWithGithub = () => {
        supabase.auth.signInWithOAuth({ provider: "github" })
    }
    const signInWithGoogle = () => {
        supabase.auth.signInWithOAuth({ provider: "google" })
    }

    const signUpWithEmail = async (email: string, password: string) => {

        const { error: signUpError } = await supabase.auth.signUp({ email, password });
    
        if (signUpError) throw signUpError;
    
        const { data: userCheck, error: checkError } = await supabase
          .from('profile') 
          .select('*')
          .eq('email', email)
          .single();
    
        if (checkError) throw checkError; 
    
        if (userCheck) {
          return; 
        } else {
          throw new Error('Email does not exist in the database');
        }
      };
    

    const signOut = async() => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            <Navigate to="/"/>
            
        } catch (err) {
            console.error("Sign-out error:", err);
        }
    }

    return <AuthContext.Provider value={{ user, signUpWithEmail, signInWithGithub, signInWithGoogle, signOut }}>{children}</AuthContext.Provider>
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("Must be used in the within the authprovider");
    }
    return context;
}