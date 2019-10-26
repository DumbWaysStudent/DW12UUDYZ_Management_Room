const jwt = require('jsonwebtoken');
const models = require('../models');
const Admin = models.admins;

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Admin.findOne({where: {email, password}}).then(admin => {
    if (admin) {
      const access_token = jwt.sign({admin_id: admin.id}, 'my-secret-key');
      res.send({
        success: true,
        id: admin.id,
        email,
        access_token,
      });
    } else {
      res.send({
        success: false,
        message: 'Wrong Email or Password!',
      });
    }
  });
};

exports.register = (req, res) => {
  Admin.create(req.body).then(admin => {
    const access_token = jwt.sign({admin_id: admin.id}, 'my-secret-key');
    const email = admin.email;
    const id = admin.id;
    res.send({
      success: true,
      id,
      email,
      access_token,
    });
  });
};
