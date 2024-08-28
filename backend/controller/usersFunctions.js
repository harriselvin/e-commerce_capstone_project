import { getUsersDB } from '../model/usersDB.js'

const fetchUsers = async (req, res) => {

  res.json(await getUsersDB())
  
  res.join(await getUsersDB())

}

export { fetchUsers }
