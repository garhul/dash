import { Request, Response, Router, static as Static } from 'express';
import { join } from 'path';
import { getConfig } from '../config';

import devices from './devices';
import groups from './groups';
import sensors from './sensors';
import scheduler from './scheduler';

const router = Router();

router.use('/api', devices);
router.use('/api', groups);
router.use('/api', sensors);
router.use('/api', scheduler);

//add route for exposing required config to frontend
router.get('/api/cfg', (req: Request, res: Response) => {
  res.status(200).send({
    wsPort: getConfig('server.ws')
  });
})

router.use(Static(join(__dirname, '../', getConfig('server.client_folder') as string)));
console.log(join(__dirname, '../', getConfig('server.client_folder') as string));

// Misc
const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).send('Not found');
};

router.get('*', notFoundHandler);

export default router;
