import { Response } from "express";
import BurgerSchema from "../schemas/BurgerSchema";

class BurgerDAO {
    protected static async consultBurger(identificator: any, res: Response): Promise<any> {
        const jsonBurger = { _id: identificator };
        const burgerExistence = await BurgerSchema.findOne(jsonBurger).exec();
        if (burgerExistence) {
            res.status(200).json(burgerExistence);
        } else {
            res.status(400).json({ response: "Burger doesn't exists" });
        }
    }

    protected static async consultBurgerAndCount(res: Response): Promise<any> {
        const data = await BurgerSchema.aggregate([
            { $lookup: { from: "Burger", localField: "_id", foreignField: "burgerCode", as: "userAmmount" } },
            { $addFields: { userAmmount: { $size: "$userAmmount" } } }
        ]).sort({ _id: 1 });
        res.status(200).json(data);
    }

    protected static async createBurger(params: any, res: Response): Promise<any> {
        console.log(params.userData);
        delete params.userData;
        delete params._id;
        const exists = await BurgerSchema.findOne(params).exec();
        if (exists) {
            res.status(400).json({response: "Burger already exists"});
        } else {
            const myBurger = new BurgerSchema(params);
            myBurger.save((e, object) => {
                if (e) {
                    res.status(400).json({response: "Something went wrong while saving"});
                    console.log(e);
                } else {
                    res.status(200).json({response: "Created successfully", id: object._id});
                };
            });
        }
    }

    protected static async deleteBurger(identification: any, res: Response): Promise<any> {
        const exists = await BurgerSchema.findById(identification).exec();
        if (exists) {
            BurgerSchema.findByIdAndDelete(identification, (e: any, object: any) => {
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

    protected static async updateBurger(identification: any, myJson: any, res: Response): Promise<any> {
        const exists = await BurgerSchema.findById(identification).exec();
        if (exists) {
            BurgerSchema.findByIdAndUpdate({_id: identification}, {$set: myJson}, (e: any, object: any) => {
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




export default BurgerDAO;