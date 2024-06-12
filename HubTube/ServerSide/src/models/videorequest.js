import mongoose from "mongoose";
const videoreqSchema = new mongoose.Schema({
    title: String,
    videoUrl: String,
    thumbnailUrl: String,
    genre: String,
    duration: String,
    isSeries: {
        type: String,
        default:"False"
    },
    UploadedBy: String,
    VideoID: String
}, { timestamps: true });

const Videoreq = mongoose.model('videoreqcollections', videoreqSchema);
export default Videoreq;