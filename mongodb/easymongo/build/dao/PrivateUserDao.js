"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema_1 = __importDefault(require("../schemas/UserSchema"));
class PrivateUserDao {
    static createUser(email, parameters, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(parameters);
            const imageName = parameters.imageName;
            delete parameters._id;
            delete parameters.userData;
            parameters.imageName = imageName.substring(imageName.lastIndexOf("\\") + 1);
            const exists = yield UserSchema_1.default.findOne(email).exec();
            if (exists) {
                res.status(400).json({ response: "Email already exists" });
            }
            else {
                parameters.password = bcryptjs_1.default.hashSync(parameters.password, 10);
                const userObject = new UserSchema_1.default(parameters);
                userObject.save((e, object) => {
                    if (e) {
                        res.status(400).json({ response: 'Error creating a user' });
                    }
                    else {
                        res.status(200).json({ id: object._id });
                    }
                });
            }
        });
    }
    static getUsers(res) {
        return __awaiter(this, void 0, void 0, function* () {
            UserSchema_1.default.find().sort({ _id: -1 }).populate("profileCode")
                .exec((e, object) => {
                if (e) {
                    res.status(400).json({ response: "Error when colsulting" });
                }
                else {
                    res.status(200).json(object);
                }
            });
        });
    }
    static getOneUser(identificador, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonUserID = { _id: identificador };
            UserSchema_1.default.findOne(jsonUserID).populate("profileCode")
                .exec((e, object) => {
                if (e) {
                    res.status(400).json({ response: "Error when consulting" });
                }
                else {
                    res.status(200).json(object);
                }
            });
        });
    }
    static ammountUsersProfile({ identificadorPerfil: profileId }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongoose_1.Types.ObjectId.isValid(profileId)) {
                const key = { _id: profileId };
                const ammount = yield UserSchema_1.default.countDocuments({ codPerfil: key });
                res.status(200).json({ response: ammount });
            }
            else {
                res.status(400).json({ response: "Incorrect Id" });
            }
        });
    }
    static getProfileUsers(identificator, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (mongoose_1.Types.ObjectId.isValid(identificator)) {
                const key = { _id: identificator };
                UserSchema_1.default.find({ profileCode: key }).sort({ _id: -1 })
                    .populate({ path: "profileCode", select: "profileName" })
                    .exec((e, object) => {
                    if (e) {
                        console.log(e);
                        res.status(400).json({ response: "Error when consulting" });
                    }
                    else {
                        res.status(200).json(object);
                    }
                });
            }
            else {
                res.status(400).json({ response: "Incorrect identificator" });
            }
        });
    }
    static deleteUser(identificator, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield UserSchema_1.default.findById(identificator).exec();
            if (exists) {
                UserSchema_1.default.findByIdAndDelete(identificator, (e, object) => {
                    if (e) {
                        res.status(400).json({ response: "Error deleting user" });
                    }
                    else {
                        res.status(200).json({ deleted: object });
                    }
                });
            }
            else {
                res.status(400).json({ response: "User doesn't exists" });
            }
        });
    }
    static updateUser(identificator, ExternalJson, res) {
        return __awaiter(this, void 0, void 0, function* () {
            delete ExternalJson._id;
            delete ExternalJson.userData;
            delete ExternalJson.password;
            delete ExternalJson.creationDate;
            const nom = ExternalJson.imageName;
            ExternalJson.imageName = nom.substring(nom.lastIndexOf("\\") + 1);
            const exists = yield UserSchema_1.default.findById(identificator).exec();
            if (exists) {
                UserSchema_1.default.findByIdAndUpdate({ _id: identificator }, { $set: ExternalJson }, (e, object) => {
                    if (e) {
                        console.log(e);
                        res.status(400).json({ response: 'Error al actualizar el usuario, puede que el correo esté repetido' });
                    }
                    else {
                        res.status(200).json({ antiguo: object, nuevo: ExternalJson });
                    }
                });
            }
            else {
                res.status(400).json({ response: "El usuario NO exists" });
            }
        });
    }
}
exports.default = PrivateUserDao;
