import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
    const channelId = req.params.channelId;
    const videoCount = await Video.countDocuments({ channelId });
    const subscriptionCount = await Subscription.countDocuments({ channelId });
    const likeCount = await Like.countDocuments({ channelId });
    const response = new ApiResponse(200, { videoCount, likeCount, subscriptionCount });
    res.send(response);
})

const getChannelVideos = asyncHandler(async (req, res) => {
    const channelId = req.params.channelId;
    const videos = await Video.find({ channelId }).sort({ createdAt: -1 });
    const response = new ApiResponse(200, videos);
    res.send(response);
});

export { getChannelStats, getChannelVideos }
