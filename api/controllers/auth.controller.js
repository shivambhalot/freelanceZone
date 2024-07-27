import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import createError from "../utils/createError.js";




export const register=async(req,res , next)=>{
    try{
        const hash=bcrypt.hashSync(req.body.password,5)

        // const newUser =new User({
        //     username = "test1",
        //     password = "test1",
        //     email = "test1@gmail.com",
        //     country = "India"
        // })

        // const newUser=new User(req.body);

        //after encryption process
        const newUser =new User({
            ...req.body,
            password:hash,
        })

        await newUser.save();
        res.status(201).send("user created");
    }catch(err){
        // res.status(500).send("Something went wrong");
        next(err);
    }
}


export const login=async(req,res,next)=>{
    
    try{ 
       
        const user=await User.findOne({username:req.body.username});   //mondoDB me search kr rhe h same user
        //way1:if(user == false) return res.status(404).send("User not found!");    //*** hm error ese bhi send kr skte h
        
        //way2: error handling middleware banane ke bad. (here we are specifying the error)
        // const err=new Error()
        // err.status=404
        // err.message="user not found"
        // if(!user) return next(err);

        //way3 :
        if(!user) {
          
            return next(createError(404 , "user not found!"));
        }

        
        const isCorrect =bcrypt.compareSync(req.body.password, user.password);    //compare user.encrypted password with new user's encrypted password
        // if(!isCorrect) return res.status(400).send("wrong password")
         if(!isCorrect) 
            return next(createError(400 , "wrong password"));
        
        
        const token = jwt.sign({
            id:user._id ,
            isSeller:user.isSeller,
            
        },process.env.JWT_KEY) ;

        const{password, ...info}=user._doc       //separated password and other fields
        res
        .cookie("accessToken",token,{
            httpOnly:true,                         //bas http req hee data change kar skti hein
            // sameSite:"none",
            // secure: true,
        })
        .status(200)
        .send(info)              //sending only other info 
        
    }catch(err){
       next(err);
    }
};

export const logout=async(req,res)=>{
    res.clearCookie("accessToken",{
    sameSite:"none",
    secure:true,
}).status(200).send("user has been logged out")
}