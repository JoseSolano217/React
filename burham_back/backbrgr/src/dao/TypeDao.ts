import { Response } from "express";
import TypeSchema from "../schemas/TypeSchema";

class TypeDAO {
    protected static async consultType(identificator: any, res: Response): Promise<any> {
        const jsonType = { _id: identificator };
        const typeExistence = await TypeSchema.findOne(jsonType).exec();
        if (typeExistence) {
            res.status(200).json(typeExistence);
        } else {
            res.status(400).json({ response: "Type doesn't exists" });
        }
    }

    protected static async consultTypeAndCount(res: Response): Promise<any> {
        const data = await TypeSchema.aggregate([
            { $lookup: { from: "Type", localField: "_id", foreignField: "typeCode", as: "userAmmount" } },
            { $addFields: { userAmmount: { $size: "$userAmmount" } } }
        ]).sort({ _id: 1 });
        res.status(200).json(data);
    }

    protected static async createType(params: any, res: Response): Promise<any> {
        console.log(params.userData);
        delete params.userData;
        delete params._id;
        const exists = await TypeSchema.findOne(params).exec();
        if (exists) {
            res.status(400).json({response: "Type already exists"});
        } else {
            const myType = new TypeSchema(params);
            myType.save((e, object) => {
                if (e) {
                    res.status(400).json({response: "Something went wrong while saving"});
                    console.log(e);
                } else {
                    res.status(200).json({response: "Created successfully", id: object._id});
                };
            });
        }
    }

    protected static async deleteType(identification: any, res: Response): Promise<any> {
        const exists = await TypeSchema.findById(identification).exec();
        if (exists) {
            TypeSchema.findByIdAndDelete(identification, (e: any, object: any) => {
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

    protected static async updateType(identification: any, myJson: any, res: Response): Promise<any> {
        const exists = await TypeSchema.findById(identification).exec();
        if (exists) {
            TypeSchema.findByIdAndUpdate({_id: identification}, {$set: myJson}, (e: any, object: any) => {
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




export default TypeDAO;