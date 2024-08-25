import { BookingData } from '../../entities/bookingEntity';

export interface BookingInterface {
  findOneWithPopulation(filter: any,populate1:string,populate2:string): Promise<BookingData | null>;
  updateOneWithPopulation(filter: any, updateData: Partial<BookingData>, populate1: string, populate2: string): Promise<BookingData | null>;

}