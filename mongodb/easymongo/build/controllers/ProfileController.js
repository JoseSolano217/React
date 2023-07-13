"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProfileDao_1 = __importDefault(require("../dao/ProfileDao"));
class ProfileController extends ProfileDao_1.default {
    consultOneProfile(req, res) {
        ProfileController.consultProfile(req.params.code, res);
    }
    consultAllProfiles(req, res) {
        ProfileController.consultProfileAndCount(res);
    }
    createProfile(req, res) {
        ProfileController.createProfile(req.body, res);
    }
    deleteProfile(req, res) {
        ProfileController.deleteProfile(req.params.code, res);
    }
    updateProfile(req, res) {
        ProfileController.updateProfile(req.params.code, req.body, res);
    }
}
const profileController = new ProfileController();
exports.default = profileController;
