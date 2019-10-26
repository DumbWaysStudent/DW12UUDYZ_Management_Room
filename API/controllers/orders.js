const moment = require('moment');
moment.locale('id');
const models = require('../models');
const Order = models.orders;
const Customer = models.customers;
const Room = models.rooms;

exports.index = (req, res) => {
  Order.findAll({
    include: [
      {
        model: Customer,
        as: 'customer',
      },
      {
        model: Room,
        as: 'room',
      },
    ],
  }).then(orders => res.send(orders));
};

exports.store = (req, res) => {
  const {room_id, customer_id, duration} = req.body;
  const startdate = moment().format();
  let end_date_time = moment(startdate)
    .add(duration, 'minutes')
    .format();
  Order.create({
    room_id: room_id,
    customer_id: customer_id,
    duration: duration,
    order_end_time: end_date_time,
    is_booked: true,
    is_done: false,
  }).then(order => {
    res.send(order);
  });
};
