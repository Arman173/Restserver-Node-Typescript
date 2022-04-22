import { Role, User } from "../models";

/* USER VALIDATORS */
export const userExistsById = async( id: string = '' ) => {

    // Verificar si el id existe
    const userExist = await User.findByPk( id );
    if( !userExist ) {
        // si no existe se lanzara un error
        throw new Error(`user id: ${ id } don't exist`);
    }
}

export const emailExists = async( email: string = '' ) => {

    // Verificar si el correo existe
    const emailExist = await User.findOne({
        where: { email }
    });
    if( emailExist ) {
        // si existe se lanzara un error
        throw new Error(`Email: ${ email } already exist.`);
    }
}

/* ROLE VALIDATORS */
export const roleExistsById = async( id: string = '' ) => {

    // Verificar si el id existe
    const roleExists = await Role.findByPk( id );
    if( !roleExists ) {
        // si no existe se lanzara un error
        throw new Error(`role id: ${ id } don't exist`);
    }
}

export const roleExists = async( name: string = '' ) => {

    // Verificar si el role existe por su nombre
    const roleExists = await Role.findOne({
        where: { name }
    });
    if( roleExists ) {
        // si existe se lanzara un error
        throw new Error(`Role: ${ name } already exist.`);
    }
}