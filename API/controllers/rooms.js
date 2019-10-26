const moment = require('moment');
moment.locale('id');
const models = require('../models');
const Room = models.rooms;

exports.index = (req, res) => {
  Room.findAll().then(room => {
    res.send(room);
  });
};

exports.store = (req, res) => {
  Room.create(req.body).then(room => {
    const id = room.id;
    const name = room.name;
    res.send({
      success: true,
      id,
      name,
    });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Room.update(req.body, {
    where: {id: id},
  }).then(room => {
    res.send({
      success: true,
      id: req.params.id,
      name: req.body.name,
    });
  });
};

exports.show = (req, res) => {
  Room.findAll({
    where: {id: req.params.id},
    // include: [
    //   {
    //     model: Order,
    //     as: 'order',
    //   },
    // ],
  }).then(rooms => res.send(rooms));
};
