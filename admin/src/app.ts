import express from 'express';
import cors from 'cors';
import adminRoutes from './adpaters/frameWorks/routes/route';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use('/admin', adminRoutes); 


const PORT = 5002; 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

