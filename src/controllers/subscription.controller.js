import mongoose, {isValidObjectId} from "mongoose";
import { user } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params

    // toggle subscription
    const user = await User.findByIdAndUpdate(req.user.id, {
        $push: { subscriptions: channelId }
    }, { new: true })
    // if (!user) {
    //     throw new ApiError("User not found", 404)
    // }
    res.status(200).json(ApiResponse.success(user));
    
    // notify subscribers
    const subscribers = await Subscription.find({ channelId })
    subscribers.forEach(async subscriber => {
        try {
            await sendNotificationToUser(subscriber.userId, `New Joke in ${subscriber.channelId}`)
        } catch (error) {
            console.error(`Error notifying subscriber ${subscriber.userId}: ${error.message}`)
        }
    });
    
    // send notification to user
    const sendNotificationToUser = async (userId, message) => {
        try {
            // send notification using your preferred method (e.g., email, push notification)
            console.log(`Sending notification to user ${userId}: ${message}`)
        } catch (error) {
            throw new Error(`Failed to send notification to user ${userId}: ${error.message}`)
        }
    }
});

const userChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params
    const user = await User.findById(req.user.id)
    // if (!user) {
    //     throw new ApiError("User not found", 404)
    // }
    const subscribers = await Subscription.find({ channelId })
    res.status(200).json(ApiResponse.success(subscribers));

    // send notification to subscribers
})

const getSubscribeChannels = asyncHandler(async (req, res) => {
    const { subscribeId } = req.params;
})



export { toggleSubscription, userChannelSubscribers, getSubscribeChannels };
