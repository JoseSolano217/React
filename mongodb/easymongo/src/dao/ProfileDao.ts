import { Response } from "express";
import ProfileSchema from "../schemas/ProfileSchema";

class ProfileDAO {
    protected static async consultProfile(identificator: any, res: Response): Promise<any> {
        const jsonProfile = { _id: identificator };
        const profileExistence = await ProfileSchema.findOne(jsonProfile).exec();
        if (profileExistence) {
            res.status(200).json(profileExistence);
        } else {
            res.status(400).json({ response: "Profile doesn't exists" });
        }
    }

    protected static async consultProfileAndCount(res: Response): Promise<any> {
        const data = await ProfileSchema.aggregate([
            { $lookup: { from: "User", localField: "_id", foreignField: "profileCode", as: "userAmmount" } },
            { $addFields: { userAmmount: { $size: "$userAmmount" } } }
        ]).sort({ _id: 1 });
        res.status(200).json(data);
    }

    protected static async createProfile(params: any, res: Response): Promise<any> {
        console.log(params.userData);
        delete params.userData;
        delete params._id;
        const exists = await ProfileSchema.findOne(params).exec();
        if (exists) {
            res.status(400).json({response: "Name already exists"});
        } else {
            const myProfile = new ProfileSchema(params);
            myProfile.save((e, object) => {
                if (e) {
                    res.status(400).json({response: "Something went wrong while saving"});
                    console.log(e);
                } else {
                    res.status(200).json({response: "Created successfully", id: object._id});
                };
            });
        }
    }

    protected static async deleteProfile(identification: any, res: Response): Promise<any> {
        const exists = await ProfileSchema.findById(identification).exec();
        if (exists) {
            ProfileSchema.findByIdAndDelete(identification, (e: any, object: any) => {
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

    protected static async updateProfile(identification: any, myJson: any, res: Response): Promise<any> {
        const exists = await ProfileSchema.findById(identification).exec();
        if (exists) {
            ProfileSchema.findByIdAndUpdate({_id: identification}, {$set: myJson}, (e: any, object: any) => {
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




export default ProfileDAO;