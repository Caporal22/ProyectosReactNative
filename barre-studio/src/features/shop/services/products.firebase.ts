import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Product } from '../../../types/product';
import { ProductsRepository, CreateProductInput } from './products.repository';

const COLLECTION = 'products';

export const productsFirebaseRepo: ProductsRepository = {
  observeAll(callback) {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => {
      const products = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Product);
      callback(products);
    });
  },

  async create(data: CreateProductInput) {
    await addDoc(collection(db, COLLECTION), {
      ...data,
      createdAt: Date.now(),
    });
  },

  async update(id, data) {
    await updateDoc(doc(db, COLLECTION, id), data);
  },

  async remove(id) {
    await deleteDoc(doc(db, COLLECTION, id));
  },
};
