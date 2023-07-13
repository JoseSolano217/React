import { json, Response } from "express";
import ProfileSchema from "../schemas/ProfileSchema";
import jwt from "jsonwebtoken";
import UserSchema from "../schemas/UserSchema";
import encrypt from "bcryptjs";

class UserDAO {
    protected static async verify(params: any, res: Response) {
        const password = params.password;
        const useremail = params.email;

        UserSchema.findOne({email: useremail}).populate("profileCode").exec((e, object) => {
            if (object) {
                const drowssap = encrypt.compareSync(password, object.password);
                if (drowssap) {
                    const myPayload = {
                        userCode: object._id,
                        email: params.email,
                        profile: object.profileCode.profilename
                    };
                    const myKey = String(process.env.ULTRA_SECRET_PASSWORD);
                    const myToken = jwt.sign(myPayload, myKey, {expiresIn: 86400})
                    res.status(200).json({ tokenUSTA: myToken});
                } else {
                    res.status(200).json({response: "Invalid credentials"})
                }
            } else {
                res.status(200).json({response: "Invalid credentials, nothing"})
            }
        });
    };

    protected static async consultUser(res: Response): Promise<any>{
        const myUsers = await UserSchema.find().sort({_id: -1});
        res.status(200).json( myUsers );
    };

    protected static async createUser(email: any, params: any, res: Response): Promise<any> {
        const profile = String(process.env.DEFAULT_PROFILE);
        const jsonProfile = {username: profile};
        const existingProfile = await ProfileSchema.findOne(jsonProfile).exec();
        if (existingProfile) {
            params.profileCode = existingProfile._id;
        } else {
            const createProfile = new ProfileSchema(jsonProfile);
            createProfile.save();
            params.profileCode = createProfile._id;
        }

        const exists = await UserSchema.findOne(email).exec();
        if (exists) {
            res.status(400).json({response: "Email already exists"});
        } else {
            params.password = encrypt.hashSync(params.password, 10);
            const myUser = new UserSchema(params);
            myUser.save((e, object) => {
                if (e) {
                    res.status(400).json({response: "Something went wrong while saving"});
                    console.log(e);
                } else {
                    const myPayload = {
                        userCode: object._id,
                        email: params.email
                    };
                    const myKey = String(process.env.ULTRA_SECRET_PASSWORD);
                    const myToken = jwt.sign(myPayload, myKey, {expiresIn: 86400})
                    res.status(200).json({ tokenUSTA: myToken});
                };
            });
        };
    };

    protected static async deleteUser(identification: any, res: Response): Promise<any> {
        const exists = await UserSchema.findById(identification).exec();
        if (exists) {
            UserSchema.findByIdAndDelete(identification, (e: any, object: any) => {
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

    protected static async updateUser(identification: any, myJson: any, res: Response): Promise<any> {
        const exists = await UserSchema.findById(identification).exec();
        if (exists) {
            UserSchema.findByIdAndUpdate({_id: identification}, {$set: myJson}, (e: any, object: any) => {
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

export default UserDAO;