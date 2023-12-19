/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryBuilder } from '../../queryBuilder/queryBuilder'
import { TCourseFaculty, Tcourse } from './course.interface'
import { Cours, CourseFaculty } from './course.model'

const createCouse = async (payload: Tcourse) => {
  const result = await Cours.create(payload)
  return result
}
const getAllCourse = async (query: Record<string, unknown>) => {
  const serchAbleFelid = ['title', 'prefix', 'code']
  const result = new QueryBuilder(
    Cours.find().populate('peRequistieCourse.course'),
    query,
  )
    .serchQuery(serchAbleFelid)
    .filterQuery()
    .sort()
    .paginate()
    .feild()
  const course = await result.queryMethod
  return course
}
const getSingleCouse = async (id: string) => {
  const result = await Cours.findById(id).populate('peRequistieCourse.course')
  return result
}

const updatedCouse = async (id: string, payload: Partial<Tcourse>) => {
  const { peRequistieCourse, ...restData } = payload
  const besicUpdate = await Cours.findByIdAndUpdate(id, restData, {
    new: true,
    runValidators: true,
  })

  if (peRequistieCourse && peRequistieCourse.length > 0) {
    const deletedCourse = peRequistieCourse
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course)

    const removePerequitsiteCourse = await Cours.findByIdAndUpdate(
      id,
      {
        $pull: { peRequistieCourse: { course: { $in: deletedCourse } } },
      },
      { new: true },
    )
    const addPeRequsite = peRequistieCourse.filter(
      (ele) => ele.course && !ele.isDeleted,
    )
    if (addPeRequsite) {
      const newPerequisiteCouse = await Cours.findByIdAndUpdate(id, {
        $addToSet: { peRequistieCourse: { $each: addPeRequsite } },
      })
    }
  }

  const result = await Cours.findById(id)

  return result
}
const deletedCourse = async (id: string) => {
  const result = await Cours.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}

const createCouseWithFaculty = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  console.log(id)
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      couse: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  )
  return result
}
const deleteCouseWithFaculty = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const facult = payload.faculties
  const result = CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: facult } },
    },
    { new: true },
  )
  return result
}
export const couseService = {
  createCouse,
  getSingleCouse,
  deletedCourse,
  getAllCourse,
  updatedCouse,
  createCouseWithFaculty,
  deleteCouseWithFaculty,
}
