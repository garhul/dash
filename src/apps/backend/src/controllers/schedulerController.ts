

import { Request, Response } from 'express';
import { SchedulerProvider } from '../providers';
import { getTaggedLogger } from '../services/logger';
import HttpStatusCodes from '../utils/httpStatusCodes';
const logger = getTaggedLogger('CONTROLLERS::Scheduler');

//TODO: implement crud actions, and scheduler

// export async function update(id: string, data: any) {
// }

// function triggerAction(rule: ruleData) {
//   const client = getMQTTClient();


//   // deviceIds.map(id => Devices.get(id).topic).forEach(topic => {
//   //   logger.info(`Emitting ${payload} to ${topic}`);
//   //   getMQTTClient().publish(topic, payload);
//   // });
// }

export function getAll(req: Request, res: Response) {
  res.status(HttpStatusCodes.OK).json(SchedulerProvider.getAll());
}