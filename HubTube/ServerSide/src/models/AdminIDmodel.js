import mongoose from "mongoose";

const AdminIDSchema = mongoose.Schema({
    UserID: {
        type: Number,
        required: true,
        unique: true
    }
});

const ID = mongoose.model("UserIDCollections", AdminIDSchema);

export default ID;
