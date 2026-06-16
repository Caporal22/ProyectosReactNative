import { useEffect } from 'react';
import { useAuthStore } from '../../../store/useAuthStore';
import { authFirebaseRepo } from '../services/auth.firebase';

export function useAuthListener() {
  const setUser = useAuthStore((s) => s.setUser);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    const unsubscribe = authFirebaseRepo.observeAuth((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [setUser, setLoading]);
}
