import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import adminRoutes from './adpaters/routes/Adminroute';
import subscriptionRoutes from './adpaters/routes/SubscriptionRoute';

import connectDB from './infrastructure/mongoDB/connection/connection';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use('/admin', adminRoutes);
app.use('/subscriptions', subscriptionRoutes);

const PORT = 5002; 
const startServer = async()=>{
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
startServer()