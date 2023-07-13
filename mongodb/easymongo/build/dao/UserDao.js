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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema_1 = __importDefault(require("../schemas/UserSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserDAO {
    static verify(params, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = params.password;
            const useremail = params.email;
            UserSchema_1.default.findOne({ email: useremail }).populate("profileCode").exec((e, object) => {
                if (object) {
                    const drowssap = bcryptjs_1.default.compareSync(password, object.password);
                    if (drowssap) {
                        const myPayload = {
                            userCode: object._id,
                            email: params.email,
                            profile: object.profileCode.profilename
                        };
                        const myKey = String(process.env.ULTRA_SECRET_PASSWORD);
                        const myToken = jsonwebtoken_1.default.sign(myPayload, myKey, { expiresIn: 86400 });
                        res.status(200).json({ tokenUSTA: myToken });
                    }
                    else {
                        res.status(200).json({ response: "Invalid credentials" });
                    }
                }
                else {
                    res.status(200).json({ response: "Invalid credentials, nothing" });
                }
            });
        });
    }
    ;
    static consultUser(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const myUsers = yield UserSchema_1.default.find().sort({ _id: -1 });
            res.status(200).json(myUsers);
        });
    }
    ;
    static createUser(email, params, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = String(process.env.DEFAULT_PROFILE);
            const jsonProfile = { username: profile };
            const existingProfile = yield ProfileSchema_1.default.findOne(jsonProfile).exec();
            if (existingProfile) {
                params.profileCode = existingProfile._id;
            }
            else {
                const createProfile = new ProfileSchema_1.default(jsonProfile);
                createProfile.save();
                params.profileCode = createProfile._id;
            }
            const exists = yield UserSchema_1.default.findOne(email).exec();
            if (exists) {
                res.status(400).json({ response: "Email already exists" });
            }
            else {
                params.password = bcryptjs_1.default.hashSync(params.password, 10);
                const myUser = new UserSchema_1.default(params);
                myUser.save((e, object) => {
                    if (e) {
                        res.status(400).json({ response: "Something went wrong while saving" });
                        console.log(e);
                    }
                    else {
                        const myPayload = {
                            userCode: object._id,
                            email: params.email
                        };
                        const myKey = String(process.env.ULTRA_SECRET_PASSWORD);
                        const myToken = jsonwebtoken_1.default.sign(myPayload, myKey, { expiresIn: 86400 });
                        res.status(200).json({ tokenUSTA: myToken });
                    }
                    ;
                });
            }
            ;
        });
    }
    ;
    static deleteUser(identification, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield UserSchema_1.default.findById(identification).exec();
            if (exists) {
                UserSchema_1.default.findByIdAndDelete(identification, (e, object) => {
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
    static updateUser(identification, myJson, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield UserSchema_1.default.findById(identification).exec();
            if (exists) {
                UserSchema_1.default.findByIdAndUpdate({ _id: identification }, { $set: myJson }, (e, object) => {
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
exports.default = UserDAO;
