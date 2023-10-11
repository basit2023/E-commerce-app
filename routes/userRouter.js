import express from 'express'
const Router= express.Router()
import {registerController,loginController, 
        getOrderController, getAllOrdersController,
         forgetPasswordController, resetPasswordController,
        verifyOTP,
        createOrder} from '../controllers/userController.js'
//Register controller
Router.post('/register',registerController)
Router.post('/login',loginController) 
//order
Router.post('/createorder', createOrder)
Router.get('/orders',getOrderController)
Router.get('/all-orders',getAllOrdersController)
//forget password controller
Router.post('/forget',forgetPasswordController)
//reset password
Router.post('/reset',resetPasswordController)
Router.post('/otp',verifyOTP)

//all orders


export default Router;