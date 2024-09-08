import { Router } from "express";
import userRoutes from './userRoutes.js'
import customerRoutes from './customerRoutes.js'
import invoiceRoutes from './invoiceRoutes.js'
const router = Router()

router.use('/user', userRoutes)
router.use('/customer', customerRoutes)
router.use('/invoice', invoiceRoutes)

export default router

