import { MongoClient } from "mongodb";

export const initMongoDB = async (client: MongoClient) => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}