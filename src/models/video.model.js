import mongoose, {Schema} from "mongoose";
import mongooseAggrigatePaginate from "mongoose-aggrigate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile:{
            type: String, // cloudinary url given
            required: true,
        },
        thumbnail: {
            type: String, // cloudinary url given
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
)

videoSchema.plugin(mongooseAggrigatePaginate);
// mongoose-aggrigate-pagination-v2

export const Video = mongoose.model("Video", videoSchema);

