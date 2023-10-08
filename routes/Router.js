import express from 'express'
const Router= express.Router()
import {registerController,loginController, getOrderController, getAllOrdersController} from '../controllers/userController.js'
//Register controller
Router.post('/register',registerController)
Router.post('/login',loginController) 
//order
Router.get('/orders',getOrderController)
Router.get('/all-orders',getAllOrdersController)

//all orders


export default Router;