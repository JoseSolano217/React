import { Schema, Model, model, Types } from "mongoose";
import UserEntity from "../entities/UserEntity";

const userSchema = new Schema<UserEntity>(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    userstate: { type: Number, required: true, enum: [1, 2, 3], default: 1 },
    creationDate: { type: Date, default: Date.now() },
    imageName: { type: String, default: "noAvatar.png" },
    userAvatar: { type: String, default: "noAvatar" },
    profileCode: { type: Types.ObjectId, ref: "Profile", required: true }
  },
  {
    versionKey: false,
  }
);

export default model("User", userSchema, "User");
