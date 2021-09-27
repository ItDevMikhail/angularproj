import Router from "express";
import AuthController from "./authController.js";

const router = new Router()

router.post('/register', AuthController.createUser)
router.post('/auth', AuthController.getUser)
router.get('/user/:token', AuthController.getUserName)
router.get('/auth/:token', AuthController.getValidToken)

export default router;