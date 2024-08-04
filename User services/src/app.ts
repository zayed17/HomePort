import express from 'express';
import userRoutes from './adapters/frameworks/routes/userRoutes';
import cors from 'cors'
import errorHandler from './infrastructure/middleware/ErrorMiddleware';


import { server } from './UserServer';
import * as grpc from '@grpc/grpc-js';

// function main() {
//  const res =  server.bindAsync('localhost:5001', grpc.ServerCredentials.createInsecure(), (error, port) => {
//       if (error) {
//           console.error('Server failed to start:', error);
          
//       }
//       console.log(`User service started on port ${port}`);
//   });
//   console.log(res,"res sceojs")
// }

// main();
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
