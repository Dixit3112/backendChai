import mongoose, {isValidObjectId}  from "mongoose";
import { asyncHandler } from "../utils/asyncHandler";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params;
    const video = await Video.findByIdAndUpdate(videoId, {
        $inc: {likes: req.body.like? 1 : -1}
    }, {new: true});
});
const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params;
    const comment = await Comment.findByIdAndUpdate(commentId, {
        $inc: {likes: req.body.like? 1 : -1}
    }, {new: true});
});
const getLikeVideos = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const videos = await Video.find({likes: {$gt: 0}, userId}).sort({likes: -1}).limit(10);
    res.json(videos);
})

export { toggleCommentLike, toggleVideoLike, getLikeVideos }