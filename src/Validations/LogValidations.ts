import { Request, Response, NextFunction } from "express";

const validateStore = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.title || !req.body.description || !req.body.place || !req.body.imgUrl){
        res.status(400).json({ status: 'Failed', message: `Title, description, place and Image's URL are required! ` });
        return;
    }

    const pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    const validURI = pattern.test(req.body.imgUrl);
    if(!validURI){
        res.status(400).json({ status: 'Failed', message: 'URI must be valid!' });
        return;
    }

    const title = req.body.title;
    if(title.length > 50){
        res.status(400).json({ status: 'Failed', message: 'Title must have a length shorter than 50 characters!' });
        return;
    }

    next();
};

const validateUpdate = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.title && !req.body.description && !req.body.dateOfTravel){
        res.status(400).json({ status: 'Failed', message: 'It is required to have title, description or date of travel at least!' });
        return;
    }

    const title = req.body.title;
    if(title.length > 50){
        res.status(400).json({ status: 'Failed', message: 'Title must have a length shorter than 50 characters!' });
        return;
    }

    next();
};

export { validateStore, validateUpdate };
