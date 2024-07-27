import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res , next)=> {

  const token=req.cookies.accessToken;        //cookies se current logged in user ka access token lia
    // if(!token) return res.status(401).send("You are not logged in!");           //****token present hee nahi hai
    if(!token) return next(createError(401 , "You are not logged in!"));

    jwt.verify(token,process.env.JWT_KEY,async(err,payload)=>{  
      // if(err) return res.status(403).send("Token is not valid!"); 
      if(!token) return next(createError(403 , "Token is not valid!"));
      
      req.userId = payload.id;
      req.isSeller = payload.isSeller;
      next();
    })
}
