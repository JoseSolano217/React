import { Response } from "express";
import DimentionSchema from "../schemas/DimentionSchema";

class DimentionDAO {
    protected static async consultDimention(identificator: any, res: Response): Promise<any> {
        const jsonDimention = { _id: identificator };
        const dimentionExistence = await DimentionSchema.findOne(jsonDimention).exec();
        if (dimentionExistence) {
            res.status(200).json(dimentionExistence);
        } else {
            res.status(400).json({ response: "Dimention doesn't exists" });
        }
    }

    protected static async consultDimentionAndCount(res: Response): Promise<any> {
        const data = await DimentionSchema.aggregate([
            { $lookup: { from: "Dimention", localField: "_id", foreignField: "dimentionCode", as: "userAmmount" } },
            { $addFields: { userAmmount: { $size: "$userAmmount" } } }
        ]).sort({ _id: 1 });
        res.status(200).json(data);
    }

    protected static async createDimention(params: any, res: Response): Promise<any> {
        console.log(params.userData);
        delete params.userData;
        delete params._id;
        const exists = await DimentionSchema.findOne(params).exec();
        if (exists) {
            res.status(400).json({response: "Dimention already exists"});
        } else {
            const myDimention = new DimentionSchema(params);
            myDimention.save((e, object) => {
                if (e) {
                    res.status(400).json({response: "Something went wrong while saving"});
                    console.log(e);
                } else {
                    res.status(200).json({response: "Created successfully", id: object._id});
                };
            });
        }
    }

    protected static async deleteDimention(identification: any, res: Response): Promise<any> {
        const exists = await DimentionSchema.findById(identification).exec();
        if (exists) {
            DimentionSchema.findByIdAndDelete(identification, (e: any, object: any) => {
                if (e) {
                    res.status(400).json({response: "Something went wrong while deleting"});
                    console.log(e);
                } else {
                    res.status(200).json({response: "Deleted successfully", id: object});
                };
            });
        } else {
            res.status(400).json({response: "Doesn't exists"});
        }
    }

    protected static async updateDimention(identification: any, myJson: any, res: Response): Promise<any> {
        const exists = await DimentionSchema.findById(identification).exec();
        if (exists) {
            DimentionSchema.findByIdAndUpdate({_id: identification}, {$set: myJson}, (e: any, object: any) => {
                if (e) {
                    res.status(400).json({response: "Something went wrong while updating"});
                    console.log(e);
                } else {
                    res.status(200).json({id: object, response: "Updated successfully", new: myJson});
                };
            });
        } else {
            res.status(400).json({response: "Doesn't exists"});
        }
    }
}




export default DimentionDAO;