import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
 import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
dotenv.config();

mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
};

app.use(cors({origin:'http://localhost:5173' , credentials:true}))
app.use(express.json()); //a middleware ..client request ko lene k liye
app.use(cookieParser()); //other middleware

//app.use kisi bhi type ki req check (get,put,post) karlega

app.use("/api/auth", authRoute); //authRoute can be called a route level middleware.
app.use("/api/users", userRoute); 
app.use("/api/gigs" , gigRoute);
app.use("/api/orders" , orderRoute);
app.use("/api/conversations" , conversationRoute);
app.use("/api/messages" , messageRoute);
app.use("/api/reviews" , reviewRoute);

app.use((err , req ,res ,next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something  went wrong";

    return res.status(errorStatus).send(errorMessage);
})

app.listen(8800, () => {
  connect();
  console.log("backend server is running!");
});
