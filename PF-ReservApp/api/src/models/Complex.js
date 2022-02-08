const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "complex",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      province: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      district: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      address: {
        type: DataTypes.STRING,
      },

      description: {
        type: DataTypes.TEXT,
      },
      openfrom: {
        type: DataTypes.STRING,
      },

      opento: {
        type: DataTypes.STRING,
      },

      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    { timestamps: true, paranoid: true }
  );
};