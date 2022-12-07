const usersRoutes = require('./users.routes');

exports.routes = (app) => {
  const baseRoute = '/api/v1';

  // app.use(`${baseRoute}/users`, usersRoutes);
  app.use(`${baseRoute}/submitEmail`, usersRoutes);
};
