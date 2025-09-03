import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,        
    },
    email: {
      type: String,
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      default: "Response pending",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
