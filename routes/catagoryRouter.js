import express from 'express'
const CatagoryRouter=express.Router()
import { createCatagoryControoler,
        updateCatagoryController,
        getAllcategoryControlller,
        singleCategoryController,
        deleteCategoryCOntroller} from '../controllers/catagoryController'


CatagoryRouter.post('/create',createCatagoryControoler);
CatagoryRouter.get('/get-single',singleCategoryController)
CatagoryRouter.get('/get-all',getAllcategoryControlller)
CatagoryRouter.put('/update',updateCatagoryController)
CatagoryRouter.delete('/delete',deleteCategoryCOntroller)
export default CatagoryRouter;
