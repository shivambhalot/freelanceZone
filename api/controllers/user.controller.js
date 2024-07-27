import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import createError from "../utils/createError.js";


export const deleteUser = async(req , res , next) => {
  const user=await User.findById(req.params.id); //jis id ko delete karne ki req aai


    // const token=req.cookies.accessToken;   //cookies se current logged in user ka access token lia
    // if(!token) return res.status(401).send("You are not logged in!"); //token hee nahi hai

    // jwt.verify(token,process.env.JWT_KEY,async(err,payload)=>{  
    //  if(payload.id!==user._id.toString()) //***access token me jo id hai (logged in user ki) !== delete karne ke lie jo id aai
    //   {
    //   return res.status(403).send("You can't delete someone else's account");
    //  }
      if(req.userId !== user._id.toString()) //access token me jo id hai (logged in user ki) !== delete karne ke lie jo id aai
      {
      // return res.status(403).send("You can't delete someone else's account");
      return next(createError(403 , "You can't delete someone else's account"));

      }
    // //  else{
    // //   return res.status(500).send("ok dok")
    // //  }
      await User.findByIdAndDelete(req.params.id); //jis id ko delete karne ki req aai, use  delete kardo  
      res.status(200).send("user deleted") 
    // })
}

export const getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id); // User schema me find kiya 

  res.status(200).send(user);
};





  
