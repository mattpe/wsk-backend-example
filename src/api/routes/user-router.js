import express from 'express';
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';

const catRouter = express.Router();

catRouter.route('/').get(authenticateToken, getUser).post(postUser);

catRouter.route('/:id').get(getUserById).put(putUser).delete(deleteUser);

export default catRouter;
