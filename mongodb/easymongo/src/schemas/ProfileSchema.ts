import { Schema, model } from "mongoose";
import ProfileEntity from "../entities/ProfileEntity";

const profileSchema = new Schema<ProfileEntity>({
  profilename: { type: String, required: true, unique: true },  
  state: { type: Number, enum: [ 1, 2, 3 ], default: 1 },
},{
    versionKey: false
});

export default model("Profile", profileSchema, "Profile");
