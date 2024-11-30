import { Router } from "express";
import authControllers from "../controllers/auth.controllers.js";

const router = Router();
router.route('/')
    .post(authControllers.login);

export default router;