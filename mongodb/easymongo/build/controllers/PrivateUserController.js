"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PrivateUserDao_1 = __importDefault(require("../dao/PrivateUserDao"));
class PrivateUserController extends PrivateUserDao_1.default {
    create(req, res) {
        const email = { email: req.body.email };
        PrivateUserController.createUser(email, req.body, res);
    }
    consult(req, res) {
        PrivateUserController.getUsers(res);
    }
    consultOne(req, res) {
        PrivateUserController.getOneUser(req.params.code, res);
    }
    delete(req, res) {
        PrivateUserController.deleteUser(req.params.code, res);
    }
    update(req, res) {
        PrivateUserController.updateUser(req.params.code, req.body, res);
    }
    profileAmmount(req, res) {
        PrivateUserController.ammountUsersProfile(req.params.profileCode, res);
    }
    consultByProfile(req, res) {
        PrivateUserController.getProfileUsers(req.params.profileCode, res);
    }
}
const privateUserController = new PrivateUserController();
exports.default = privateUserController;
