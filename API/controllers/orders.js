const moment = require('moment');
const connection = require('../db');
moment.locale('id');
const models = require('../models');
const Order = models.orders;
const Customer = models.customers;
const Room = models.rooms;

// exports.index = (req, res) => {
//   Order.findAll({
//     include: [
//       {
//         model: Customer,
//         as: 'customer',
//       },
//       {
//         model: Room,
//         as: 'room',
//       },
//     ],
//   }).then(orders => res.send(orders));
// };

exports.index = (req, res) => {
  connection.query(
    'SELECT * FROM rooms r LEFT JOIN orders o ON r.id=o.room_id GROUP BY name',
    (err, rows) => {
      if (err) {
        throw err;
      }
      res.send(rows);
    },
  );
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

exports.updateOrder = (req, res) => {
  const orderId = req.params.orderId;
  const {room_id, customer_id, duration, order_end_time} = req.body;
  Order.update(
    {
      room_id: room_id,
      customer_id: customer_id,
      duration: duration,
      order_end_time: order_end_time,
      is_booked: false,
      is_done: true,
    },
    {
      where: {id: orderId},
    },
  ).then(order => {
    res.send({
      success: true,
      data: req.body,
    });
  });
  console.log(req.body);
};

exports.update = (req, res) => {
  const id = req.params.id;
  Order.update(req.body, {
    where: {id: id},
  }).then(customer => {
    res.send({
      success: true,
      id: req.params.id,
      data: req.body,
    });
  });
};
