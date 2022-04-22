import { Request, Response } from "express";

import { Role } from "../models";


export const getRoles = async( req: Request, res: Response ) => {
    
    const roles = await Role.findAll();
    
    res.json({ roles });
}

export const getRole = async( req: Request, res: Response ) => {
    
    const { id } = req.params;

    const role = await Role.findByPk( id );

    res.json( role );
}

export const createRole = async( req: Request, res: Response ) => {
    const { body } = req;

    const role = Role.build(body);

    await role.save();

    res.json( role );
}

export const updateRole = async( req: Request, res: Response ) => {
    const { id } = req.params;
    const { body } = req;

    const role = await Role.findByPk( id );

    if (!role) return res.status(404).json({
        msg: 'role not found'
    });

    await role.update(body);

    res.json( role );
}

export const deleteRole = async( req: Request, res: Response ) => {
    const { id } = req.params;

    const role = await Role.findByPk( id );

    if (!role) return res.status(404).json({
        msg: 'role not found'
    });

    await role.update({ status: false });

    res.json( role );
}