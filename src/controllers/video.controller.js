import mongoose, {isValidObjectId}  from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId} = req.query;

    //get all videos based on query, sort, padination
    let videos;
    if(userId) {
        videos = await Video.find({userId: userId}).populate('user', 'username').sort({[sortBy]: sortType}).skip((page - 1) * limit).limit(limit);
    } else {
        videos = await Video.find({title: {$regex: query, $options: 'i'}}).populate('user', 'username').sort({[sortBy]: sortType}).skip((page - 1) * limit).limit(limit);
    };
    
    //calculate total count of videos
    const count = await Video.countDocuments({title: {$regex: query, $options: 'i'}});
    
    //send response
    res.status(200).json(ApiResponse.success(videos, count));
});

const publishVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const video = await Video.create({ title, description, user: req.user._id });

    // get video upload to cloudinary, create video
    const { secure_url } = await uploadOnCloudinary(req.file.path);
    await Video.findByIdAndUpdate(video._id, { videoUrl: secure_url }, { new: true });
    
    // send response
    res.status(201).json(ApiResponse.success(video));
});

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    // get video by id
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, 'Invalid video id');
    }
    const video = await Video.findById(videoId).populate('user', 'username');
    
    // send response
    res.status(200).json(ApiResponse.success(video));
});

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    // update video details like title, description, thumbnail
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, 'Invalid video id');
    }
    const video = await Video.findByIdAndUpdate(videoId, req.body, { new: true }).populate('user', 'username');
    
    // send response
    res.status(200).json(ApiResponse.success(video));
});

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    // delete video by id
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, 'Invalid video id');
    }
    await Video.findByIdAndDelete(videoId);

    // send response
    res.status(200).json(ApiResponse.success({ message: 'Video deleted successfully' }));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    // toggle publish status of video by id
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, 'Invalid video id');
    }
    const video = await Video.findByIdAndUpdate(videoId, { isPublished:!req.body.isPublished }, { new: true }).populate('user', 'username');
    
    // send response
    res.status(200).json(ApiResponse.success(video));
});


export { getAllVideos, publishVideo, getVideoById, updateVideo, deleteVideo, togglePublishStatus };