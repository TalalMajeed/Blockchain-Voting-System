import mongoose from "mongoose";

export interface UserDocument {
  email: string;
  phone: string;
  createdAt: Date;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ phone: 1 }, { unique: true });

export const User =
  (mongoose.models.User as mongoose.Model<UserDocument> | undefined) ??
  mongoose.model<UserDocument>("User", userSchema);

