import mongoose, {isValidObjectId}  from "mongoose";
import { PlayList } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description } = req.body
    // Create Playlist
    const playlist = await PlayList.create({ name, description });
    res.status(201).json(new ApiResponse(playlist));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    // get user playlists
    const playlists = await PlayList.find({ userId });
    if (!playlists) throw new ApiError(404, "No playlists found");
    res.json(new ApiResponse(playlists));

    // Check if user exists
    if (!isValidObjectId(userId)) throw new ApiError(400, "Invalid user ID");
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    // get playlist by id
    const playlist = await PlayList.findById(playlistId);
    if (!playlist) throw new ApiError(404, "Playlist not found");
    res.json(new ApiResponse(playlist));

    // Check if playlist exists
    if (!isValidObjectId(playlistId)) throw new ApiError(400, "Invalid playlist ID");

});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;

    // get playlist by id
    const playlist = await PlayList.findById(playlistId);
    if (!playlist) throw new ApiError(404, "Playlist not found");
})

const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;

    // get playlist by id
    const playlist = await PlayList.findByIdAndDelete(playlistId);
    if (!playlist) throw new ApiError(404, "Playlist not found");
    res.json(new ApiResponse(playlist));
});

const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const { name, description } = req.body;

    // update playlist
    const playlist = await PlayList.findByIdAndUpdate(playlistId, { name, description }, { new: true });
    if (!playlist) throw new ApiError(404, "Playlist not found");
    res.json(new ApiResponse(playlist));
})

export { createPlaylist, getUserPlaylists, getPlaylistById, removeVideoFromPlaylist, deletePlaylist, updatePlaylist };
