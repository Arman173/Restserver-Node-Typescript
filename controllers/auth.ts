import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';

import { User } from '../models';
import { generateJWT } from '../helpers';

export const authenticate = async( req: Request, res: Response ) => {

    const { user } = req.body;

    const token = await generateJWT( user.id );

    res.status(200).json({
        user,
        token
    });
}


export const login = async( req: Request, res: Response ) => {

    const { email, password } = req.body;

    try {

        // verificar si el email existe
        const user = await User.findOne({where: { email }});
        if ( !user ) {
            return res.status(400).json({
                msg: 'USER / PASSWORD incorrect - email'
            });
        }

        // verificar si el usuario está activo
        if ( !user.get().status ) {
            return res.status(400).json({
                msg: 'USER / PASSWORD incorrect - status: false'
            });
        }

        // verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.get().password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'USER / PASSWORD incorrect - password'
            });
        }

        // generar JWT ( json web token )
        const token = await generateJWT( user.get().id );

        res.json({
            msg: 'Login ok',
            user,
            token
        });

    } catch ( error ) {
        console.log( error );
        return res.status(500).json({
            msg: 'talk to the administrator'
        });
    }

}