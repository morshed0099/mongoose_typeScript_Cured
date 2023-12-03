export type Tuser = {
  id: string
  password: string
  needsPasswordChange: boolean
  role: 'admin' | 'student' | 'faculty'
  isDeleted: boolean
  status:"in-porgress"|"blocked"
}

export type NewUser={
  id:string,
  password:string,
  role:string
}