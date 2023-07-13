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
const ProfileSchema_1 = __importDefault(require("../schemas/ProfileSchema"));
class ProfileDAO {
    static consultProfile(identificator, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonProfile = { _id: identificator };
            const profileExistence = yield ProfileSchema_1.default.findOne(jsonProfile).exec();
            if (profileExistence) {
                res.status(200).json(profileExistence);
            }
            else {
                res.status(400).json({ response: "Profile doesn't exists" });
            }
        });
    }
    static consultProfileAndCount(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield ProfileSchema_1.default.aggregate([
                { $lookup: { from: "User", localField: "_id", foreignField: "profileCode", as: "userAmmount" } },
                { $addFields: { userAmmount: { $size: "$userAmmount" } } }
            ]).sort({ _id: 1 });
            res.status(200).json(data);
        });
    }
    static createProfile(params, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(params.userData);
            delete params.userData;
            delete params._id;
            const exists = yield ProfileSchema_1.default.findOne(params).exec();
            if (exists) {
                res.status(400).json({ response: "Name already exists" });
            }
            else {
                const myProfile = new ProfileSchema_1.default(params);
                myProfile.save((e, object) => {
                    if (e) {
                        res.status(400).json({ response: "Something went wrong while saving" });
                        console.log(e);
                    }
                    else {
                        res.status(200).json({ response: "Created successfully", id: object._id });
                    }
                    ;
                });
            }
        });
    }
    static deleteProfile(identification, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield ProfileSchema_1.default.findById(identification).exec();
            if (exists) {
                ProfileSchema_1.default.findByIdAndDelete(identification, (e, object) => {
                    if (e) {
                        res.status(400).json({ response: "Something went wrong while deleting" });
                        console.log(e);
                    }
                    else {
                        res.status(200).json({ response: "Deleted successfully", id: object });
                    }
                    ;
                });
            }
            else {
                res.status(400).json({ response: "Doesn't exists" });
            }
        });
    }
    static updateProfile(identification, myJson, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield ProfileSchema_1.default.findById(identification).exec();
            if (exists) {
                ProfileSchema_1.default.findByIdAndUpdate({ _id: identification }, { $set: myJson }, (e, object) => {
                    if (e) {
                        res.status(400).json({ response: "Something went wrong while updating" });
                        console.log(e);
                    }
                    else {
                        res.status(200).json({ id: object, response: "Updated successfully", new: myJson });
                    }
                    ;
                });
            }
            else {
                res.status(400).json({ response: "Doesn't exists" });
            }
        });
    }
}
exports.default = ProfileDAO;
