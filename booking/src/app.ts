import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bookingRoute from './adpaters/routes/BookingRoute';

import connectDB from './infrastrucuture/mongoDb/connection/connection';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use('/booking/booking', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/booking', bookingRoute);

const PORT = 5004; 
const startServer = async()=>{
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
startServer()