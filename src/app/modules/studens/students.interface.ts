export type Gurdian = {
  fatherName: string
  fatherOcupation: string
  fatherContactNo: string
  motherName: string
  motherContactNo: string
  motherOcupation: string
}
export type User = {
  firstName: string
  middleName: string
  lastName: string
}
export type LocalGurdian = {
  name: string
  ocupation: string
  constactNo: string
  address: string
}
export type Student = {
  id: string
  genger: 'Male' | 'Female'
  dateOfBirth: string
  name: User
  email: string
  avatar?: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup: 'A+' | 'A-' | 'AB+' | 'AB-' | 'B+' | 'B-' | 'O+' | 'O-'
  presenAddress: string
  permanetArress: string
  gurdian: Gurdian
  localGurdian: LocalGurdian
  profileImage: string
  isActive: 'active' | 'block'
}
