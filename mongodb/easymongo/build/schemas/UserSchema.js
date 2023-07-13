"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    userstate: { type: Number, required: true, enum: [1, 2, 3], default: 1 },
    creationDate: { type: Date, default: Date.now() },
    imageName: { type: String, default: "noAvatar.png" },
    userAvatar: { type: String, default: "noAvatar" },
    profileCode: { type: mongoose_1.Types.ObjectId, ref: "Profile", required: true }
}, {
    versionKey: false,
});
exports.default = (0, mongoose_1.model)("User", userSchema, "User");
