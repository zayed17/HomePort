import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async (): Promise<void> => {
  const mongoUrl = process.env.MONGO_URL!;
  if (!mongoUrl) {
    throw new Error('MONGO_URI environment variable is not set');
  }

  try {
    await mongoose.connect(mongoUrl)
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDB;