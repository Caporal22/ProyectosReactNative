import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCdeDsYUerJbSASZnDAJ5Cz43JtqLmuRnk',
  authDomain: 'proyectofinalmoviles-2d306.firebaseapp.com',
  projectId: 'proyectofinalmoviles-2d306',
  storageBucket: 'proyectofinalmoviles-2d306.firebasestorage.app',
  messagingSenderId: '24115977433',
  appId: '1:24115977433:web:b75168961134794d6572c8',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
