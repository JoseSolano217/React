import { Schema, Model, model, Types } from "mongoose";
import DimentionEntity from "../entities/DimentionEntity";

const dimentionSchema = new Schema<DimentionEntity>(
  {
    dimType: { type: String, default: "Extra egg" }
  },
  {
    versionKey: false,
  }
);

export default model("Dimention", dimentionSchema, "Dimention");