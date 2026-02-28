import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

/**
 * Hook to access auth state and actions.
 * - user: Current user or null
 * - isAuthReady: True once initial session check is done (avoids flash of wrong content)
 * - login / logout: Update auth state
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within AuthContextProvider');
  }

  return context;
};
