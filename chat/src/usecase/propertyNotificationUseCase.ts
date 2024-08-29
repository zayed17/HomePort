export class PropertyNotificationUseCase {
    createBookingNotification(bookingData: any) {
      return {
        type: 'booked',
        message: `Your property has been booked! Booking ID: ${bookingData.bookingId}`,
      };
    }
  
    createRejectionNotification(rejectionData: any) {
      return {
        type: 'rejected',
        message: `Your property has been rejected. Reason: ${rejectionData.reason}`,
      };
    }
  
    createVerificationNotification() {
      return {
        type: 'verified',
        message: 'Your property has been verified.',
      };
    }
  }