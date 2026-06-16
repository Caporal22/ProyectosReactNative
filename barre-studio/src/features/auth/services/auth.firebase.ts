import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../lib/firebase';
import { AppUser } from '../../../types/user';
import { AuthRepository, RegisterData } from './auth.repository';

export const authFirebaseRepo: AuthRepository = {
  async login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
  },

  async register({ email, password, fullName, phone }: RegisterData) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const appUser: AppUser = {
      uid: cred.user.uid,
      email,
      fullName,
      phone,
      role: 'client',
      createdAt: Date.now(),
    };
    await setDoc(doc(db, 'users', cred.user.uid), appUser);
  },

  async logout() {
    await signOut(auth);
  },

  async resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
  },

  observeAuth(callback) {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        callback(null);
        return;
      }
      // Hay sesión: traer datos extras de Firestore.
      const snap = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (snap.exists()) {
        callback(snap.data() as AppUser);
      } else {
        callback(null);
      }
    });
  },
};
