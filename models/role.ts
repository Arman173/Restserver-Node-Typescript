import { DataTypes } from "sequelize";
import db from "../db/connection";

const Role = db.define('Role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.TINYINT,
        defaultValue: true
    }
});

export default Role;