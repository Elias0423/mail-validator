import { Router } from 'express';

import users from './user.routes';
import auth from './auth.routes';

const router = Router();
const path = '/api/v1/';
router.use(auth);
router.use(`${path}users`, users);

// Not Found
router.use((req, res) => {
  res.status(404).json({ message: 'Endpoint no encontrado. :(', data: null });
});

export default router;
