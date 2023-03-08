import { Request, Response } from "express";
import { userSchema } from "../Models/UserModel";
import bcrypt from 'bcrypt';

const Register = async (req: Request, res: Response) => {
    var userData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        description: req.body.description
    };

    try{
        const createUser = new userSchema(userData);
        const saveUser = await createUser.save();
        res.status(201).json({ status: 'Success', message: 'User registered!' });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: 'Verify your email credentials again!' });
    }
};

const Login = async (req: Request, res: Response) => {
    var query = { email: req.body.email };

    try{
        const findUser = await userSchema.findOne(query);

        if(!findUser){
            res.status(403).json({ status: 'Failed', message: 'Incorrect user or email!' });
            return;
        }

        // @ts-ignore
        const isValid = await bcrypt.compare(req.body.password, findUser.password);
        if(!isValid){
            res.status(403).json({ status: 'Failed', message: 'Incorrect user or email!' });
            return;
        }

        req.session._id = findUser._id;
        req.session.username = findUser.username;
        req.session.save();

        console.log(req.session.id);
        res.header('sessionId', req.session.id);

        res.status(200).json({ status: 'Success', message: 'Authorized!' });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: 'All fields must be filled! try failed' });
    }
};

const Logout = async(req: Request, res: Response) => {
    try{
        req.session._id = null;
        req.session.username = null;
        req.session.save();
        req.session.regenerate(() => {});

        res.status(200).json({ status: 'Success', message: 'Logged out!' });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: 'It was not possible to conclude this action!' });
    }
};

const UpdatePassword = async(req: Request, res: Response) => {
    var query = { username: req.body.username };
    try{
        const findUser = await userSchema.findOne(query);

        if(!findUser){
            res.status(400).json({ status: 'Failed', message: 'Could not find this user!' });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const newPass = await bcrypt.hash(req.body.password, salt);

        const updateUser = await userSchema.findOneAndUpdate(query, { password: newPass });
        res.status(200).json({ status: 'Success', message: 'Password updated!' });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: `Could not update this user's password!` });
    }
};

export { Register, Login, Logout, UpdatePassword };
