const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define(
        "user",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },

            superuser: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            surname: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            mail: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            birthdate: {
                type: DataTypes.DATEONLY,
            },

            province: {
                type: DataTypes.STRING,
            },

            district: {
                type: DataTypes.STRING,
            },
        },
        { timestamps: true, paranoid: true }
    );
};