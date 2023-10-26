import express from 'express';
import cors from 'cors';
import { config } from 'dotenv'; 
import connectDB from './config/db.js';
import Router from './routes/userRouter.js';
import router from './routes/productRouter.js';
import CatagoryRouter from './routes/catagoryRouter.js';
import cartRoutes from './routes/cardRouter.js';

const app = express();
config();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET, PUT, POST, DELETE',
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Use the CORS middleware
app.use(cors(corsOptions));

//port 
const PORT = process.env.PORT || 4000;
app.use(express.json());
//Connection to MongoDB 
connectDB();

//Routing
app.use('/user', Router);
app.use('/product', router);
app.use('/catagory', CatagoryRouter);

// Use the cart route
app.use('/cart', cartRoutes);

app.get('/', (req, res) => {
    console.log("This is the E-Commerce Application");
    res.send("Hello, this is the E-Commerce Application");
});
//server running
app.listen(PORT, () => {
    console.log(`The Server is running on PORT ${PORT}`);
});
