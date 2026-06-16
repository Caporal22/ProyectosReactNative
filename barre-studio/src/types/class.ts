
export interface BarreClass {
  id: string;
  name: string;
  instructor: string;
  description: string;
  date: number;          
  durationMin: number;   
  capacity: number;      
  bookedBy: string[];    
  createdAt: number;
}

export interface BookingInput {
  classId: string;
  userId: string;
}