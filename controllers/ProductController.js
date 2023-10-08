import productModel from "../models/productModel.js";
import slugify from "slugify";

// Create a new product
export const createProductControoler = async (req, res) => {
  try {
     /*req.fields is not a standard property of the req object in Express. 
      Instead, it is commonly associated with packages like formidable, 
      multiparty, or similar middleware for parsing form data.*/


    const { name, description, price, category, quantity, shipping } = req.body;

    // Validate required fields
    if (!name || !description || !price || !quantity) {
      return res.status(400).send({ error: "Name, description, price, and quantity are required." });
    }

    // Create a new product
    const product = new productModel({
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      slug: slugify(name),
    });
    /*slugify is likely a function used to create a URL-friendly "slug" from a given string,
        which is typically a name or title in this context. The name parameter represents the 
        string that you want to convert into a slug. */


    // Save the product to the database
    await product.save();

    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Creating Products",
      error: error.message,
    });
  }
};

// Get all products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "All Products",
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message,
    });
  }
};

// Get a single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      // .populate("category");

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error: error.message,
    });
  }
};
