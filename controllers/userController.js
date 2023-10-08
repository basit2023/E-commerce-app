import userModel from "../models/userModel.js";
import { hashPassword,comparePassword } from "../Auth/authHelper.js";
import JWT from "jsonwebtoken";
import orderModel from "../models/orderModel.js";


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

  export const getOrderController= async (req,res) => {
    try {
        const orders= await orderModel.find({buyer:req.user._id})
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
  