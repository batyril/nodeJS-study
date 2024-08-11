import { Router } from 'express';
import { userChain } from '../validators/index.js';
import { addUser } from '../controllers/user/addUser.js';
import checkValidationErrors from '../middlewares/checkValidationErrors.js';
import { authenticateUser } from '../controllers/user/authenticateUser.js';
import checkAuth from '../middlewares/checkAuth.js';

const userRouter = Router();

userRouter.post('/', userChain(), checkValidationErrors(), addUser);
userRouter.post(
  '/auth',
  userChain(),
  checkValidationErrors(),
  checkAuth(),
  authenticateUser
);

export default userRouter;
