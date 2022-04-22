import jwt from 'jsonwebtoken';

export const generateJWT = ( uid: string = '' ) => {
    return new Promise( ( resolve, reject ) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRET_KEY || '', {
            expiresIn: '4h'
        }, ( err, token ) => {
            
            if( err ) {
                console.log( err );
                reject( 'the token could not be generate');
            } else {
                resolve( token );
            }
        });

    });
}