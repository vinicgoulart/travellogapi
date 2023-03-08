import { Request, Response, NextFunction } from "express";

const validateUpdate = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.description){
        res.status(400).json({ status: 'Failed', message: 'Description is required to update your profile!' });
        return;
    }

    const description = req.body.description;
    if(description.length > 150){
        res.status(400).json({ status: 'Failed', message: 'Description must be shorter than 150 characters' });
        return;
    }

    next();
};

export { validateUpdate };
