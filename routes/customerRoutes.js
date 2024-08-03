import { Router } from "express";
import {addNewCust,getAllCustomers,updateCustomer ,customerFilters} from "../controllers/customer.js"
const router = Router()

router.post('/addnew' , addNewCust)
router.get('/get-all-customers', getAllCustomers)
router.post('/update',updateCustomer)
router.get('/filters',customerFilters)


export default router