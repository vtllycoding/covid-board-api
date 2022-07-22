// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const results = sequelizeClient.define('results', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    datePublished: {
      type: DataTypes.TIME,
      defaultValue: new Date(),
      allowNull: false,
    },
    dateCompleted: {
      type: DataTypes.TIME,
      defaultValue: new Date(),
      allowNull: false,
    },
    resultUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  results.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    const { trials } = models;

    results.belongsTo(trials);
  };

  return results;
};