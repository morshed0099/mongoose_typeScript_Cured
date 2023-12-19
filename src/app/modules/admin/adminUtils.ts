import { User } from '../user/user.model'

const findId = async () => {
  const userId = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()

  return userId?.id || undefined
}
// A-0000
export  const genarateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
}
