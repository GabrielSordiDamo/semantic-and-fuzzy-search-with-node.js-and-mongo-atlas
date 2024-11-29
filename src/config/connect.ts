import mongoose from "mongoose";


export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI!, {
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB", err);
        process.exit(1);
    }
};
