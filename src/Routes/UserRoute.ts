import express, { Router } from 'express';
import { Index, Destroy, UpdateUser } from '../Controllers/UserController';
import { verifyAuth } from '../Middlewares/VerifyAuthMiddleware';
import { validateUpdate } from '../Validations/UserValidation';

const userRouter: Router = express.Router();

userRouter.get('/', verifyAuth, Index);

userRouter.delete('/', verifyAuth, Destroy);

userRouter.put('/', verifyAuth, validateUpdate, UpdateUser);

export { userRouter };
