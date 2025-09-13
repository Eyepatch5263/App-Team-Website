import mongoose, { Schema } from "mongoose";

const branches = [
  "CSE",
  "ECE",
  "DEC",
  "MECH",
  "CIVIL",
  "EP",
  "CHEMICAL",
  "DCS",
  "ARCHI",
  "MS",
  "MNC",
];

const RegistrationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobileNum: {
      type: String,
      required: true,
      trim: true,
    },
    rollNum: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    branch: {
      type: String,
      enum: branches, 
      required: true,
      trim: true,
    },
    skills: {
      type: String, 
      trim: true,
    },
    whyJoin: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Registration =
  mongoose.models.Registration ||
  mongoose.model("Registration", RegistrationSchema);

export default Registration;
