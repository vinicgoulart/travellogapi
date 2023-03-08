import { Request, Response, NextFunction } from "express";

const verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.session._id || !req.session.username){
        res.status(403).json({ status: 'Failed', message: 'Unauthorized!' });
        return;
    }

    if(req.header('sessionId') !== req.session.id){
        res.status(403).json({ status: 'Failed', message: 'Unauthorized!' });
        return;
    }

    next();
};

export { verifyAuth };
