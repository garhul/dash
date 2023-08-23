import { Router } from 'express';
import { GroupsController } from '../controllers';
const router = Router();

/** Group routes */
router.get('/groups', GroupsController.getAll);
router.get('/groups/:id', GroupsController.get);
router.delete('/groups/:id', GroupsController.del);

// router.post('/groups', (req: Request, res: Response) => {
//   return res.json(GroupsController.issueCMD(req.body.deviceId, req.body.payload));
// });

export default router;