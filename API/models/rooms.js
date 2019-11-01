'use strict';
module.exports = (sequelize, DataTypes) => {
  const rooms = sequelize.define(
    'rooms',
    {
      name: DataTypes.STRING,
    },
    {},
  );
  rooms.associate = function(models) {
    rooms.hasMany(models.orders, {
      as: 'orders',
      foreignKey: 'room_id',
    });
  };
  return rooms;
};
