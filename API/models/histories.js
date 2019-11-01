'use strict';
module.exports = (sequelize, DataTypes) => {
  const histories = sequelize.define(
    'histories',
    {
      room_id: DataTypes.INTEGER,
      customer_id: DataTypes.INTEGER,
      duration: DataTypes.INTEGER,
      order_end_time: DataTypes.DATE,
    },
    {},
  );
  histories.associate = function(models) {
    // associations can be defined here
  };
  return histories;
};
