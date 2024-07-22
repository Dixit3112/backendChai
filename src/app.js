import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import connectDB from "./db/index.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"})); // provides object's object
app.use(express.static("public"));
app.use(cookieParser());

//routes import


// routes declaration 
app.use("/api/v1/users", userRouter);   // http://localhost:8000/api/v1/users/register

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
    console.log("MONGO db connection failed !!! ", err);
})
// cors:- Cross Origin Resource Source
// module.exports { app }
// 08:30 hrs

export { app }