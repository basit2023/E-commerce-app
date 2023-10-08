import express from 'express'
const CatagoryRouter=express.Router()
import { createCatagoryControoler,
        updateCatagoryController,
        getAllcategoryControlller,
        singleCategoryController,
        deleteCategoryCOntroller} from '../controllers/catagoryController.js'


CatagoryRouter.post('/create',createCatagoryControoler);
CatagoryRouter.get('/get-single/:slug',singleCategoryController)
CatagoryRouter.get('/get-all',getAllcategoryControlller)
CatagoryRouter.put('/update/:id',updateCatagoryController)
CatagoryRouter.delete('/delete/:id',deleteCategoryCOntroller)
export default CatagoryRouter;
