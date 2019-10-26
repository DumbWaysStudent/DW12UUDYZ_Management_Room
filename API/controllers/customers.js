const models = require('../models');
const Customer = models.customers;

exports.index = (req, res) => {
  Customer.findAll().then(customer => {
    res.send(customer);
  });
};

exports.store = (req, res) => {
  console.log('Here');
  Customer.create(req.body).then(customer => {
    const name = customer.name;
    const identity_number = customer.identity_number;
    const phone_number = customer.phone_number;
    res.send({
      success: true,
      name,
      identity_number,
      phone_number,
    });
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Customer.update(req.body, {
    where: {id: id},
  }).then(customer => {
    res.send({
      success: true,
      id: req.params.id,
      name: req.body.name,
      identity_number: req.body.identity_number,
      phone_number: req.body.phone_number,
      image: req.body.image,
    });
  });
};
