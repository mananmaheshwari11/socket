import { Router } from "express";
import authController from "../Controllers/authController.js"
import { requireAuth} from '../Middleware/authMiddleware.js'
import ExpressFormidable from 'express-formidable';

const router = Router();

//router.get('/login',authController.get_login);
router.post('/login',authController.post_login);
//router.get('/signup',authController.get_signup);
router.post('/signup',authController.post_signup);
router.get('/logout', authController.get_logout);
router.post('/check-auth',requireAuth,(req,res)=>{
    return res.status(201).send({ok:true})
})
router.get('/user-detail/:id',authController.getuserdetail);
router.put('/update-user/:id',ExpressFormidable(),authController.updateuser);
router.get('/image/:id',authController.getuserImage);

export default router;
