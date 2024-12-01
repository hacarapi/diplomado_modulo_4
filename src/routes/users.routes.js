import { Router } from 'express';
import userControllers from '../controllers/user.controllers.js';
import { authenticateToken } from '../middlewares/authenticate.middleware.js';

const router = Router();

router.route('/')
    .get(userControllers.getUsers)
    .post(userControllers.createUser);

router.route('/:id')
    .get(authenticateToken, userControllers.getUser)
    .put(authenticateToken, userControllers.updateUser)
    .patch(authenticateToken, userControllers.activateInactivate)
    .delete(authenticateToken, userControllers.deleteUser);

router.route('/:id/tasks')
    .get(authenticateToken, userControllers.getTasks);

export default router;
