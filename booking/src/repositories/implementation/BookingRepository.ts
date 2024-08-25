import { BookingInterface } from '../interface/BookingInterface';
import { BookingData } from '../../entities/bookingEntity';
import BookingModal from '../../infrastrucuture/mongoDb/models/BookingModel';

export class BookingRepository implements BookingInterface {
  async findOneWithPopulation(filter: any,populate1:string,populate2:string): Promise<any | null> {
    return BookingModal.findOne(filter).populate(populate1).populate(populate2)
  }

  async updateOneWithPopulation(filter: any, updateData: Partial<BookingData>, populate1: string, populate2: string): Promise<any | null> {
    const updatedBooking = await BookingModal.findOneAndUpdate(filter, updateData, { new: true }).populate(populate1).populate(populate2);
    return updatedBooking;
  }
}