"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
class UserRouting {
    constructor() {
        this.apiUserRoute = (0, express_1.Router)();
        this.loadRoutes();
    }
    loadRoutes() {
        this.apiUserRoute.post("/login", UserController_1.default.login);
        this.apiUserRoute.get("/everyone", UserController_1.default.consultUser);
        this.apiUserRoute.post("/create", UserController_1.default.createUser);
        this.apiUserRoute.delete("/delete/:code", UserController_1.default.deleteUser);
        this.apiUserRoute.put("/update/:code", UserController_1.default.updateUser);
    }
}
const userRouting = new UserRouting();
exports.default = userRouting.apiUserRoute;
