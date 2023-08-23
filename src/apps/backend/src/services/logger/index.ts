import PinoHttp from 'pino-http';
import Pino from 'pino';
import { getConfig } from '../../config';

export const logger = Pino({}, Pino.destination(getConfig('logger.destination') as string));
logger.level = getConfig('logger.level') as string;

export const getTaggedLogger = (tag: string) => logger.child({ tag });

export const httpLogger = PinoHttp({
  wrapSerializers: true,

  customSuccessMessage: function (req, res) {
    if (res.statusCode === 404) {
      return 'resource not found'
    }
    return `${req.method} completed`;
  },

  // Define a custom receive message
  customReceivedMessage: function (req, _res) {
    return `request received: ${req.method} ${req.url}`;
  },

  // Define a custom error message
  customErrorMessage: function (_req, res) {
    return 'request errored with status code: ' + res.statusCode
  },

  serializers: {
    err: (err) => err,
    req: (req) => {
      const { method, query, params, url, id } = req;
      return { method, query, params, url, id };
    },
    res: (res) => {
      return { status: res.statusCode, response_length: res.headers['content-length'] };
    },
  },
});

