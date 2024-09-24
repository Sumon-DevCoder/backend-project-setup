/* eslint-disable @typescript-eslint/no-this-alias */
import mongoose, { Schema } from "mongoose";
import { TUser } from "./user.interface";
import { USER_Role, USER_STATUS } from "./user.constant";
import bcrypt from "bcrypt";
import config from "../../config";

const UserSchema: Schema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(USER_Role),
      required: [true, "role is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: 0,
    },
    status: {
      type: String,
      enum: Object.values(USER_STATUS), // Using values from USER_STATUS constant
      default: USER_STATUS.ACTIVE, // Assuming 'active' as default status
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// setup password hashing
UserSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password as string,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

UserSchema.post("save", async function (doc, next) {
  doc.password = "";

  next();
});

const User = mongoose.model<TUser>("User", UserSchema);
export default User;
