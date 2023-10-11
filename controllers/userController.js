import userModel from "../models/userModel.js";
import { hashPassword,comparePassword } from "../Auth/authHelper.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js";
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import otpModel from "../models/otpModel.js";

export const registerController = async (req,res) =>{
    try {
        // const { name, email, password, phone, address } = req.body;
        const { name, email, password, phone, address } = req.body;
        //validations
        if (!name) {
            return res.send({ error: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (!phone) {
            return res.send({ message: "Phone no is Required" });
        }
        if (!address) {
            return res.send({ message: "Address is Required" });
        }
        //check user
        const existingUser= await userModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success: false,
                message: "Already Register please login",
              })
        }
        //hashed passwaord
        const hashedPassword = await hashPassword(password);
        //Register new user
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password:hashedPassword,
          }).save();
          res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
          })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Registeration",
            error,
          });
    }
}
//log in controller
export const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validation
      if (!email || !password) {
        return res.status(400).send({
          success: false,
          message: "Invalid email or password",
        });
      }
  
      // Check if the user with the given email exists
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Email is not registered",
        });
      }
  
      // Compare the entered password with the hashed password stored in the database
      const isPasswordMatch = await comparePassword(password, user.password);
  
      if (!isPasswordMatch) {
        return res.status(400).send({
          success: false,
          message: "Invalid email or password",
        });
      }
  
      // Generate a JWT token for the authenticated user
      const token = await JWT.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1hr" }
      );
  
      res.status(200).send({
        success: true,
        message: "Login successful",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in login",
        error,
      });
    }
  };


  // for get password

  export const forgetPasswordController= async (req,res) => {
    try {
      const { email}= req.body;
      // const { email, newPassword}= req.body;
      if (!email) {
        res.status(400).send({ message: "Emai is required" });
      }
      // if (!newPassword) {
      //   res.status(400).send({ message: "New Password is required" });
      // }

      const user= await userModel.findOne({email});
      console.log("the user is:",user);
      const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
          user:'engr.basitofficial@gmail.com',
          pass:'vsic ymry qnbe mzcf'
        },
        // secure: true, 
        // port: 465,
      })
      console.log(email)
      const otp=crypto.randomBytes(6).toString('hex');
      const mailoption={
        from: 'engr.basitofficial@gmail.com',
        to: email,
        subject: "Sending Email",
        text: `Your ATP is ${otp}` 
      }
      console.log(mailoption)
      transporter.sendMail(mailoption);
      res.status(200).send({success: true, message:"Email has been send"})

      // save OTP to data base
      const saveOTP = async (email, otp) => {
        const otpDocument = new OTPModel({ email, otp });
        await otpDocument.save();
      };
     
      // if(!user){
      //   res.status(404).send({
      //     success:false,
      //     message: "The email is not registed, please try another"
      //   });
      // }
      // const hash= await hashPassword(newPassword);
      // await userModel.findByIdAndUpdate(user._id,{password:hash})
      // res.status(201).send({
      //   success:true,
      //   message: "Password update successfully"
      // })
    } catch (error) {
      console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
    }
  }

  // update possward
  export const verifyOTP= async (req,res) =>{
         try {
          const {email, otp}=req.body;
          if(!email){
           res.status(404).send({success:false, message:"Enter your email"})
          }
          if(!otp){
           res.status(404).send({success:false, message:"Enter your otp that send to email"})
          }
          const user= await otpModel.find({email:email})
          if(otp===user.opt){
           console.log("OTP mached");
           // const hash= await hashPassword(newPassword);
           // await userModel.findByIdAndUpdate(user._id,{password:hash})
           // res.status(201).send({
           //   success:true,
           //   message: "Password update successfully"
       // })}
         } 
        }catch (error) {
          console.log(error);
          res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
          });
         }


        
  }
  //reset password
  export const resetPasswordController = async (req, res) => {
    try {
      const { email, password, newPassword } = req.body;
      if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
      }
      if (!password) {
        return res.status(400).json({ success: false, message: "Password is required" });
      }
  
      // Find the user by email
      const user = await userModel.findOne({ email });
      //user exists
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      // Compare password
      const passwordMatch = await comparePassword(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ success: false, message: "The old password is not matched" });
      }
  
      // Update password
      user.password = newPassword;
      await user.save();
  
      return res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Something went wrong", error });
    }
  };
  

export const createOrder= async(req,res)=>{
       try {
        const {productId, payment, buyer,status}= req.body;
        await new orderModel(req.body).save()
        res.status(201).send({success:true, message:"Your order created Successfully"})
       } catch (error) {
        console.log(error)
        res.status(404).send({success:false, message:"Something went wrong while creating order"})
       }
       
}



  export const getOrderController= async (req,res) => {
    try {
      
        const orders= await orderModel.find({buyer:req.user})
        .populate("products","-photo")
        .populate("buyer","name")
        res.json(orders);
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: "Error while getting order",
            error,
        })
    }
  }

  //orders
export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt: "-1" });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };

  export const orderStatusController= async (req,res) => {
    try {
        const {orderId}=req.params;
        const { status }= req.body;
        const orders = await orderModel.findByIdAndUpdate(
            orderId,{status},{new:true}
        );
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Updateing Order",
            error,
          })
    }
  }
  