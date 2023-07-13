import { Types } from "mongoose";
import { Response } from 'express';

import cypher from "bcryptjs";
import UserSchema from "../schemas/UserSchema";

class PrivateUserDao {
    protected static async createUser(email: any, parameters: any, res: Response): Promise<any> {
        console.log(parameters);
        const imageName = parameters.imageName;
        delete parameters._id;
        delete parameters.userData;
        parameters.imageName = imageName.substring(imageName.lastIndexOf("\\") + 1);
        const exists = await UserSchema.findOne(email).exec();
        if (exists) {
            res.status(400).json({ response: "Email already exists" });
        } else {
            parameters.password = cypher.hashSync(parameters.password, 10);
            const userObject = new UserSchema(parameters);
            userObject.save((e, object) => {
                if (e) {
                    res.status(400).json({ response: 'Error creating a user' });
                } else {
                    res.status(200).json({ id: object._id });
                }
            });
        }
    }

    protected static async getUsers(res: Response): Promise<any> {
        UserSchema.find().sort({ _id: -1 }).populate("profileCode")
            .exec((e, object) => {
                if (e) {
                    res.status(400).json({ response: "Error when colsulting" });
                } else {
                    res.status(200).json(object);
                }
            });
    }

    protected static async getOneUser(identificador: any, res: Response): Promise<any> {
        const jsonUserID = { _id: identificador };
        UserSchema.findOne(jsonUserID).populate("profileCode")
            .exec((e, object) => {
                if (e) {
                    res.status(400).json({ response: "Error when consulting" });
                } else {
                    res.status(200).json(object);
                }
            });
    }

    protected static async ammountUsersProfile({identificadorPerfil: profileId}: any, res: Response): Promise<any> {
        if (Types.ObjectId.isValid(profileId)) {
            const key = { _id: profileId };
            const ammount = await UserSchema.countDocuments({ codPerfil: key });
            res.status(200).json({ response: ammount });
        } else {
            res.status(400).json({ response: "Incorrect Id" });
        }
    }

    protected static async getProfileUsers(identificator: any, res: Response): Promise<any> {
        if (Types.ObjectId.isValid(identificator)) {
            const key = { _id: identificator };
            UserSchema.find({ profileCode: key }).sort({ _id: -1 })
                .populate({ path: "profileCode", select: "profileName" })
                .exec((e, object) => {
                    if (e) {
                        console.log(e);
                        res.status(400).json({ response: "Error when consulting" });
                    } else {
                        res.status(200).json(object);
                    }
                });
        } else {
            res.status(400).json({ response: "Incorrect identificator" });
        }
    }

    protected static async deleteUser(identificator: any, res: Response): Promise<any> {
        const exists = await UserSchema.findById(identificator).exec();
        if (exists) {
            UserSchema.findByIdAndDelete(identificator, (e: any, object: any) => {
                if (e) {
                    res.status(400).json({ response: "Error deleting user" });
                } else {
                    res.status(200).json({ deleted: object });
                }
            });
        } else {
            res.status(400).json({ response: "User doesn't exists" });
        }
    }

    protected static async updateUser(identificator: string, ExternalJson: any, res: Response): Promise<any> {
        delete ExternalJson._id;
        delete ExternalJson.userData;
        delete ExternalJson.password;
        delete ExternalJson.creationDate;

        const nom = ExternalJson.imageName;
        ExternalJson.imageName = nom.substring(nom.lastIndexOf("\\") + 1);
        
        const exists = await UserSchema.findById(identificator).exec();
        if (exists) {
            UserSchema.findByIdAndUpdate(
                { _id: identificator },
                { $set: ExternalJson },
                (e: any, object: any) => {
                    if (e) {
                        console.log(e);
                        res.status(400).json({ response: 'Error al actualizar el usuario, puede que el correo esté repetido' });
                    } else {
                        res.status(200).json({ antiguo: object, nuevo: ExternalJson });
                    }
                });
        } else {
            res.status(400).json({ response: "El usuario NO exists" });
        }
    }
}

export default PrivateUserDao;