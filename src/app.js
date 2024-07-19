import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    
}));

app.use(express.json({limit: "32kb"}))
app.use(express.urlencoded({extended: true, limit: "32kb"})) // provides object's object
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from "./routes/user.routes.js";


// routes declaration // http://localhost:8000/api/v1/users/...
app.use("/api/v1/users", userRouter);   // http://localhost:8000/api/v1/users/register

// cors:- Cross Origin Resource Source
export { app }

// res.send((error, req, res, next) => {
//     //next is provide as middleware
// })
// 08:40 hrs