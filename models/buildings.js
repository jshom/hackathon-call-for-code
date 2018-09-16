'use strict';
module.exports = function(sequelize, DataTypes) {
  var buildings = sequelize.define('building', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    classification: DataTypes.STRING(20),
    img_url: DataTypes.STRING,
    ETag: DataTypes.STRING
  }, {
    freezeTableName: true,
    underscored: true
  })
  return buildings;
};
