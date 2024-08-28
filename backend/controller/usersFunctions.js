import { getUsersDB } from '../model/usersDB.js'

const fetchUsers = async (req, res) => {
  res.join(await getUsersDB())
}

export { fetchUsers }