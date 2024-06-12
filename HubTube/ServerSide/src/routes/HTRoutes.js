import express from "express";
import {getseries1,getmovies,finduser,createuser,getusers,getadminreq,createadminreq,deleteUser,updateuser,Moviessec, removeVideo,getvdoreq,delVdoReq, createMovie,getdashcount,createvideoreq} from "../controllers/RRControllers.js";
const router=express.Router()
router.get("/allusers",getusers);
router.get("/getvdoreq",getvdoreq);
router.get("/getadminreq",getadminreq);
router.post("/addvdoreq",createvideoreq)
router.post("/addadminreq",createadminreq)
router.post("/createuser",createuser);
router.post("/finduser",finduser);
router.post("/updateuser",updateuser);
router.post("/createmovie",createMovie);
router.post("/delvdoreq",delVdoReq);
router.get("/allvideos",getmovies);
router.get("/series1",getseries1);
router.get("/onlymovies",Moviessec);
router.get("/getcount",getdashcount);
router.post("/removeuser",deleteUser)
router.post("/removevideo",removeVideo)
export default router;