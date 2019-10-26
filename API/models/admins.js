'use strict';
module.exports = (sequelize, DataTypes) => {
  const admins = sequelize.define(
    'admins',
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      image: DataTypes.TEXT,
    },
    {},
  );
  admins.associate = function(models) {
    // associations can be defined here
  };
  return admins;
};
