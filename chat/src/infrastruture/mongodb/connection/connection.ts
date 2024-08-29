import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI!;

  try {
    await mongoose.connect(mongoUri)
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDB;