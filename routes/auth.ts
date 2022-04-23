import { Router } from "express";
import { check } from "express-validator";
import { validateFields, validateJWT } from "../middlewares";

import { authenticate, login } from "../controllers/auth";

const router: Router = Router();

router.get('/', [
    validateJWT
], authenticate);

router.post('/login', [
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validateFields
], login);

export default router;