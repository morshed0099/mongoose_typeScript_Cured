import { Schema, model } from 'mongoose'
import { Tuser } from './user.interface'

const userSchema = new Schema<Tuser>(
  {
    id: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    role: { type: String, enum: ['admin', 'student', 'faculty'] },
    status: { type: String, enum: ['in-progress', 'blocked'] },
  },
  {
    timestamps: true,
  },
)

export const User = model<Tuser>('User', userSchema)
