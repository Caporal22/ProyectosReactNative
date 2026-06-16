import { BarreClass } from '../../../types/class';

export interface CreateClassInput {
  name: string;
  instructor: string;
  description: string;
  date: number;
  durationMin: number;
  capacity: number;
}

export interface ClassesRepository {
  observeAll(callback: (classes: BarreClass[]) => void): () => void;
  create(data: CreateClassInput): Promise<void>;
  update(id: string, data: Partial<CreateClassInput>): Promise<void>;
  remove(id: string): Promise<void>;
  bookSlot(classId: string, userId: string): Promise<void>;
  cancelSlot(classId: string, userId: string): Promise<void>;
}
