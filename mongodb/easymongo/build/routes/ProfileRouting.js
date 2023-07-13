"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProfileController_1 = __importDefault(require("../controllers/ProfileController"));
class ProfileRouting {
    constructor() {
        this.apiProfileRoute = (0, express_1.Router)();
        this.loadRoutes();
    }
    loadRoutes() {
        this.apiProfileRoute.get("/everyone", ProfileController_1.default.consultAllProfiles);
        this.apiProfileRoute.get("/singular/:code", ProfileController_1.default.consultOneProfile);
        this.apiProfileRoute.post("/create", ProfileController_1.default.createProfile);
        this.apiProfileRoute.delete("/delete/:code", ProfileController_1.default.deleteProfile);
        this.apiProfileRoute.put("/update/:code", ProfileController_1.default.updateProfile);
    }
}
const profileRouting = new ProfileRouting();
exports.default = profileRouting.apiProfileRoute;
