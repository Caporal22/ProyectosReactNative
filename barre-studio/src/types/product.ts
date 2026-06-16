export type ProductCategory = 'bebida' | 'termo' | 'calceta' | 'otro';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  stock: number;
  imageUrl?: string;
  createdAt: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
