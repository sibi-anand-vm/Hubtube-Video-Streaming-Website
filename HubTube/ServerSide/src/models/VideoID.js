import mongoose from "mongoose";

const VideoIDSchema = mongoose.Schema({
    VideoID: {
        type: Number,
        required: true,
        unique: true
    }
});

const VID = mongoose.model("VideoIDCollections", VideoIDSchema);

export default VID;