import mongoose from "mongoose";

const { Schema } = mongoose;

const problemSchema = new Schema(
  {
    numerador1: {
      type: Number,
      required: true,
    },
    denominador1: {
      type: Number,
      required: true,
    },
    numerador2: {
      type: Number,
      required: true,
    },
    denominador2: {
      type: Number,
      required: true,
    },
    operacion: {
      type: String,
      required: true,
    },
    resNumerador: {
      type: Number,
      required: true,
    },
    resDenominador: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.ProblemsEs || mongoose.model("ProblemsEs", problemSchema);
