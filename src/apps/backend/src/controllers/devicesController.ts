import { Request, Response } from 'express';
import { DevicesProvider } from '../providers';
import { getTaggedLogger } from '../services/logger';
import HttpStatusCodes from '../utils/httpStatusCodes';

const logger = getTaggedLogger('CONTROLLERS::Devices');

export function add(req: Request, res: Response) {
  res.status(HttpStatusCodes.NOT_IMPLEMENTED).send();
  logger.warn('Add device function not implemented');
}

export function issueCommand(req: Request<unknown, unknown, { deviceIds: string[], payload: string }>, res: Response) {
  try {
    DevicesProvider.issueCommand(req.body.deviceIds, req.body.payload);
    res.status(HttpStatusCodes.ACCEPTED).send();
  } catch (ex) {
    logger.error(`Error issuig command ${ex}`);
  }
}

export function scan(req: Request, res: Response) {
  if (!DevicesProvider.isScanning()) {
    DevicesProvider.scan();
    res.status(HttpStatusCodes.ACCEPTED).send();
  } else {
    res.status(HttpStatusCodes.SERVICE_UNAVAILABLE);
    res.set({ 'Retry-After': 120 }).send();
  }
}

export function del(req: Request<{ id: string }>, res: Response) {
  if (DevicesProvider.del(req.params.id)) {
    res.status(HttpStatusCodes.NO_CONTENT).send();
  } else {
    logger.warn(`Attempted to remove non registered device ${req.params.id}`);
    res.status(HttpStatusCodes.NOT_FOUND).send();
  }
}

export function get(req: Request<{ id: string }>, res: Response) {
  const result = DevicesProvider.get(req.params.id);
  if (result) {
    res.status(HttpStatusCodes.OK).json(result);
  } else {
    logger.warn(`Requested device id [${req.params.id}] not found`);
    res.status(HttpStatusCodes.NOT_FOUND).send();
  }
}
//interface Request<P extends core.Params = core.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = core.Query> extends core.Request<P, ResBody, ReqBody, ReqQuery> { }

export function getAll(req: Request, res: Response) {
  res.status(200).json(DevicesProvider.getAll());
}