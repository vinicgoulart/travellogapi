import { Request, Response } from 'express';
import { commentSchema } from '../Models/CommentModel';

const Index = async(req: Request, res: Response) => {
    var query = { logId: req.params.logID };

    try{
        const listComments = await commentSchema.find(query);
        res.status(200).json({ status: 'Success', list: listComments });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: 'Could not retrieve those comments' });
    }
};

const GetOne = async(req: Request, res: Response) => {
    var query = { _id: req.params.id };
    try{
        const oneComment = await commentSchema.findById(query);
        res.status(200).json({ status: 'Success', comment: oneComment });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: 'Could not retrieve this comment!' });
    }
};

const Store = async(req: Request, res: Response) => {
    var userData = {
        logId: req.params.logId,
        comment: req.body.comment,
        dateOfComment: Date.now(),
        idUser: req.session._id,
    };

    try{
        const Comment = new commentSchema(userData);
        const saveComment = await Comment.save();

        res.status(201).json({ status: 'Success', message: 'Comment created!' });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: 'Could not create this comment!' });
    }
};

const Destroy = async(req: Request, res: Response) => {
    var query = { _id: req.params.id };

    try{
        const findComment = await commentSchema.findById(query);

        if(!findComment || findComment.idUser !== req.session._id){
            res.status(403).json({ status: 'Failed', message: 'You are not authorized to destroy this comment!' });
            return;
        }

        const destroyComment = await commentSchema.findByIdAndDelete(query);
        res.status(200).json({ status: 'Success', message: 'Comment deleted!' });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: 'Could not destroy this comment!' });
    }
};

const Update = async (req: Request, res: Response) => {
    var query = { _id: req.params.id };
    var userdata = {
        comment: req.body.comment
    };

    try{
        const comment = await commentSchema.findById(query);

        if(!comment || comment.idUser !== req.session._id){
            res.status(403).json({ status: 'Failed', message: 'You are not allowed to update this comment!' });
            return;
        }

        const updateComment = await commentSchema.findByIdAndUpdate(query, userdata);
        res.status(200).json({ status: 'Success', message: 'Comment updated!' });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: 'Could not update this comment!' });
    }
};

const LikeComment = async (req: Request, res: Response) => {
    var query = { _id: req.params.id };

    try{
        const comment = await commentSchema.findById(query);

        if(!comment || typeof comment.likes !== 'number'){
            res.status(400).json({ status: 'Failed', message: 'Could not like this comment!' });
            return;
        }

        const newLike = Number(comment.likes) + 1;
        const updateSyntax = { likes: newLike };

        const likeComment = await commentSchema.findByIdAndUpdate(query, updateSyntax);
        res.status(200).json({ status: 'Success', message: 'Comment liked!' });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: 'Could not like this comment!' });
    }
};

export { Index, GetOne, Store, Update, Destroy, LikeComment };
