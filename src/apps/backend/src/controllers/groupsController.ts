import { Request, Response } from 'express';
import { GroupsProvider } from '../providers';
import { getTaggedLogger } from '../services/logger';
import HttpStatusCodes from '../utils/httpStatusCodes';

const logger = getTaggedLogger('CONTROLLERS::Groups');

export function getAll(_req: Request, res: Response) {
  res.status(HttpStatusCodes.OK).json(GroupsProvider.getAll());
}

export function get(req: Request<{ id: string }>, res: Response) {
  const result = GroupsProvider.get(req.params.id);
  if (result) {
    res.status(HttpStatusCodes.OK).json(result);
  } else {
    logger.warn(`Requested group id [${req.params.id}] not found`);
    res.status(HttpStatusCodes.NOT_FOUND).send();
  }
}

export function del(req: Request<{ id: string }>, res: Response) {
  if (GroupsProvider.del(req.params.id)) {
    res.status(HttpStatusCodes.NO_CONTENT).send();
  } else {
    logger.warn(`Attempted to remove non registered device ${req.params.id}`);
    res.status(HttpStatusCodes.NOT_FOUND).send();
  }
}


// export async function issueCMD(groupId: string, payload: string) {
//   //find which device is it  

//   const topics = Groups.get(groupId).deviceIds.map(id => Devices.get(id).topic);
//   topics.forEach(topic => {
//     logger.info(`Emitting ${payload} to ${topic}`);
//     getMQTTClient().publish(topic, payload);
//   })
// }

// TODO:: implement groups create / update
// export async function add(id: string) {

// }

// export async function update(id: string, data: any) {

// }