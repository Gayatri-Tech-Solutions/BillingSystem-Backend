import { Router } from "express";
import { addNewCust, getAllCustomers, updateCustomer, customerFilters } from "../controllers/customer.js"
import { authorization } from "../middlewares/authorization.js";
const router = Router()

router.post('/addnew', authorization, addNewCust)
router.get('/get-all-customers', authorization, getAllCustomers)
router.post('/update', authorization, updateCustomer)
router.get('/filters', authorization, customerFilters)


export default router