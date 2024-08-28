import { getUsersDB } from '../model/usersDB.js'

const fetchUsers = (req, res) => {
  res.join(await getUsersDB())
}

export { fetchUsers }