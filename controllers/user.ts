import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';

import { Role, User } from "../models";

export const getUsers = async( req: Request, res: Response ) => {
    
    const users = await User.findAll();
    
    res.json({ users });
}

export const getUser = async( req: Request, res: Response ) => {
    
    const { id } = req.params;

    const user = await User.findByPk(id, {
        include: Role
    });

    res.json( user );
}

export const createUser = async( req: Request, res: Response ) => {
    const { id, role, status, ...rest } = req.body;

    const user = User.build(rest);

    // encriptando contraseña
    const salt = bcryptjs.genSaltSync();
    user.set('password', bcryptjs.hashSync(rest.password, salt));

    await user.save();
    
    res.json( user );
}

export const updateUser = async( req: Request, res: Response ) => {
    const { id } = req.params;
    const { status, password, role, ...rest } = req.body;

    const user = await User.findByPk( id );
    if (!user) return res.status(404).json({
        msg: 'user not found'
    });

    await user.update(rest);
    res.json( user );
}

export const deleteUser = async( req: Request, res: Response ) => {
    const { id } = req.params;

    const user = await User.findByPk( id );
    if (!user) return res.status(404).json({
        msg: 'user not found'
    });

    await user.update({ status: false });

    res.json( user );
}