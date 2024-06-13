import mongoose, { Schema } from "mongoose";
import { TUser } from "./user.interface";

// Define the Mongoose schema
const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ["admin", "student", "faculty"],
      required: true,
    },
    status: { type: String, enum: ["in-progress", "blocked"], required: true },
    isDeleted: { type: Boolean, required: true },
  },
  { timestamps: true }
);

// pre save middleware / hooks --> we will create() and save()
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await 
});

// Create the Mongoose model
export const User = mongoose.model<TUser>("User", userSchema);
