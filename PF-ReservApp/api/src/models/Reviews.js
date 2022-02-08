const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define("reviews", {

        id: {

            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },

        rating: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
            },
        },

        comment: {
            type: DataTypes.TEXT
        },

    }, { timestamps: true, paranoid: true }
    );
};