import { Product, ProductCategory } from '../../../types/product';

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  stock: number;
  imageUrl?: string;
}

export interface ProductsRepository {
  observeAll(callback: (products: Product[]) => void): () => void;
  create(data: CreateProductInput): Promise<void>;
  update(id: string, data: Partial<CreateProductInput>): Promise<void>;
  remove(id: string): Promise<void>;
}
