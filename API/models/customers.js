'use strict';
module.exports = (sequelize, DataTypes) => {
  const customers = sequelize.define(
    'customers',
    {
      name: DataTypes.STRING,
      identity_number: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      image: DataTypes.TEXT,
    },
    {},
  );
  customers.associate = function(models) {
    // customers.hasMany(models.orders);
  };
  return customers;
};
