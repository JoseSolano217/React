import { Schema, model } from "mongoose";
import TypeEntity from "../entities/TypeEntity";

const typeSchema = new Schema<TypeEntity>({
  typeName: { type: String, default: "/EGG/" },
},{
    versionKey: false
});

export default model("Type", typeSchema, "Type");
