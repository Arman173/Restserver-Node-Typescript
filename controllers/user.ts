import { Request, Response } from "express"
import User from "../models/user";

/*
    TODO:
        crear middlewares, helpers para las validaciones
        y minimizar la logica en el controlador
*/

export const getUsers = async( req: Request, res: Response ) => {
    
    const users = await User.findAll();
    
    res.json({ users });
}

export const getUser = async( req: Request, res: Response ) => {
    const { id } = req.params;

    const user = await User.findByPk( id );

    if ( user ) {
        res.json( user );
    } else {
        res.status(404).json({
            msg: `User with id: ${ id } not found.`
        });
    }

}

export const createUser = async( req: Request, res: Response ) => {
    const { body } = req;

    try {

        const existeEmail = await User.findOne({
            where: {
                email: body.email
            }
        });

        if (existeEmail) {
            return res.status(400).json({
                msg: `User with email: ${ body.email } already exist.`
            });
        }

        const user = User.build(body);
        await user.save();

        res.json( user );

    } catch (error) {

        console.log( error );
        res.status(500).json({
            msg: 'Talk to Admin.',
        });
    }
}

export const updateUser = async( req: Request, res: Response ) => {
    const { id } = req.params;
    const { body } = req;

    try {

        const user = await User.findByPk( id );

        if (!user) {
            return res.status(400).json({
                msg: `User with id: ${ id } don't exists.`
            });
        }

        await user.update(body);

        res.json( user );

    } catch (error) {

        console.log( error );
        res.status(500).json({
            msg: 'Talk to Admin.',
        });
    }
}

export const deleteUser = async( req: Request, res: Response ) => {
    const { id } = req.params;

    const user = await User.findByPk( id );
    if (!user) {
        return res.status(400).json({
            msg: `User with id: ${ id } don't exists.`
        });
    }

    await user.update({ status: false });

    // eliminamos el usuario fisicamente de la base de datos
    // await user.destroy();

    res.json( user );
}