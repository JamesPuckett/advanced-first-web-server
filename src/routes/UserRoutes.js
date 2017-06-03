import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

router.get('/users', UserController.list);
router.post('/users', UserController.create);
router.get('/users/:_id', UserController.find);
router.delete('/users/:_id', UserController.delete);

export default router;
