import Users from "../models/Usermodel.js";
import Video from "../models/vediomodel.js";
import ID from "../models/AdminIDmodel.js";
import VID from "../models/VideoID.js";
import dotenv from 'dotenv';
import Adminreq from "../models/Adminreq.js";
import Videoreq from "../models/videorequest.js";
import CryptoJS from 'crypto-js'
dotenv.config();
const getusers=async(req,res)=>{
    const result = await Users.find({}).sort({ UserID: 1 });
res.send(result)
 }
export {getusers}
const getvdoreq=async(req,res)=>{
    const result = await Videoreq.find({});
res.send(result)
 }
export {getvdoreq}
const getmovies=async(req,res)=>{
    const result=await Video.find({})
res.send(result)
console.log(result) }
export {getmovies}
const getseries1 = async (req, res) => {
    try {
        const result = await Video.find({ isSeries: "true" });
        res.send(result);
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).send('Internal Server Error');
    }
};
export {getseries1}
const Moviessec = async (req, res) => {
    try {
        const result = await Video.find({ isSeries: "false" });
        res.send(result);
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).send('Internal Server Error');
    }
};
export {Moviessec}
const createuser = async (req, res) => {
    const { Username, Usermail, DateofBirth, Password } = req.body;
    try {
        const existingUser = await Users.findOne({ Usermail });
        if (existingUser) {
            console.log('User Already Exists');
            return res.status(409).send('User Already Exists');
        }
        let UserID;
       let isUnique = false;
        while (!isUnique) {
            UserID = Math.floor(Math.random() * (10000 - 7777 + 1)) + 7777;
            const existID = await ID.findOne({ UserID });
            if (!existID) {
                isUnique = true;
            }
        } 
        console.log(UserID)
        await ID.create({ UserID }); 
        const Secret_key = process.env.Secret_key;
        const EPassword = CryptoJS.AES.encrypt(Password, Secret_key).toString();

        // Create the new user
        const newUser = await Users.create({ Username, Usermail, DateofBirth, EPassword, UserID });

        // Respond with success
        res.send('User Created Successfully');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
};

export { createuser };

const createMovie = async (req, res) => {
    const { title, videoUrl, thumbnailUrl, genre, duration, isSeries, UploadedBy } = req.body;

    try {
        // Generate random VideoID
        let VideoID = 0;
        do {
            VideoID = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
            const existingVideo = await VID.findOne({ VideoID }); 
            if (existingVideo) {
                VideoID = 0; 
            }
        } while (VideoID === 0);
        await VID.create({ VideoID });
        const newMovie = await Video.create({ title, videoUrl, thumbnailUrl, genre, duration, isSeries, UploadedBy, VideoID });
        res.send('Movie Created Successfully');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
};

export { createMovie };
const getdashcount = async (req, res) => {
    try {
        const userCount = await Users.countDocuments();
        const movieCount = await Video.countDocuments({ isSeries: false });
        const seriesCount = await Video.countDocuments({ isSeries: true });

        res.json({
            userCount,
            movieCount,
            seriesCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};
export {getdashcount};
const removeVideo = async (req, res) => {
    const { VideoID } = req.body;
    try {
        const video = await Video.findOneAndDelete({ VideoID });

        if (!video) {
            return res.status(404).send('Video not found');
        }

        res.send('Video deleted Successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};
export {removeVideo};
const delVdoReq = async (req, res) => {
    const { VideoID } = req.body;
    try {
        const video = await Videoreq.findOneAndDelete({ VideoID });

        if (!video) {
            return res.status(404).send('Video not found');
        }

        res.send('Video deleted Successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};
export {delVdoReq};
const finduser = async (req, res) => {
    const { Usermail, Password } = req.body;
    try {
        const user = await Users.findOne({ Usermail });
        if (!user) {
            return res.status(404).send("User not exists"); 
        }
        const DPassword = CryptoJS.AES.decrypt(user.EPassword, process.env.Secret_key).toString(CryptoJS.enc.Utf8);
        console.log(DPassword)
        if (DPassword !== Password) {
            return res.status(401).send("Incorrect password"); 
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
export { finduser };
const deleteUser = async (req, res) => {
    const { Usermail } = req.body; 
    try {
        const userToDelete = await Users.findOne({ Usermail:Usermail });
        if (!userToDelete) {
            console.log('User not found');
            return res.status(404).send('User not found');
        }
        await Users.deleteOne({ Usermail });
        res.send('User deleted successfully');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
};

export { deleteUser };
const updateuser = async (req, res) => {
    const { UserID, mode } = req.body;
    try {
        let isAdmin = "False";
        if (mode === 1) {
            isAdmin = "True";
        }
        const user = await Users.findOneAndUpdate({ UserID }, { isAdmin }, { new: "True" });
        if (user) {
            return res.status(200).send('Admin Status Updated');
        } else {
            return res.status(404).send(`UserID ${UserID} not found`);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
};
export { updateuser };
const createvideoreq = async (req, res) => {
    const { title, videoUrl, thumbnailUrl, genre, duration, isSeries, UploadedBy } = req.body;
    try {
        let VideoID = 0;
        do {
            VideoID = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
            const existingVideo = await VID.findOne({ VideoID }); 
            if (existingVideo) {
                VideoID = 0; 
            }
        } while (VideoID === 0);
        await VID.create({ VideoID });
        const newMovie = await Videoreq.create({ title, videoUrl, thumbnailUrl, genre, duration, isSeries, UploadedBy, VideoID });
        res.send('Request Added Successfully');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
};
export { createvideoreq };
const createadminreq = async (req, res) => {
    const { uuid } = req.body;

    if (!uuid) {
        return res.status(400).send('UUID is required');
    }

    try {
        const existingreq = await Adminreq.findOne({ UserID: uuid }); 
        if(existingreq){
            return res.status(500).send('Already Request Added');
        }
        await Adminreq.create({ UserID: uuid });
        res.send('Request Added Successfully');
    } catch (error) {
        console.error('Error creating admin request:', error);
        return res.status(500).send('Internal server error');
    }
};

const getadminreq = async (req, res) => {
    try {
        const adminRequests = await Adminreq.find({});
        const userIds = adminRequests.map(request => request.UserID);

        if (userIds.length === 0) {
            return res.status(404).send('No admin requests found');
        }

        const finresult = await Users.find({ UserID: { $in: userIds } });
        res.send(finresult);
    } catch (error) {
        console.error('Error fetching admin requests:', error);
        return res.status(500).send('Internal server error');
    }
};

export { createadminreq, getadminreq };