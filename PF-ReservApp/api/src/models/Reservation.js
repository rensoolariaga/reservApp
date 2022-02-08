const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo

    /*
          En el front, cuando hago el form se llena:
          hora de inicio (sin media hora) 8 
          si es y media, half: true
          hora de finalizacion (idem) 9 30
          va a tener un fk de field  
          va a tener un fk de user
      */
    sequelize.define(
        "reservation",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },

            date: {
                type: DataTypes.DATEONLY,
                defaultValue: DataTypes.NOW,
            },

            startTime: {
                type: DataTypes.INTEGER,
                validate: {
                    min: 1,
                    max: 24
                },
            },

            half: {
                type: DataTypes.BOOLEAN,
            },

            cost: {
                type: DataTypes.FLOAT,
            },

            mpId: {
                type: DataTypes.STRING,
            }
        },
        { timestamps: true, paranoid: true }
    );
};