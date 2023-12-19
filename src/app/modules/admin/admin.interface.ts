import mongoose from 'mongoose'



export type TAdminUser={
    firstName: string
    middleName: string
    lastName: string
}

export type Tadmin = {
  id: string
  user: mongoose.Types.ObjectId
  password: string
  needPasswordChange: boolean
  role: 'admin' | 'student' | 'faculty'
  designation: string
  name: TAdminUser
  dateOfBirth: string
  gender: 'Male' | 'Female'
  email: string
  contacNo: string
  emergencyContactNo: string
  presentAddress: string
  permanentAddress: string
  profileImage: string
  managementDepartment:mongoose.Types.ObjectId
  isDeleted:boolean
}
