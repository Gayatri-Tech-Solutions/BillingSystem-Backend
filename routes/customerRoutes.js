import { Router } from "express";
import {addNewCust,getAllCustomers} from "../controllers/customer.js"
const router = Router()

router.post('/addnew' , addNewCust)
router.get('/get-all-customers', getAllCustomers)


export default router