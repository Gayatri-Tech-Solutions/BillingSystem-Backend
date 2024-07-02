import { Router } from "express";
import { generateInvoice, getInvoices } from "../controllers/invoice.js";

const router = Router()

router.post(`/generate`,generateInvoice)
router.get(`/getInvoices`,getInvoices)


export default router