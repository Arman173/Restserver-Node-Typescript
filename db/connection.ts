import { Sequelize } from 'sequelize';

const db = new Sequelize('Curso-Node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
});

export default db;