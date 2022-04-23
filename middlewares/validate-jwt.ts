import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import { User } from '../models';

export const validateJWT = async( req: Request, res: Response, next: NextFunction ) => {

    const token = req.header('token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'there is no token in the request'
        });
    }

    try {

        const decode: any = jwt.verify( token, process.env.SECRET_KEY || '' );

        const user = await User.findByPk( decode.uid );

        if ( !user ) {
            return res.status(401).json({
                msg: 'invalid token - user does not exist in DB'
            });
        }        

        // verificar si el uid tiene el estado en true
        if ( !user.get().status ) {
            return res.status(401).json({
                msg: 'invalid token - user with status false'
            });
        }

        req.body.user = user;
        next();
        
    } catch ( error ) {
        console.log( error );
        res.status(401).json({
            msg: 'invalid token'
        });
    }
}