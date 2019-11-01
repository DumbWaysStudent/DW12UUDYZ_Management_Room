const models = require('../models');
const Historie = models.histories;
const moment = require('moment');

exports.store = (req, res) => {
  moment.locale('id');
  const {room_id, customer_id, duration} = req.body;
  const startdate = moment().format();
  let end_date_time = moment(startdate)
    .add(duration, 'minutes')
    .format();
  Historie.create({
    room_id: room_id,
    customer_id: customer_id,
    duration: duration,
    order_end_time: end_date_time,
  }).then(order => {
    res.send(order);
  });
};
