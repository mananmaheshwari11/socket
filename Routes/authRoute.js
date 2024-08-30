import { Router } from "express";
import authController from "../Controllers/authController.js"

const router = Router();

//router.get('/login',authController.get_login);
router.post('/login',authController.post_login);
//router.get('/signup',authController.get_signup);
router.post('/signup',authController.post_signup);
router.get('/logout', authController.get_logout);

export default router;
