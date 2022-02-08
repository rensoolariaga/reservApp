const { DataTypes, Sequelize } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo

    /*
          En el front, cuando hago el form se llena:
          hora de inicio (puede ser y media) 8 
          hora de finalizacion (idem) 9 30
          va a tener un fk de field  
          va a tener un fk de user
      */
    sequelize.define("payment", {

        id: {

            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },

        date: {

            type: DataTypes.DATEONLY,
            defaultValue: Sequelize.NOW
        },

        informacion: { // modifique ¡¡¡¡¡ ME DEVUELVE NULL POR POSTMAN AAAAAAAAAAAAA!!!!!

            type: DataTypes.STRING
        },

    }, { timestamps: true, paranoid: true }
    );
};