import { getUsersDB, getUserDB, addUserDB, deleteUserDB, updateUserDB } from '../model/usersDB.js'
import { hash } from 'bcrypt'

const fetchUsers = async (req, res) => {
  res.json(await getUsersDB())
}

const fetchUser = async (req, res) => {
  res.json(await getUserDB(req.params.id))
}

const addUser = async (req, res) => {
  const { firstName, lastName, age, gender, country, userRole, email, password, userProfile } = req.body

  hash(password, 10, async (err, hashedP) => {
    if (err) throw err

    await addUserDB(firstName, lastName, age, gender, country, userRole, email, hashedP, userProfile)
    res.status(200).send('User was successfully added')
  })
}

const deleteUser = async (req, res) => {
  await deleteUserDB(req.params.id)
  res.status(200).send('User was successfully removed')
}

const updateUser = async (req, res) => {
  let { firstName, lastName, age, gender, country, userRole, email, password, userProfile } = req.body
  let user = await getUserDB(req.params.id)

  firstName ? firstName = firstName : firstName = user.firstName
  lastName ? lastName = lastName : lastName = user.lastName
  age ? age = age : age = user.age
  gender ? gender = gender : gender = user.gender
  country ? country = country : country = user.country
  userRole ? userRole = userRole : userRole = user.userRole
  email ? email = email : email = user.email
  password ? password = password : password = user.password
  userProfile ? userProfile = userProfile : userProfile = user.userProfile

  hash(password, 10, async (err, hashedP) => {
    if (err) throw err

    await updateUserDB(firstName, lastName, age, gender, country, userRole, email, hashedP, userProfile, req.params.id)
    res.status(200).send('User info was successfully updated')
  })
}

const loginUser = async (req, res) => {
  res.json({
    message: 'You have signed in successfully',
    token: req.body.token
  })
}

export { fetchUsers, fetchUser, addUser, deleteUser, updateUser, loginUser }
