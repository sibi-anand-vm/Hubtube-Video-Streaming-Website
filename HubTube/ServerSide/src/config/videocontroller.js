import mongoose from "mongoose";
import Video from '../models/vediomodel.js'
import Users from "../models/Usermodel.js";
import dotenv from 'dotenv';
dotenv.config();
const MONGO_URI = "mongodb+srv://iamvijay9080:ACCOUNT_LOCk42@cluster0.0f9r0x0.mongodb.net/JetFlix?retryWrites=true&w=majority"
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        const data = [ 
            {
                title: "Jai Bhim",
                videoUrl: "https://drive.google.com/file/d/1HDPqLBwF1CxYAxAIPF8CgbVBhL5LPdrl/view",
                thumbnailUrl: "https://th.bing.com/th/id/OIP.-CTWn8lS-Lp6ouxply_kugHaJC?w=839&h=1024&…",
                genre: "Crime",
                duration: "164 minutes",
                isSeries: false,
                UploadBy: Math.floor(Math.random() * (9999 - 1000) + 1000),
                VideoID: Math.floor(Math.random() * (9999 - 1000) + 1000)
            },
            {
                title: "Pushpa",
                videoUrl: "https://drive.google.com/file/d/19eVogu9XcrcKbMXC-GwmrBole5Ui1cQ1/view",
                thumbnailUrl: "https://www.theindianwire.com/wp-content/uploads/2022/01/Pushpa-Movie.…",
                genre: "Action",
                duration: "179 minutes",
                isSeries: false,
                UploadBy: Math.floor(Math.random() * (9999 - 1000) + 1000),
                VideoID: Math.floor(Math.random() * (9999 - 1000) + 1000)
            },
            {
                title: "Super Sharanya",
                videoUrl: "https://drive.google.com/file/d/1DLfdFcSoVlTjbVFliT0gmoFq7bH0Woj5/view",
                thumbnailUrl: "https://bingeddata.s3.amazonaws.com/uploads/2021/09/Super-Sharanya.jpg",
                genre: "Comedy",
                duration: "160 minutes",
                isSeries: false,
                UploadBy: Math.floor(Math.random() * (9999 - 1000) + 1000),
                VideoID: Math.floor(Math.random() * (9999 - 1000) + 1000)
            }
    ];
        Video.insertMany(data)
            .then(() => {
                console.log('Data uploaded successfully');
            })
            .catch(err => {
                console.error('Error uploading data:', err);
            })
            .finally(() => {
                mongoose.disconnect();
            });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB Atlas:', err);
    });