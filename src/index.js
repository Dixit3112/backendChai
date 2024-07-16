// import mongoose from "mongoose";
// import {DB_NAME} from "./constants.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./env"
});
// improved version of "dotenv" is given below.
// require('dotenv').config({path:'./env'});


console.log("Process.env of env file: ", process.env)


connectDB();






































// use
// trycatch Loop OR Promise(resolve,reject) method

// use IFFE => "()()" method => for immmidiately function called

// connectDB()

// import express from "express";
// const app = express();

// ( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("Error", (error) => {
//             console.error("Err: ", error);
//             throw error;
//         });
//         app.listen(process.env.PORT, () => {
//             console.log(`App is listning on the port ${process.env.PORT}`);
//         });
//     } catch (error) {
//         console.error("ERROR: ", error);
//     }
// })() 




