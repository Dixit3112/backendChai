import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const fileData= asyncHandler(async (eq, res) => {
    res.status(200).json({apiData: [
        { id: 1, fullname: "John Doe", emiall: "fesf@gmail.com", username: "Doe1", password: "456@Doe" },
        { id: 2, fullname: "Jane Doe", emiall: "svdfa@gmail.com", username: "Doe2", password: "456@Doe2" },
        { id: 3, fullname: "Alice Doe", emiall: "afeaa@gmail.com", username: "Doe3", password: "456@Doe3" },
        { id: 4, fullname: "Bob Doe", emiall: "aedrt@gmail.com", username: "Doe4", password: "456@Doe4" },
        { id: 5, fullname: "Charlie Doe", emiall: "nbsef@gmail.com", username: "Doe5", password: "456@Doe5" }
    ] })
})


// get user details from frontend
// validation - not empty
// check if user alreeady exists: username, email
// check for images, check foe avatar
// upload theme to cloudinary, avatar
// create user object - create entry in db
// remove password and refresh token field from response
// check for user creation
// return res

const registerUser = asyncHandler ( async (req, res) => {
    const { fullname, email, username, password } = req.body;
    console.log("email: ", email);

    if ([fullname, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    console.log("request files: ", req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocaPath = req.files?.coverImage[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocaPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required");
    }

    const user = await User.create({ 
        fullname, 
        avatar: avatar.url, 
        coverImage: coverImage?.url || "", 
        email, 
        password, 
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

    return res.status(200).json(
        new ApiResponse(200, createdUser, "user registered successfully" )
    )
})

export { registerUser, fileData }
