import { Router } from "express";
import { generateInvoice, getInvoices ,filterResult,updatedInvoiceStatus} from "../controllers/invoice.js";

const router = Router()

router.post(`/generate`,generateInvoice)
router.get(`/getInvoices`,getInvoices)
router.post(`/update`,updatedInvoiceStatus)
router.get('/filters',filterResult)


export default router