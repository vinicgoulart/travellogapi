import express, { Router } from "express";
import { Index, GetOne, Store, Update, Destroy } from "../Controllers/LogController";
import { verifyAuth } from "../Middlewares/VerifyAuthMiddleware";
import { validateStore, validateUpdate } from "../Validations/LogValidations";

const logRouter: Router = express.Router();

logRouter.get('/', verifyAuth, Index);

logRouter.get('/:id', verifyAuth, GetOne);

logRouter.post('/', verifyAuth, validateStore, Store);

logRouter.put('/:id', verifyAuth, validateUpdate, Update);

logRouter.delete('/:id', verifyAuth, Destroy);

export { logRouter };
