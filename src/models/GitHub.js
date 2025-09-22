import mongoose, { Schema } from "mongoose";

const branches = [
  "CSE",
  "ECE",
  "DEC",
  "MECH",
  "CIVIL",
  "EE",
  "EP",
  "CHEMICAL",
  "DCS",
  "ARCHI",
  "MS",
  "MNC",
];

const genders = [
    "Male",
    "Female"
];

const GitHubSchema = new Schema(
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
    gender: {
        type: String,
        enum: genders,
        required: true,
    },
  },
  { timestamps: true }
);

const GitRegistration =
  mongoose.models.GitRegistration ||
  mongoose.model("GitRegistration", GitHubSchema);

export default GitRegistration;
