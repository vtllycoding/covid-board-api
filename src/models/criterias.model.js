// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const criterias = sequelizeClient.define('criterias', {
    ageMin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ageMax: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthCondition: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    inclusion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    exclusion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    intervention: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  criterias.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    const { trials } = models;

    criterias.belongsTo(trials);
  };

  return criterias;
};