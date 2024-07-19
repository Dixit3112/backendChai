import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const healthCheck = asyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse(true, "Server is running"));

    // Example of throwing an error:
    // throw new ApiError("Server Error", 500);
    //TODO: build a healthcheck response that simply returns the OK status as json with a message
    // indicating the server is up and running
    // Implement a health check endpoint that checks for database connectivity, server status, etc.
    // If any of these checks fail, throw an ApiError with a relevant error message and status code
})

export { healthCheck };