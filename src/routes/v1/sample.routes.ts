import { Router } from 'express';
import { getSampleData, triggerError } from '../../controllers/sample.controller';

const router = Router();

router.get('/', getSampleData);
router.get('/error-test', triggerError);

export default router;
