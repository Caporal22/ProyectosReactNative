import { AppUser } from '../../../types/user';

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  phone: string;
}

export interface AuthRepository {
  login(email: string, password: string): Promise<void>;
  register(data: RegisterData): Promise<void>;
  logout(): Promise<void>;
  resetPassword(email: string): Promise<void>;
  observeAuth(callback: (user: AppUser | null) => void): () => void;
}