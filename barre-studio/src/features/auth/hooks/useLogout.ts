import { authFirebaseRepo } from '../services/auth.firebase';

export function useLogout() {
  async function logout() {
    await authFirebaseRepo.logout();
    // El listener observeAuth setea user=null --> _layout redirige a /login
  }
  return { logout };
}