import { useEffect, useState } from 'react';
import { useAuthContext } from '../Context/useAuthContext';
import { apiFetch } from '@/lib/apiClient';

export const useEmailAuth = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { login } = useAuthContext();

  const signInWithPassword = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    setIsPending(true);
    try {
      const res = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Login failed');
      const { user } = data;
      if (!user) throw new Error('Invalid response');
      if (!isCancelled) {
        login({
          id: String(user.id),
          email: String(user.email),
          fullName: user.fullName,
        });
        setError(null);
        return true;
      }
      return false;
    } catch (err) {
      if (!isCancelled) setError(err instanceof Error ? err.message : 'Invalid Login Credentials');
      return false;
    } finally {
      if (!isCancelled) setIsPending(false);
    }
  };

  const signUpWithEmail = async (email: string, password: string, displayName: string): Promise<boolean> => {
    setError(null);
    setIsPending(true);
    try {
      const res = await apiFetch('/api/auth/register', {
        method: 'POST',
        body: { name: displayName, email, password },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Registration failed');
      const { user } = data;
      if (!user) throw new Error('Invalid response');
      if (!isCancelled) {
        login({
          id: String(user.id),
          email: String(user.email),
          fullName: user.fullName,
        });
        setError(null);
        return true;
      }
      return false;
    } catch (err) {
      if (!isCancelled) setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      return false;
    } finally {
      if (!isCancelled) setIsPending(false);
    }
  };

  useEffect(() => () => setIsCancelled(true), []);

  return { signInWithPassword, signUpWithEmail, error, isPending };
};
