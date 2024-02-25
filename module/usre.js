import mongoose from "mongoose";
import validator from "validator";
const userschama = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please Enter the Name"],
  },
  email: {
    type: String,
    required: [true, "Enter email"],
  },
  password: {
    type: String,
    required: [true, "Emter you password"],
    select: false,
  },
});

export const User = mongoose.model("User", userschama);
