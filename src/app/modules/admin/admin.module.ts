import { Schema, model } from 'mongoose'
import { TAdminUser, Tadmin } from './admin.interface'

const userSchema = new Schema<TAdminUser>({
  firstName: { type: String, required: true, unique: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  middleName: { type: String, trim: true },
})

const adminSchema = new Schema<Tadmin>(
  {
    id: {
      type: String,
      ref: 'User',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    contacNo: {
      type: String,
      required: true,
    },
    dateOfBirth: { type: String, required: true },
    designation: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    emergencyContactNo: { type: String, required: true },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
    managementDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: userSchema,
    needPasswordChange: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)
// filter out deleted documents
adminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

adminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

adminSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})
export const Admin = model<Tadmin>('Admin', adminSchema)
