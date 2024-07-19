import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
    // Todo: get all comments for all video
    const { videoId } = req.params
    const { page = 1, limit = 10 } = req.query
});

const addComment = asyncHandler((req, res) => {
    // Todo: add a comment to the video
    const { videoId } = req.params
    const { content } = req.body
});

const updateComment = asyncHandler(async (req, res) => {
    // Todo: update a comment
    const { commentId } = req.params
    const { content } = req.body
});

const deleteComment = asyncHandler(async (req, res) => {
    // Todo: delete a comment
    const { commentId } = req.params
});

export { getVideoComments, addComment, updateComment, deleteComment };
