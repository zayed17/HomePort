import express from 'express';
import userRoutes from './adapters/frameworks/routes/userRoutes';
import cors from 'cors'
import errorHandler from './infrastructure/middleware/ErrorMiddleware';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS','PUT','PATCH'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
// main()
app.use(cors(corsOptions));
app.use(express.json());
app.use(cors(corsOptions));
app.use('/user', userRoutes);
app.use(errorHandler)

export default app;
