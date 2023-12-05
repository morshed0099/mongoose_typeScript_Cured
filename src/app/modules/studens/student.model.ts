import { Document, Query, Schema, model } from 'mongoose'
import validator from 'validator'

import {
  Gurdian,
  Student,
  LocalGurdian,
  StudernetMethod,
  TUser,
} from './students.interface'

const userSchema = new Schema<TUser>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required'],
    maxlength: [20, 'firsname length is not more 20 carecter'],
    validate: {
      validator: function (value: string) {
        const firstName = value.charAt(0).toLocaleUpperCase() + value.slice(1)
        return firstName === value
      },
      message: `{VALUE} must be capitazied `,
    },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: `{VALUE} is not valid, only a-z !!`,
    },
  },
})

const localGuardianSchema = new Schema<LocalGurdian>({
  name: {
    type: String,
    required: [true, 'Name is required for the local guardian'],
  },
  occupation: {
    type: String,
    required: [true, 'Occupation is required for the local guardian'],
  },
  address: {
    type: String,
    required: [true, 'Address is required for the local guardian'],
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required for the local guardian'],
  },
})

const guardianSchema = new Schema<Gurdian>({
  fatherName: { type: String, required: [true, 'Father name is required'] },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact number is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother contact number is required'],
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father occupation is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
  },
  motherName: { type: String, required: [true, 'Mother name is required'] },
})

const studentSchema = new Schema<Student, StudernetMethod>({
  id: { type: String, unique: true },
  name: {
    type: userSchema,
    required: [true, 'Student name is required'],
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'user id must be required'],
    unique: true,
    ref: 'User',
  },
  gender: {
    type: String,
    enum: {
      values: ['Female', 'Male'],
      message: '{VALUE} is not a valid gender',
    },
    required: [true, 'Gender is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: `{VALUE} is not email format!!`,
    },
  },
  dateOfBirth: { type: String },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
    required: [true, 'Blood group is required'],
  },
  contactNo: { type: String, required: [true, 'Contact number is required'] },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required'],
  },
  admissonSemister: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSmister',
    required: true,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
  },
  profileImage: { type: String },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian information is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian information is required'],
  },
  isDeleted: { type: Boolean, default: false },
})

// studentSchema.pre(
//   /^find/,
//   async function (this: Query<Student, Document>, next) {
//     this.findOne({ isDeleted: { $eq: true } })
//     next()
//   },
// )

studentSchema.pre(/^find/, async function (this: Query<Student, Document>, next) {
  this.find({ isDeleted: { $eq: false } });
  next();
});

studentSchema.statics.isStudentExsits = async function (id: string) {
  const isExists = await StudentModel.findOne({ id })
  return isExists
}

export const StudentModel = model<Student, StudernetMethod>(
  'Student',
  studentSchema,
)
