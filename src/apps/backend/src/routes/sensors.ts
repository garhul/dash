import { Router } from 'express';
import { SensorsController } from '../controllers';

const router = Router();

/** Sensors routes */
router.get('/sensors', SensorsController.getAll);

export default router;
