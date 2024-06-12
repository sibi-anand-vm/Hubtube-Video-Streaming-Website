import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    Usermail: {
        type: String,
        required: true
    },
    DateofBirth: {
        type: Date,
        required: true
    },
    EPassword: {
        type: String,
        required: true
    },
    UserID: {
        type: Number,
        required: true
    },
    Contributions: {
        type: Number,
        default: 0 
    },
    isAdmin: {
        type: String,
        default:"False"
    }
},  
{
    timestamps: true
});

const Users = mongoose.model("UsersCollections", UserSchema);
export default Users;
