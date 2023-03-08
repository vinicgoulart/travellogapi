import { Request, Response } from "express";
import { logSchema } from "../Models/LogModel";

const Index = async (req: Request, res: Response) => {
    try{
        const listLogs = await logSchema.find();
        res.status(200).json({ status: 'Success', list: listLogs });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: 'Could not retrieve logs!' });
    }
};

const GetOne = async(req: Request, res: Response) => {
    var query = { _id: req.params.id };

    try{
        const oneLog = await logSchema.findById(query);
        res.status(200).json({ status: 'Success', log: oneLog });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: 'Could not retrieve this log!' });
    }
};

const Store = async (req: Request, res: Response) => {
    var userdata = {
        title: req.body.title,
        description: req.body.description,
        dateOfTravel: req.body.dateOfTravel,
        place: req.body.place,
        idUser: req.session._id,
        imgUrl: req.body.imgUrl
    };

    try{
        const storeLog = new logSchema(userdata);
        const saveLog = await storeLog.save();

        res.status(201).json({ status: 'Success', message: 'Log created!' });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: 'Could not create this log!' });
    }
};

const Destroy = async (req: Request, res: Response) => {
    var query = { _id: req.params.id };

    try{
        const findLog = await logSchema.findById(query);
        if(!findLog || findLog.idUser !== req.session._id){
            res.status(403).json({ status: 'Failed', message: 'You are not authorized to destroy this log!' });
            return;
        }

        const destroyLog = await logSchema.findByIdAndDelete(query);
        res.status(200).json({ status: 'Success', message: 'Log destroyed!' });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: 'Could not destroy this log!' });
    }
};

const Update = async (req: Request, res: Response) => {
    var query = { _id: req.params.id };
    var userdata = {
        title: req.body.title,
        description: req.body.description,
        dateOfTravel: req.body.dateOfTravel
    };

    try{    
        const retrieveLog = await logSchema.findById(query);

        if(!retrieveLog || retrieveLog.idUser !== req.session._id){
            res.status(403).json({ status: 'Failed', message: 'You are not authorized to update this log!' });
            return;
        }

        const updateLog = await logSchema.findByIdAndUpdate(query, userdata);
        res.status(200).json({ status: 'Success', message: 'Log updated!' });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: 'Could not update this log!' });
    }
};

export { Index, GetOne, Store, Update, Destroy };
