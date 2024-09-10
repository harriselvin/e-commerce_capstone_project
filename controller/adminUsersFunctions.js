import { getAdminUsersDB, getAdminUserDB, addAdminUserDB, deleteAdminUserDB, updateAdminUserDB } from '../model/adminUsersDB.js'
import { hash } from 'bcrypt'

const fetchAdminUsers = async (req, res) => {
  try {
    const users = await getAdminUsersDB();
    res.json(users);
  } catch (error) {
    console.error('Error fetching admin users:', error);
    res.status(500).send('Failed to fetch admin users');
  }
};

const fetchAdminUser = async (req, res) => {
  try {
    const user = await getAdminUserDB(req.params.id);
    if (!user) {
      res.status(404).send('Admin user not found');
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error('Error fetching admin user:', error);
    res.status(500).send('Failed to fetch admin user');
  }
};

const addAdminUser = async (req, res) => {
  try {
    const { firstName, lastName, age, gender, userRole, email, password, userProfile } = req.body;
    if (!firstName || !lastName || !age || !gender || !userRole || !email || !password || !userProfile) {
      res.status(400).send('All admin user fields are required');
    } else {
      hash(password, 10, async (err, hashedP) => {
        if (err) {
          console.error('Error hashing password:', err);
          res.status(500).send('Failed to add admin user');
        } else {
          await addAdminUserDB(firstName, lastName, age, gender, userRole, email, hashedP, userProfile);
          res.status(201).send('Admin user was successfully added');
        }
      });
    }
  } catch (error) {
    console.error('Error adding admin user:', error);
    res.status(500).send('Failed to add admin user');
  }
};

const deleteAdminUser = async (req, res) => {
  try {
    await deleteAdminUserDB(req.params.id);
    res.status(200).send('Admin user was successfully removed');
  } catch (error) {
    console.error('Error deleting admin user:', error);
    res.status(500).send('Failed to delete admin user');
  }
};

const updateAdminUser = async (req, res) => {
  try {
    let { firstName, lastName, age, gender, userRole, email, password, userProfile } = req.body;
    let adminUser = await getAdminUserDB(req.params.id);
    if (!adminUser) {
      res.status(404).send('User not found');
    } else {
      firstName ? firstName = firstName : firstName = adminUser.firstName;
      lastName ? lastName = lastName : lastName = adminUser.lastName;
      age ? age = age : age = adminUser.age;
      gender ? gender = gender : gender = adminUser.gender;
      userRole ? userRole = userRole : userRole = adminUser.userRole;
      email ? email = email : email = adminUser.email;
      password ? password = password : password = adminUser.password;
      userProfile ? userProfile = userProfile : userProfile = adminUser.userProfile;

      hash(password, 10, async (err, hashedP) => {
        if (err) {
          console.error('Error hashing password:', err);
          res.status(500).send('Failed to update admin user');
        } else {
          await updateAdminUserDB(firstName, lastName, age, gender, userRole, email, hashedP, userProfile, req.params.id);
          res.status(200).send('Admin user info was successfully updated');
        }
      });
    }
  } catch (error) {
    console.error('Error updating admin user:', error);
    res.status(500).send('Failed to update admin user');
  }
};

const loginAdminUser = async (req, res) => {
  try {
    res.json({
      message: 'You have signed in successfully',
      token: req.body.token
    });
  } catch (error) {
    console.error('Error logging in admin user:', error);
    res.status(500).send('Failed to log in admin user');
  }
};

export { fetchAdminUsers, fetchAdminUser, addAdminUser, deleteAdminUser, updateAdminUser, loginAdminUser }
