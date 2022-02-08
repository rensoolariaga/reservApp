const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "privileges",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      owner: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      administrator: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: true, paranoid: true }
  );
};