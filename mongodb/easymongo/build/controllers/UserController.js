"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDao_1 = __importDefault(require("../dao/UserDao"));
class UserController extends UserDao_1.default {
    login(req, res) {
        UserDao_1.default.verify(req.body, res);
    }
    consultUser(req, res) {
        UserController.consultUser(res);
    }
    createUser(req, res) {
        const email = { email: req.body.email };
        UserController.createUser(email, req.body, res);
    }
    deleteUser(req, res) {
        UserController.deleteUser(req.params.code, res);
    }
    updateUser(req, res) {
        UserController.updateUser(req.params.code, req.body, res);
    }
}
const userController = new UserController();
exports.default = userController;
