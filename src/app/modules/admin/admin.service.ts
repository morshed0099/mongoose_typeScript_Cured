/* eslint-disable prefer-const */
import httpStatus from 'http-status'
import AppError from '../../util/sendErrorwithCode'
import { Tuser } from '../user/user.interface'
import { User } from '../user/user.model'
import { Tadmin } from './admin.interface'
import { genarateAdminId } from './adminUtils'
import { Admin } from './admin.module'

const createAminIntoDB = async (payload: Tadmin) => {
  let user: Partial<Tuser> = {}
  user.password = 'sdfskajlkjlasdf' || payload.password
  user.role = 'admin'
  user.id = await genarateAdminId()

  const newAdmin = await User.create(user)
  if (!newAdmin) {
    throw new AppError(httpStatus.BAD_REQUEST, 'user not created')
  }
  payload.id = newAdmin.id
  payload.user = newAdmin._id
  payload.role = 'admin'

  const admin = await Admin.create(payload)
  return admin
}

const getAdminById = async (id: string) => {
  const result = await Admin.findById(id)
  return result
}
const updateAdmin = async (id: string, payload: Partial<Tadmin>) => {
  const { name, ...restData } = payload
  const updateData: Record<string, unknown> = {
    ...restData,
  }
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      updateData[`name.${key}`] = value
    }
  }
  const result = await Admin.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })

  return result
}
const delteAdmin=async(id:string)=>{
  const result= await Admin.findByIdAndUpdate(id,{isDeleted:true},{new:true, runValidators:true})
  return result
}
export const adminService = {
  createAminIntoDB,
  getAdminById,
  updateAdmin,
  delteAdmin
}
