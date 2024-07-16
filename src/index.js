// import mongoose from "mongoose";
// import {DB_NAME} from "./constants.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./env"
});
// improved version of "dotenv" is given below.
// require('dotenv').config({path:'./env'});

const port = process.env.PORT || 8000;
// console.log("Process.env of env file: ", process.env) // it gives the object of data of this project's.

connectDB()
.then(()=> {
    app.on('Error', (err) => {
        console.error(`Server error: ${err.message}`);
        throw err;
    })

    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    });
})
.catch((err) =>{
    console.log("Mongo connection failed!!", err);
})





































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




