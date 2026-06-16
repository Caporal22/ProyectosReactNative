import { useState } from 'react';
import { authFirebaseRepo } from '../services/auth.firebase';

export function useResetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function resetPassword(email: string) {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await authFirebaseRepo.resetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(
        err.code === 'auth/user-not-found'
          ? 'No existe cuenta con ese correo'
          : 'Error al enviar el correo',
      );
    } finally {
      setLoading(false);
    }
  }

  return { resetPassword, loading, error, success };
}
