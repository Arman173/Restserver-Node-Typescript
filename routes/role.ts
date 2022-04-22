import { Router } from "express";
import { check } from "express-validator";

import { validateFields } from "../middlewares";
import { validators } from "../helpers";

import { createRole, deleteRole, getRole, getRoles, updateRole } from "../controllers/role";

const router: Router = Router();

router.get('/', getRoles);

router.get('/:id', [
    check('id').custom( validators.roleExistsById ),
    validateFields
], getRole);

router.post('/', [
    check('name', 'name is required').notEmpty().isString(),
    check('name').custom( validators.roleExists ),
    validateFields
], createRole);

router.put('/:id', [
    check('id').custom( validators.roleExistsById ),
    check('name').optional({ nullable: true }).custom( validators.roleExists ),
    validateFields
], updateRole);

router.delete('/:id', [
    check('id').custom( validators.roleExistsById ),
    validateFields
], deleteRole);

export default router;