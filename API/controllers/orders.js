const moment = require('moment');
const models = require('../models');
const Order = models.orders;
const Customer = models.customers;
const Room = models.rooms;

exports.index = (req, res) => {
  Room.findAll({
    include: [
      {
        model: Order,
        as: 'orders',
        include: [
          {
            model: Customer,
            as: 'customer',
          },
        ],
      },
    ],
  }).then(rooms => res.send(rooms));
};

exports.store = (req, res) => {
  moment.locale('id');
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
    console.log(order);
    res.send(order);
  });
};

exports.checkout = (req, res) => {
  Order.destroy({
    where: {id: req.params.id},
  }).then(orders => {
    if (orders) {
      res.send({
        success: true,
        orders,
      });
    } else {
      res.send({
        message: 'Error to delete orders',
      });
    }
  });
};
