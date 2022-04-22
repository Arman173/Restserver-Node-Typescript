import { Router } from "express";
import { check } from "express-validator";

import { validateFields } from "../middlewares";
import { validators } from "../helpers";

import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/user";

const router: Router = Router();

router.get('/', getUsers);

router.get('/:id', [
    check('id').custom( validators.userExistsById ),
    validateFields
], getUser);

router.post('/', [
    check('name', 'name is required').notEmpty().isString(),
    check('password', 'required password be more than 6 digits').isLength({ min: 8 }),
    check('email', 'invalid email').isEmail(),
    check('email').custom( validators.emailExists ),
    validateFields
], createUser);

router.put('/:id', [
    check('id').custom( validators.userExistsById ),
    check('email', 'invalid email')
        .optional({ nullable: true })
        .custom( validators.emailExists )
        .isEmail(),
    validateFields
], updateUser);

router.delete('/:id', [
    check('id').custom( validators.userExistsById ),
    validateFields
], deleteUser);

export default router;