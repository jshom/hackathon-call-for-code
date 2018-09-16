'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('building', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      latitude: Sequelize.FLOAT,
      longitude: Sequelize.FLOAT,
      classification: Sequelize.STRING(20),
      img_url: Sequelize.STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      ETag: Sequelize.STRING
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('building');
  }
};
