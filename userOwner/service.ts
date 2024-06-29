import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 5001;
const MONGO_URL = "mongodb+srv://mzayed9745:mohammadzayed9745@projectcluster.dozic4b.mongodb.net/?retryWrites=true&w=majority&appName=ProjectCluster"

mongoose.connect(MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});
