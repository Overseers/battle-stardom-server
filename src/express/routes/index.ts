import { Router } from 'express';
import api from './api';
import frontend from './frontend';

const router = Router();

router.use(frontend);

router.use('/api', api);

export default router;
