import express from "express";
import {deleteUser , getUser} from "../controllers/user.controller.js"
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// router.get("/register" , );

// router.delete("/:id" , deleteUser);          //*** middleware banane se phle
 router.delete("/:id" ,verifyToken , deleteUser); 
 //delete req aai, deleteUser ke pass jane se pehele verifyToken middleware pe jaegi,
 // waha se nai hua kuch return then deleteUser pe
 router.get("/:id", getUser); 

export default router;  
