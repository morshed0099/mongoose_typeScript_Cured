import { Schema, model } from 'mongoose'
import {
  Gurdian,
  Student,
  User,
  LocalGurdian,
} from './studens/students.interface'

const userSchema = new Schema<User>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
})

const locahGurdianSchema = new Schema<LocalGurdian>({
  name: { type: String, required: true },
  ocupation: { type: String, required: true },
  address: { type: String, required: true },
  constactNo: { type: String, required: true },
})

const gurdianSchema = new Schema<Gurdian>({
  fatherName: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherContactNo: { type: String, required: true },
  fatherOcupation: { type: String, required: true },
  motherOcupation: { type: String, required: true },
  motherName: { type: String, required: true },
})

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userSchema,
  genger: ['Female', 'Male'],
  email: { type: String, required: true },
  dateOfBirth: { type: String },
  bloodGroup: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  presenAddress: { type: String, required: true },
  permanetArress: { type: String, required: true },
  isActive: ['active', 'blocked'],
  profileImage: { type: String },
  gurdian: gurdianSchema,
  localGurdian: locahGurdianSchema,
})

export const StudentModel = model<Student>('Student', studentSchema)
