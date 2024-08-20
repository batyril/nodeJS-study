import { Router } from 'express';
import { emailChain, userChain } from '../validators/index.js';
import { registration } from '../controllers/user/registration.js';
import checkValidationErrors from '../middlewares/checkValidationErrors.js';
import { login } from '../controllers/user/login.js';
import { update } from '../controllers/user/update.js';
import { deleted } from '../controllers/user/delete.js';
import { getAll } from '../controllers/user/getAll.js';
import checkAuth from '../middlewares/checkAuth.js';
import checkRoles from '../middlewares/checkRoles.js';

const userRouter = Router();

userRouter.get('/', checkAuth(), checkRoles(['ADMIN']), getAll);

userRouter.post(
  '/registration',
  userChain(),
  checkValidationErrors(),
  registration
);

userRouter.post('/login', userChain(), checkValidationErrors(), login);

userRouter.put('/', emailChain(), checkAuth(), checkValidationErrors(), update);

userRouter.delete(
  '/',
  emailChain(),
  checkAuth(),
  checkRoles(['ADMIN']),
  checkValidationErrors(),
  deleted
);

export default userRouter;
