import mongoose from "mongoose";
const videoSchema = new mongoose.Schema({
    title: String,
    videoUrl: String,
    thumbnailUrl: String,
    genre: String,
    duration: String,
    isSeries: {
        type: String,
        default:"False"
    },
    UploadBy: Number,
    VideoID: String
}, { timestamps: true });

const Video = mongoose.model('videocollections', videoSchema);
export default Video;
