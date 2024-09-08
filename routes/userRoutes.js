import { Router } from "express";
import { login, register, details, forgetPassword, updateUserOtherData } from '../controllers/user.js'
import { authorization } from "../middlewares/authorization.js";
const router = Router()

router.post('/login', login)
router.post('/register', register)
router.post('/reset-password', authorization, forgetPassword)
router.post('/update', authorization, updateUserOtherData)
router.get('/user-details', authorization, details)

export default router