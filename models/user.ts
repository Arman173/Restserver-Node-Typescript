import { DataTypes } from "sequelize";
import db from "../db/connection";

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'USER_ROLE'
    },
    status: {
        type: DataTypes.TINYINT,
        defaultValue: true
    }
});

export default User;