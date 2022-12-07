process.env.NODE_CONFIG_DIR = __dirname + '/configs';

import bodyParser from 'body-parser';
import compression from 'compression';
import config from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { createConnection } from 'typeorm';
import { Routes } from './interfaces/routes/routes.interface';
import { logger, stream } from './utils/logger';
import { PolyUtil } from './utils/poly';

import dbConnection from '../ormconfig';

export const App = (routes: Routes[]) => {
  const app: express.Application = express();
  const port: string | number = process.env.PORT || 3000;
  const env: string = process.env.NODE_ENV || 'development';

  const listen = async () => {
    app.listen(port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${env} =======`);
      logger.info(`🚀 App listening on the port ${port}`);
      logger.info(`=================================`);
    });

    const initialize = async () => {
      PolyUtil.start();
      await initializeMiddlewares();
      initializeRoutes(routes);
      console.log('started')
    };

    try {
      await createConnection(dbConnection);
      initialize();
    } catch (error) {
      logger.error('db connection failed', error);
    }
  };

  const initializeMiddlewares = async () => {
    app.use(morgan(config.get('log.format'), { stream }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(hpp());
    app.use(helmet());
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
  };

  const corsConfig = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 200,
    // origin: 'http://localhost:3000',
  }

  const initializeRoutes = (routesData: Routes[]) => {
    routesData.forEach(route => {
      app.use('/api', cors(corsConfig), route.router);
    });
  };

  return { listen, app };
};