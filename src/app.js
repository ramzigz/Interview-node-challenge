/* eslint-disable no-underscore-dangle */
/**
 * Module dependencies.
 */
import 'module-alias/register.js';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import flash from 'connect-flash';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import boom from 'express-boom';
/**
   * Routes
   */
import appRoutes from './v1/routes/index.js';

/**
   * Load environment variables from .env file,
   */
dotenv.config({ path: '.env' });

/**
   * Create Express server.
   */
const app = express();
app.use(cors({ origin: true, credentials: true }));

/**
   * Express configuration.
   */
app.use(compression());
app.use(bodyParser.json());
app.use(boom());
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use(flash());

/**
   * Security
   */
app.use(helmet());
app.disable('x-powered-by');

/**
   * App routes.
   */
app.use('/api/v1', appRoutes);

app.get('/', (_req, res) => {
  res.status(200).json({
    msg: 'node-express-starter API',
    port: process.env.PORT || 3000,
  });
});

export default app;
