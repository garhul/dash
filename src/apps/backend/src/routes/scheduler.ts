import { Router } from 'express';
import { SchedulerController } from '../controllers';

const router = Router();

/** Scheduler rules routes */
router.get('/scheduler', SchedulerController.getAll);

// router.delete('/scheduler', SchedulerController.de))
// router.get('/scheduler', (_req: Request, res: Response) => {
//   return res.json(SchedulerController.getAll());
// });

// router.post('/scheduler', (req: Request, res: Response) => {
//   console.log(req.body);
// });

export default router;