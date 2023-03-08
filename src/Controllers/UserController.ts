import { Request, Response } from "express";
import { userSchema } from "../Models/UserModel";

const Index = async (req: Request, res: Response) => {
    try{
        const listUser = await userSchema.find();
        res.status(200).json({ status: 'Success', list: listUser });
    }catch(error: any){
        res.status(500).json({ status: 'Failed' });
    }
};

const Destroy = async (req: Request, res: Response) => {
    var query = { _id: req.session._id };

    try{
        const destroyUser = await userSchema.findByIdAndDelete(query);
        res.status(200).json({ status: 'Success', message: 'User deleted!' });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: 'Could not destroy this user!' });
    }
};

const UpdateUser = async (req: Request, res: Response) => {
    var query = { _id: req.session._id };
    var userdata = {
        description: req.body.description
    };

    try{
        const updateUser = await userSchema.findByIdAndUpdate(query, userdata);
        res.status(200).json({ status: 'Success', message: 'User updated!' });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: 'Could not update this user!' });
    }
};

export { Index, Destroy, UpdateUser };
