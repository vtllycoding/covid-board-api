// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const trials = sequelizeClient.define('trials', {
    trialID: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
    },
    registeredBy: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    registeredDate: {
      type: DataTypes.DATEONLY,
      defaultValue: new Date(),
      allowNull: false,
    },
    prospectiveRegistration: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    primarySponsor: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    publicTitle: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    scientificTitle: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    initialEnrollmentDate: {
      type: DataTypes.DATEONLY,
      defaultValue: new Date(),
      allowNull: false,
    },
    targetSize: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    recruitmentStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    studyType: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    studyDesign: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phase: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    trialAddress: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    downloadUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  trials.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    const { results, criterias, diseases } = models;

    // One to Many Associations
    trials.hasMany(results);
    trials.hasMany(criterias);

    // One to One
    trials.hasOne(diseases);
  };

  return trials;
};