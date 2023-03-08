import { Request, Response, NextFunction } from "express";

const validateStore = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.comment){
        res.status(400).json({ status: 'Failed', message: 'The comment text is necessary!' });
        return;
    }

    next();
};

const validateUpdate = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.comment){
        res.status(400).json({ status: 'Failed', message: 'The comment text is necessary!' });
        return;
    }

    next();
};

export { validateStore, validateUpdate };
