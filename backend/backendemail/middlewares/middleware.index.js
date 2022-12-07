const cors = require('cors');
const { routes } = require('../routes/index');
const { database } = require('../config/database');

exports.middlewares = (app) => {
  database();

  app.use(cors());

  routes(app);
};
