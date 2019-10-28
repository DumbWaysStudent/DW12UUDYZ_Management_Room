'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define(
    'orders',
    {
      room_id: DataTypes.INTEGER,
      customer_id: DataTypes.INTEGER,
      duration: DataTypes.INTEGER,
      order_end_time: DataTypes.DATE,
      is_done: DataTypes.BOOLEAN,
      is_booked: DataTypes.BOOLEAN,
    },
    {},
  );
  orders.associate = function(models) {
    orders.belongsTo(models.customers, {
      as: 'customer',
      foreignKey: 'customer_id',
    });
    orders.belongsTo(models.rooms, {
      as: 'room',
      foreignKey: 'room_id',
    });
  };
  return orders;
};
