import mongoose from "mongoose";

const AdminreqSchema = mongoose.Schema({
    UserID: {
        type: Number,
        required:true,
    }
});

const Adminreq = mongoose.model("AdminreqIDCollections", AdminreqSchema);

export default Adminreq;