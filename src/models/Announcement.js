import mongoose, { Schema } from "mongoose";

const annSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now, 
      required: true,
    },
    isActive: {
      type: String,
      enum: ["Active", "Inactive"], 
      default: "Active",
    },
  },
  { timestamps: true }
);

const Announcement =
  mongoose.models.Announcement ||
  mongoose.model("Announcement", annSchema);

export default Announcement;
