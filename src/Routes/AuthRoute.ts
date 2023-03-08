import express, { Router } from 'express';
import { Register, Login, Logout, UpdatePassword } from '../Controllers/AuthController';
import { validateRegister, validateLogin, validateChangePass } from '../Validations/AuthValidation';

const authRouter: Router = express.Router();

authRouter.post('/register', validateRegister, Register);

authRouter.post('/login', validateLogin, Login);

authRouter.put('/change-pass', validateChangePass, UpdatePassword);

authRouter.get('/logout', Logout);

export { authRouter };
