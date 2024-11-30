import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import { Task } from "./tasks.js";
import { Status } from "../constants/index.js";
import { encriptar } from "../common/bycrypt.js";

export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Username cannot be null'
            }
        },
    },
    /*email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },*/
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Password cannot be null'
            }
        }
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: Status.ACTIVE,
        validate: {
            isIn: {
                args: [[Status.ACTIVE, Status.INACTIVE]],
                msg: 'Status must be active or inactive',
            }
        }
    }
});

//La forma facil
User.hasMany(Task);
Task.belongsTo(User);
//Aplicando configuracion
/*User.hasMany(Task,{
    foreignKey: 'user_id',
    sourceKey: 'id'
});

Task.belongsTo(User,{
    foreignKey: 'user_id',
    targetKey: 'id'
});*/

User.beforeCreate(async (user)=> {
    try {
        user.password = await encriptar(user.password);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar la contraseña')
    }
});

User.beforeUpdate(async (user)=> {
    try {
        user.password = await encriptar(user.password);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al comparar la contraseña')
    }
})
