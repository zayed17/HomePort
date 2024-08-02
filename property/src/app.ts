import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./infrastructure/mongodb/connection";
import propertyRoute from "./adpaters/routes/route";
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "OPTIONS","PATCH"],
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
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer()