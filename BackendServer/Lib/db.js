import mongoose from "mongoose";

// connect to the mongoDb server 
export const connectDB = async() => {
    try{
        mongoose.connection.on('connected', ()=> 
            console.log("Database connected")
        );
        await mongoose.connect(`${process.env.MongoDb_URI}/ChatGo`)
    }catch(error){
        console.log("error");
    }
}