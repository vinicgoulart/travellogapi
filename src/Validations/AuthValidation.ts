import { Request, Response, NextFunction } from "express";

const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.username || !req.body.email || !req.body.password || !req.body.description){
        res.status(400).json({ status: 'Failed', message: 'All fields must be filled!' });
        return;
    }

    const pattern = /^[a-zA-Z0-9]{3,}$/;
    const validUsername = pattern.test(req.body.username);

    if(!validUsername){
        res.status(400).json({ status: 'Failed', message: 'Username can only contain alphanumeric characters and must be longer than 3' });
        return;
    }

    const passwordPattern = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;
    const validPassword = passwordPattern.test(req.body.password);

    if(!validPassword){
        res.status(400).json({ status: 'Failed', message: 'Must contain 8+ characters length, 2 in upper case, 1 special character, 2 numbers and 3 in lower case' });
        return;
    }

    const description = req.body.description;
    if(description.length > 150){
        res.status(400).json({ status: 'Failed', message: 'Description must be shorter than 150 characters' });
        return;
    }

    next();
};

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.email || !req.body.password){
        res.status(400).json({ status: 'Failed', message: 'Both password and email are required!' });
        return;
    }

    next();
};

const validateChangePass = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.username || !req.body.password){
        res.status(400).json({ status: 'Failed', message: 'Both password and username are required!' });
        return;
    }

    const pattern = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;
    const validPassword = pattern.test(req.body.password);

    if(!validPassword){
        res.status(400).json({ status: 'Failed', message: 'Must contain 8+ characters length, 2 in upper case, 1 special character, 2 numbers and 3 in lower case' });
        return;
    }

    next();
};

export { validateRegister, validateLogin, validateChangePass };
