import mongoose from "mongoose";
import express from 'express'
import { createProductControoler,getProductController,getSingleProductController } from './../controllers/ProductController.js';

const router = express.Router();
import formidable from "express-formidable";
//routes
router.post(
  "/create-product",
  // formidable(),
  createProductControoler,
);
//get all products
router.get("/get-product", createProductControoler);

//single product
router.get("/get-product/:slug", getSingleProductController);
export default router;