import { useState } from 'react';
import { authFirebaseRepo } from '../services/auth.firebase';
import { LoginForm } from '../schemas/auth.schemas';

function mapFirebaseError(code: string): string {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Correo o contraseña incorrectos';
    case 'auth/invalid-email':
      return 'Correo inválido';
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Espera unos minutos';
    case 'auth/network-request-failed':
      return 'Sin conexión a internet';
    default:
      return 'Ocurrió un error. Intenta de nuevo';
  }
}

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(data: LoginForm) {
    setLoading(true);
    setError(null);
    try {
      await authFirebaseRepo.login(data.email, data.password);
      // El listener observeAuth actualiza el store ---> _layout redirige a (app)
    } catch (err: any) {
      setError(mapFirebaseError(err.code ?? ''));
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}
