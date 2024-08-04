import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import cookieParser from 'cookie-parser'
dotenv.config();



const PORT = process.env.PORT || 5001;
const MONGO_URL = process.env.MONGO_URL || ""
app.use(cookieParser());

mongoose.connect(MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});
