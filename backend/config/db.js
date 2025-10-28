import mongoose from "mongoose";

const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('database connection is succesfully');
    } catch (error) {
        console.log('error to connect database');
    }
}

export default dbConnection;