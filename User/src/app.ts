import express from 'express';
import userRoutes from './adapters/frameworks/routes/userRoutes';
import cors from 'cors'
import errorHandler from './infrastructure/middleware/ErrorMiddleware';

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'OPTIONS','PUT','PATCH'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use('/api/user/subscription', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use('/api/user', userRoutes);
app.use(errorHandler)

export default app;
