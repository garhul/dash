import { Router } from 'express';
import { DevicesController } from '../controllers';
const router = Router();

/** Device routes */
router.get('/devices', DevicesController.getAll);
router.get('/devices/:id', DevicesController.get)
router.post('/devices', DevicesController.issueCommand);
router.put('/devices/scan', DevicesController.scan);

export default router;