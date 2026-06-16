export type UserRole = 'admin' | 'client';

export interface AppUser {
  uid: string;
  email: string;
  fullName: string;
  phone: string;
  role: UserRole;
  createdAt: number;
}
