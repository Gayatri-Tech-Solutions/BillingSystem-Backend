import { Router } from "express";
import { generateInvoice, getInvoices, filterResult, updatedInvoiceStatus } from "../controllers/invoice.js";
import { authorization } from "../middlewares/authorization.js";

const router = Router()
router.post(`/generate`, authorization, generateInvoice)
router.get(`/getInvoices`, authorization, getInvoices)
router.post(`/update`, authorization, updatedInvoiceStatus)
router.get('/filters', authorization, filterResult)


export default router