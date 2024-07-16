import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MONGODB connected !! DB Host: ${connectionInstance.connection.host}`);
        // console.log("connectionInstance from MongoDB: ", connectionInstance);
        //connectionInstance ne console.log() krvanu chhe as a knowledge.
    } catch (error) {
        console.log("MONGODB connection FIELD err", error);
        process.exit(1);
    }
}

export default connectDB;

// {timestamps: true} => it is giving createdAt & updatedAt
// createdAt is representing a date when this document was created.
// updatedAt is representing a date when this document was last updated.

