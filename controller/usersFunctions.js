import { getUsersDB, getUserDB, addUserDB, deleteUserDB, updateUserDB } from '../model/usersDB.js'
import { hash } from 'bcrypt'

const fetchUsers = async (req, res) => {
  try {
    const users = await getUsersDB();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Failed to fetch users');
  }
};

const fetchUser = async (req, res) => {
  try {
    const user = await getUserDB(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Failed to fetch user');
  }
};

const addUser = async (req, res) => {
  try {
    const { firstName, lastName, age, gender, country, userRole, email, password, userProfile } = req.body;
    if (!firstName || !lastName || !age || !gender || !country || !userRole || !email || !password || !userProfile) {
      res.status(400).send('All user fields are required');
    } else {
      hash(password, 10, async (err, hashedP) => {
        if (err) {
          console.error('Error hashing password:', err);
          res.status(500).send('Failed to add user');
        } else {
          await addUserDB(firstName, lastName, age, gender, country, userRole, email, hashedP, userProfile);
          res.status(201).send('User was successfully added');
        }
      });
    }
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send('Failed to add user');
  }
};

const deleteUser = async (req, res) => {
  try {
    await deleteUserDB(req.params.id);
    res.status(200).send('User was successfully removed');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Failed to delete user');
  }
};

const updateUser = async (req, res) => {
  try {
    let { firstName, lastName, age, gender, country, userRole, email, password, userProfile } = req.body;
    let user = await getUserDB(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      firstName ? firstName = firstName : firstName = user.firstName;
      lastName ? lastName = lastName : lastName = user.lastName;
      age ? age = age : age = user.age;
      gender ? gender = gender : gender = user.gender;
      country ? country = country : country = user.country;
      userRole ? userRole = userRole : userRole = user.userRole;
      email ? email = email : email = user.email;
      password ? password = password : password = user.password;
      userProfile ? userProfile = userProfile : userProfile = user.userProfile;

      hash(password, 10, async (err, hashedP) => {
        if (err) {
          console.error('Error hashing password:', err);
          res.status(500).send('Failed to update user');
        } else {
          await updateUserDB(firstName, lastName, age, gender, country, userRole, email, hashedP, userProfile, req.params.id);
          res.status(200).send('User info was successfully updated');
        }
      });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Failed to update user');
  }
};

const loginUser = async (req, res) => {
  try {
    res.json({
      message: 'You have signed in successfully',
      token: req.body.token
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send('Failed to log in user');
  }
};

export { fetchUsers, fetchUser, addUser, deleteUser, updateUser, loginUser }
