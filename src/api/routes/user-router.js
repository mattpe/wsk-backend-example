import express from 'express';
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';

const userRouter = express.Router();

userRouter.route('/').get(authenticateToken, getUser).post(postUser);

userRouter.route('/:id').get(getUserById).put(putUser).delete(deleteUser);

export default userRouter;
