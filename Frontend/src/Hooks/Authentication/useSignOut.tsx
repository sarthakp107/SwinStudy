import { useEffect, useState } from 'react';
import { useAuthContext } from '../Context/useAuthContext';
import { apiFetch } from '@/lib/apiClient';

export const useSignOut = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { logout } = useAuthContext();

  const signOut = async () => {
    setError(null);
    setIsPending(true);
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' });
      if (!isCancelled) logout();
    } catch (err: unknown) {
      if (!isCancelled) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      }
    } finally {
      if (!isCancelled) setIsPending(false);
    }
  };

  useEffect(() => () => setIsCancelled(true), []);

  return { signOut, isPending, error };
};
