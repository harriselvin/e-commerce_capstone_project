import { getUsersDB, getUserDB } from '../model/usersDB.js'

const fetchUsers = async (req, res) => {
  res.json(await getUsersDB())
}

const fetchUser = async (req, res) => {
  res.json(await getUserDB(req.params.id))
}

export { fetchUsers, fetchUser }
