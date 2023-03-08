import express, { Router } from 'express';
import { Index, GetOne, Store, Update, LikeComment, Destroy } from '../Controllers/CommentController';
import { verifyAuth } from '../Middlewares/VerifyAuthMiddleware';
import { validateStore, validateUpdate } from '../Validations/CommentValidation';

const commentRouter: Router = express.Router();

commentRouter.get('/:logID', verifyAuth, Index);

commentRouter.get('/one/:id', verifyAuth, GetOne);

commentRouter.post('/:logId', verifyAuth, validateStore, Store);

commentRouter.put('/update-comment/:id', verifyAuth, validateUpdate, Update);

commentRouter.put('/like-comment/:id', verifyAuth, LikeComment);

commentRouter.delete('/:id', verifyAuth, Destroy);

export { commentRouter };
