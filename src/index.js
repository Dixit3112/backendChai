
// require('dotenv').config({path:'./env'});
import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
// import { app } from "./app.js";

const app = express();

app.use("/api/v1/users", userRouter); 


dotenv.config({
    path: "./env"
});

const port = process.env.PORT || 8000;
// console.log("Process.env of env file: ", process.env) // it gives the object of data of this project's.

connectDB()
.then(()=> {
    app.get("", (req, res) => {
        res.send(res.json({ Info: "I am dixit for backend developer" })); // get method done with json format
    })
    app.listen(port, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
})
.catch((err) =>{
    console.log("MONGO db connection failed !!!", err);
})



/*
import express from "express"
const app = express()
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()

*/

