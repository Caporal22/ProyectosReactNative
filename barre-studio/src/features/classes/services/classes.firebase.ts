import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { BarreClass } from '../../../types/class';
import { ClassesRepository, CreateClassInput } from './classes.repository';

const COLLECTION = 'classes';

export const classesFirebaseRepo: ClassesRepository = {
  observeAll(callback) {
    const q = query(collection(db, COLLECTION), orderBy('date', 'asc'));
    return onSnapshot(q, (snap) => {
      const classes = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as BarreClass);
      callback(classes);
    });
  },

  async create(data: CreateClassInput) {
    await addDoc(collection(db, COLLECTION), {
      ...data,
      bookedBy: [],
      createdAt: Date.now(),
    });
  },

  async update(id, data) {
    await updateDoc(doc(db, COLLECTION, id), data);
  },

  async remove(id) {
    await deleteDoc(doc(db, COLLECTION, id));
  },

  async bookSlot(classId, userId) {
    // arrayUnion evita duplicados automáticamente
    await updateDoc(doc(db, COLLECTION, classId), {
      bookedBy: arrayUnion(userId),
    });
  },

  async cancelSlot(classId, userId) {
    await updateDoc(doc(db, COLLECTION, classId), {
      bookedBy: arrayRemove(userId),
    });
  },
};
