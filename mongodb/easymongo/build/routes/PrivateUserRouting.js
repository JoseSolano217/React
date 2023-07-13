"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PrivateUserController_1 = __importDefault(require("../controllers/PrivateUserController"));
class PrivateUserRouting {
    constructor() {
        this.ApiPrivateUserRoute = (0, express_1.Router)();
        this.loadRoutes();
    }
    loadRoutes() {
        this.ApiPrivateUserRoute.post("/create", PrivateUserController_1.default.create);
        this.ApiPrivateUserRoute.get("/everyone", PrivateUserController_1.default.consult);
        this.ApiPrivateUserRoute.get("/singular/:code", PrivateUserController_1.default.consultOne);
        this.ApiPrivateUserRoute.get("/everyone/:code", PrivateUserController_1.default.consultByProfile);
        this.ApiPrivateUserRoute.get("/ammount/:profileCode", PrivateUserController_1.default.profileAmmount);
        this.ApiPrivateUserRoute.delete("/delete/:code", PrivateUserController_1.default.delete);
        this.ApiPrivateUserRoute.put("/update/:code", PrivateUserController_1.default.update);
    }
}
const privateUserRouting = new PrivateUserRouting();
exports.default = privateUserRouting.ApiPrivateUserRoute;
