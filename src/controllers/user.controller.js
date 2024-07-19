import {asyncHandler} from "../utils/asyncHandler.js";
import { request, response } from "express";

const req = request();
const res = response();


const registerUser = asyncHandler ( async (req, res) => {
    res.status(200).jaon({
        message: "Ok"
    })
})

export { registerUser }