import mongoose, { Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

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
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_round)
  );
  next();
});

// post save middleware / hooks
userSchema.post("save", async function (doc, next) {
  // console.log(this, "post hook - we save our data");
  doc.password = "";
  next();
});

// query middleware --> using find
userSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// query middleware --> using pipeline
userSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});

// Create the Mongoose model
export const User = mongoose.model<TUser>("User", userSchema);
