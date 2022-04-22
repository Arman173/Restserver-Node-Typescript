import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validateFields = ( req: Request, res: Response, next: NextFunction ) => {
    
    // Validando los campos recibidos en el request
    const errors = validationResult( req );
    if( !errors.isEmpty() ) {
        return res.status(400).json( errors );
    }

    next();
}
