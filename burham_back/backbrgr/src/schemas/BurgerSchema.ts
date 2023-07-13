import { Schema, Model, model, Types } from "mongoose";
import BurgerEntity from "../entities/BurgerEntity";

const burgerSchema = new Schema<BurgerEntity>(
  {
    type: { type: Types.ObjectId, ref: "Type", required: true },
    dimention: { type: Types.ObjectId, ref: "Dimention", required: true },
    value: { type: Number, default: 3000 }
  },
  {
    versionKey: false,
  }
);

export default model("Burger", burgerSchema, "Burger");
