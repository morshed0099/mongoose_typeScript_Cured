import config from '../../config'
import { StudentModel } from '../studens/student.model'
import { Student } from '../studens/students.interface'
import { Tuser } from './user.interface'
import { User } from './user.model'

const createStudentIntoDD = async (student: Student, password: string) => {
  //   if (await StudentModel.isStudentExsits(student.id)) {
  //     throw new Error('student alredy exists !!')
  //   }

  // const user: NewUser = {}
  const user: Partial<Tuser> = {}

  user.password = password || config.password
  user.id = '20300100002'
  user.role = 'student'

  const newUser = await User.create(user)
  if (Object.keys(newUser).length) {
    student.id = newUser.id
    student.user = newUser._id
    const newStudent = await StudentModel.create(student)
    return newStudent
  }
}

export const userCrontorler = {
  createStudentIntoDD,
}
