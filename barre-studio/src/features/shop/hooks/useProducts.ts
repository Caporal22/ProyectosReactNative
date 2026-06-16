import { useEffect, useState } from 'react';
import { Product } from '../../../types/product';
import { productsFirebaseRepo } from '../services/products.firebase';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = productsFirebaseRepo.observeAll((data) => {
      setProducts(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { products, loading };
}
