import express from 'express';
import cors from 'cors';
import { logger, httpLogger } from './services/logger';
import { getConfig } from './config';
import { closeConnections } from './evDispatcher';
import router from './routes/';

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(httpLogger);

const errHandler = (err: Error, _req: express.Request, res: express.Response) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
};

app.use(router);

const server = app.listen(getConfig('server.port'), () => {
  logger.info(`Listening at http://localhost:${getConfig('server.port')}/api`);
});

app.use(errHandler);
server.on('error', logger.error);

process.on('uncaughtExceptionMonitor', (err) => {
  logger.error(`Uncaught error ${err}`);
});

process.on('beforeExit', () => {
  logger.info('closing connections...');
  closeConnections();
});

process.on('uncaughtExceptionMonitor', (ex) => {
  logger.error(ex.message);
});
