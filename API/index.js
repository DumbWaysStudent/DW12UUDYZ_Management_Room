const express = require('express');
const bodyParser = require('body-parser');
require('express-group-routes');
const app = express();

app.get('/', (req, res) => {
  res.send('API Ngebokuy');
});

app.use(bodyParser.json());
app.use('public/uploads', express.static('public/uploads'));

//controllers
const AuthController = require('./controllers/auth');
const RoomsController = require('./controllers/rooms');
const CustomersController = require('./controllers/customers');
const OrdersController = require('./controllers/orders');

//middlewares
const {authenticated} = require('./middleware');

app.group('/api/v2', router => {
  //auth API
  router.post('/login', AuthController.login); //1
  router.post('/register', AuthController.register); //2

  //API Rooms
  router.get('/rooms', authenticated, RoomsController.index); //3
  router.get('/room/:id', authenticated, RoomsController.show); //9
  router.post('/room', authenticated, RoomsController.store); //4
  router.put('/room/:id', authenticated, RoomsController.update); //5

  //API Customers
  router.get('/customers', authenticated, CustomersController.index); //6
  router.post('/customer', authenticated, CustomersController.store); //7
  router.put('/customer/:id', authenticated, CustomersController.update); //8

  //API Orders
  router.get('/checkin', authenticated, OrdersController.index); //9
  router.post('/checkin', authenticated, OrdersController.store); //10
  router.put('/order/:id', authenticated, OrdersController.update); //11
});

app.listen(process.env.PORT || 9876, function() {
  console.log('Listening on our port!');
});
