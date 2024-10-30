import mongoose from 'mongoose';
const db = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/echoDB');
        console.log('Database connected');
        return mongoose.connection;
    }
    catch (error) {
        console.log('Database connection failed');
        throw new Error(error instanceof Error ? error.message : String(error));
    }
};
export default db;
