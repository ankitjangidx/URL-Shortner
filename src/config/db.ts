import mongoose from 'mongoose';
import { serverConfig } from './env';

const connectDB = async (): Promise<void> => {
  try {
    if (!serverConfig.mongoURI) {
      console.warn('⚠️ MONGO_URI is missing in environment configuration.');
      return;
    }
    const conn = await mongoose.connect(serverConfig.mongoURI);
    console.log(`🍃 MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

export default connectDB;