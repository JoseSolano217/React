"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const profileSchema = new mongoose_1.Schema({
    profilename: { type: String, required: true, unique: true },
    state: { type: Number, enum: [1, 2, 3], default: 1 },
}, {
    versionKey: false
});
exports.default = (0, mongoose_1.model)("Profile", profileSchema, "Profile");
