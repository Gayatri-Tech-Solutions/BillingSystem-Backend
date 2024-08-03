import { Router } from "express";
import {login , register ,details, forgetPassword} from '../controllers/user.js'
import { authorization } from "../middlewares/authorization.js";
const router = Router()

router.post('/login',login)
router.post('/register',register)
router.post('/reset-password',forgetPassword)

router.get('/user-details',authorization,details)

export default router