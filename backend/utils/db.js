import mongoose from "mongoose";

// const MONGO_URI="mongodb+srv://capstone40239:HTbp5N89VyrnxdJc@cluster0.dkna9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://honeymb916:54wkwBMxdvj24S2R@cluster0.qmos6.mongodb.net/";
const connectDB = async () => {
    try {
        console.log('connecting to mongodb');
        await mongoose.connect(MONGO_URI);
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;