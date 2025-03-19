import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useReducer } from "react";
import { supabase } from "../config/supabase-client"

// signInWithPassword: (email: string, password:string)=>Promise<void>;
//     signUpWithEmail: (email:string, password: string)=>Promise<void>;
//     signInWithGithub: () => void; 
//     signInWithGoogle: () => void;
//     signOut: () => void;

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

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

//     const [user, setUser] = useState<User | null>(null);

//     useEffect(() => {
//         supabase.auth.getSession().then(({data : {session} }) => {
//             setUser(session?.user ?? null);
//         })

//         //event listener
//         const{data : listener} = supabase.auth.onAuthStateChange((_, session) => {
//             setUser(session?.user ?? null);
//         })


//         return () => {
//             listener.subscription.unsubscribe(); 
//         }

//     }, [])

//     const signInWithGithub = () => {
//         supabase.auth.signInWithOAuth({ provider: "github" })
//     }
//     const signInWithGoogle = () => {
//         supabase.auth.signInWithOAuth({ provider: "google" })
//     }

//     const signUpWithEmail = async (email: string, password: string) => {

//         const { error: signUpError } = await supabase.auth.signUp({ email, password });

//         if (signUpError) throw signUpError;

//         const { data: userCheck, error: checkError } = await supabase
//           .from('profile') 
//           .select('*')
//           .eq('email', email)
//           .single();

//         if (checkError) throw checkError; 

//         if (userCheck) {
//           return; 
//         } else {
//           throw new Error('Email does not exist in the database');
//         }
//     };

//     const signInWithPassword= async(email: string, password: string) =>{
//         const { error: loginError} = await supabase.auth.signInWithPassword({email, password})
//         if (loginError) throw loginError;
//     }

//     const signOut = async() => {
//         try {
//             const { error } = await supabase.auth.signOut();
//             if (error) throw error;
//             <Navigate to="/login"/>

//         } catch (err) {
//             console.error("Sign-out error:", err);
//         }
//     }

//     return <AuthContext.Provider value={{ user, signUpWithEmail, signInWithGithub, signInWithGoogle, signInWithPassword, signOut }}>{children}</AuthContext.Provider>
// };

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("Must be used in the within the authprovider");
    }
    return context;
}