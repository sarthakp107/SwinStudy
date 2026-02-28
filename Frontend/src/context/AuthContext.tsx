import { createContext, useEffect, useReducer } from 'react';
import { apiFetch } from '../lib/apiClient';

export interface AuthUser {
  id: string;
  email: string;
  fullName?: string;
}

interface AuthState {
  user: AuthUser | null;
  /** True once we've finished the initial session check (/api/auth/me). Prevents flash of wrong content. */
  isAuthReady: boolean;
}

type AuthAction =
  | { type: 'LOGIN'; payload: AuthUser }
  | { type: 'LOGOUT' }
  | { type: 'SESSION_CHECKED'; payload: AuthUser | null };

interface AuthContextValue extends AuthState {
  login: (user: AuthUser) => void;
  logout: () => void;
}

const initialState: AuthState = {
  user: null,
  isAuthReady: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload, isAuthReady: true };
    case 'LOGOUT':
      return { user: null, isAuthReady: true };
    case 'SESSION_CHECKED':
      return { user: action.payload, isAuthReady: true };
    default:
      return state;
  }
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await apiFetch('/api/auth/me');
        if (!res.ok) {
          dispatch({ type: 'SESSION_CHECKED', payload: null });
          return;
        }
        const data = await res.json();
        if (data?.id && data?.email) {
          dispatch({
            type: 'SESSION_CHECKED',
            payload: {
              id: String(data.id),
              email: String(data.email),
              fullName: data.fullName ?? data.user_metadata?.full_name,
            },
          });
        } else {
          dispatch({ type: 'SESSION_CHECKED', payload: null });
        }
      } catch {
        dispatch({ type: 'SESSION_CHECKED', payload: null });
      }
    };
    checkSession();
  }, []);

  const login = (user: AuthUser) => dispatch({ type: 'LOGIN', payload: user });
  const logout = () => dispatch({ type: 'LOGOUT' });

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
