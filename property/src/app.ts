// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import http from 'http';
// import { Server as SocketIOServer } from 'socket.io';
// import connectDB from "./infrastructure/mongodb/connection";
// import propertyRoute from "./adpaters/routes/route";
// import { startConsumers } from "./adpaters/messaging/consumerStartup";

// const app = express();
// const server = http.createServer(app);
// export const io = new SocketIOServer(server);


// io.on('connection', (socket) => {
//   console.log('A user connected: ', socket.id);

//   socket.on('disconnect', () => {
//       console.log('A user disconnected: ', socket.id);
//   });
// });

// const corsOptions = {
//   origin: "http://localhost:5173",
//   methods: ["GET", "POST", "OPTIONS","PATCH"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
// };
// app.use(cors(corsOptions));

// app.use(express.json());
// app.use(cookieParser());

// app.use("/property", propertyRoute);

// const PORT = 5003;

// const startServer = async () => {
//   await connectDB();
//   server.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//   });
//   // startConsumers().catch(error => console.error("Failed to start the consumer:", error));

// };

// startServer()



import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import connectDB from "./infrastructure/mongodb/connection";
import propertyRoute from "./adpaters/routes/route";
// import { startConsumers } from "./adpaters/messaging/consumerStartup";

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO server with CORS options
export const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('A user connected: ', socket.id);

  socket.on('disconnect', () => {
      console.log('A user disconnected: ', socket.id);
  });
});

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/property", propertyRoute);

const PORT = 5003;

const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  
  // startConsumers().catch(error => console.error("Failed to start the consumer:", error));
};

startServer();