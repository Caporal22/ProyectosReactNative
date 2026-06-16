import { useState } from 'react';
import { authFirebaseRepo } from '../services/auth.firebase';
import { RegisterForm } from '../schemas/auth.schemas';

function mapErr(code: string): string {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Este correo ya está registrado';
    case 'auth/invalid-email':
      return 'Correo inválido';
    case 'auth/weak-password':
      return 'Contraseña muy débil';
    case 'auth/network-request-failed':
      return 'Sin conexión a internet';
    default:
      return 'Error al registrar. Intenta de nuevo';
  }
}

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function register(data: RegisterForm) {
    setLoading(true);
    setError(null);
    try {
      await authFirebaseRepo.register(data);
    } catch (err: any) {
      setError(mapErr(err.code ?? ''));
    } finally {
      setLoading(false);
    }
  }

  return { register, loading, error };
}
