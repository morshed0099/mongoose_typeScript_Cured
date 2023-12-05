/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export type Gurdian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherContactNo: string
  motherOccupation: string
}
export type TUser = {
  firstName: string
  middleName: string
  lastName: string
}
export type LocalGurdian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}
export type Student = {
  id: string
  user: Types.ObjectId
  gender: 'Male' | 'Female'
  dateOfBirth: string
  name: TUser
  email: string
  avatar?: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup: 'A+' | 'A-' | 'AB+' | 'AB-' | 'B+' | 'B-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian: Gurdian
  localGuardian: LocalGurdian
  profileImage: string
  admissonSemister: Types.ObjectId
  academicDepartment: Types.ObjectId
  isDeleted:boolean
  
}

export interface StudernetMethod extends Model<Student> {
  isStudentExsits(id: string): Promise<Student | null>
}
