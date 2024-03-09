import express from 'express';
import { login, logout, signup } from '../controllers/auth.controllers.js';

const router = express.Router();

router.get("/login" , (req , res)=>{return res.status(200).send("helow")})

router.post("/login", login)
router.post("/logout", logout)
router.post("/signup", signup)

export default router;