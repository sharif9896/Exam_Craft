import mongoose from "mongoose";

const mongodb = async () => {
    try{
        mongoose.connection.on("connected", () => {
            console.log("DB Connectd..");
        })
        await mongoose.connect(process.env.MONGODB_URI); 
    }catch(err){
        console.log("Error in DB Connection!", err);
    }
}
export default mongodb;