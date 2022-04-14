import express, { Application } from 'express';
import cors from 'cors';

// importando mis rutas
import userRoutes from '../routes/user';

import db from '../db/connection';

class Server {
    
    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // conectandose a la base de datos
        this.dbConnection();
        // implementado middlewares
        this.middlewares();
        // definiendo mis rutas
        this.routes();
    }

    async dbConnection() {
        try {

            await db.authenticate();
            console.log('Database online');

        } catch ( error ) {
            throw new Error( String(error) );
        }
    }

    middlewares() {
        // CORS
        this.app.use( cors() );
        // body read
        this.app.use( express.json() );
        // public folder
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.apiPaths.users, userRoutes);
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server running in http://localhost:${ this.port }`);
        });
    }
}

export default Server;