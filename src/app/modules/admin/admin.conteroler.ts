import httpStatus from 'http-status'
import { catchAsync } from '../../util/catchAsync'
import { adminService } from './admin.service'

const createAdmin = catchAsync(async (req, res) => {
  const adminData = req.body
  const result = await adminService.createAminIntoDB(adminData)

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'admin created successfully',
    data: result,
  })
})
const getAdminById = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await adminService.getAdminById(id)
  res.status(httpStatus.OK).json({
    success: true,
    message: 'admin retive successfully',
    data: result,
  })
})

const updateAdmin = catchAsync(async (req, res) => {
  const updateData = req.body
  const id = req.params.i
  const result = await adminService.updateAdmin(id, updateData)
  res.status(httpStatus.OK).json({
    success: true,
    message: 'admin updated successfully',
    data: result,
  })
})
const deleteAdmin = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await adminService.delteAdmin(id)
  res.status(httpStatus.OK).json({
    success: true,
    message: 'admin deleted successfully',
    data: result,
  })
})

export const adminControler = {
  createAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
}
