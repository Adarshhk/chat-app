import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to Database. ")
    } catch (error) {
        console.log("Error connecting to MongoDB" , error.message)
    }
}