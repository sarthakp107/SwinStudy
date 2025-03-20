import { User } from "@supabase/supabase-js";
import { createContext, useEffect, useReducer } from "react";
import { supabase } from "../config/supabase-client"

interface AuthContextType {
    user: User | null;
    dispatch: React.Dispatch<AuthAction>;
}

interface AuthState {
    user: User | null;
    authIsChecked: boolean;
}

type AuthAction =
    | { type: 'LOGIN'; payload: User }
    | { type: 'LOGOUT' }
    | { type: 'AUTH_IS_CHECKED'; payload: User | null };

const initialState = {
    user: null,
    authIsChecked: false
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const authReducer = (state: AuthState, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        case 'AUTH_IS_CHECKED':
            return { user: action.payload, authIsChecked: true }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
            const user = session?.user || null;
            dispatch({ type: 'AUTH_IS_CHECKED', payload: user });
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}


