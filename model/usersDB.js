import { pool } from '../config/config.js'

const getUsersDB = async () => {
  try {
    let [data] = await pool.query(`
      SELECT * FROM users
    `);
    return data;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw new Error(`Failed to retrieve users: ${error.message}`);
  }
};

const getUserDB = async (id) => {
  if (!id) {
    throw new Error('User ID is required');
  }
  try {
    const [[data]] = await pool.query(`
      SELECT * FROM users
      WHERE userID = ?
    `, [id]);
    if (!data) {
      throw new Error(`User with ID ${id} not found`);
    }
    return data;
  } catch (error) {
    console.error('Error retrieving user:', error);
    throw new Error(`Failed to retrieve user with ID ${id}: ${error.message}`);
  }
};

const addUserDB = async (firstName, email, password) => {
  if (!firstName ||!email || !password) {
    throw new Error('All user fields are required');
  }
  try {
    await pool.query(`
      INSERT INTO users (firstName, email, password)
      VALUES (?, ?, ?)
      `, [firstName, email, password]);
  } catch (error) {
    console.error('Error adding user:', error);
    throw new Error(`Failed to add user: ${error.message}`);
  }
};

const deleteUserDB = async (id) => {
  if (!id) {
    throw new Error('User ID is required');
  }
  try {
    await pool.query(`
      DELETE FROM users
      WHERE userID = ?
      `, [id]);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error(`Failed to delete user with ID ${id}: ${error.message}`);
  }
};

const updateUserDB = async (firstName, lastName, age, gender, country, userRole, email, password, userProfile, id) => {
  if (!id) {
    throw new Error('User ID is required');
  }
  if (!firstName || !lastName || !age || !gender || !country || !userRole || !email || !password) {
    throw new Error('All user fields are required');
  }
  try {
    await pool.query(`
      UPDATE users
      SET firstName = ?,
      lastName = ?,
      age = ?,
      gender = ?,
      country = ?,
      userRole = ?,
      email = ?,
      password = ?,
      userProfile = ?
      WHERE userID = ?
      `, [firstName, lastName, age, gender, country, userRole, email, password, userProfile || 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=', id]);
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error(`Failed to update user with ID ${id}: ${error.message}`);
  }
};

const loginUserDB = async (email) => {
  if (!email) {
    throw new Error('Email is required');
  }
  try {
    const [[data]] = await pool.query(`
      SELECT * FROM users
      WHERE email = ?
      `, [email]);
    if (!data) {
      throw new Error(`User with email ${email} not found`);
    }
    return data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw new Error(`Failed to log in user with email ${email}: ${error.message}`);
  }
};

export { getUsersDB, getUserDB, addUserDB, deleteUserDB, updateUserDB, loginUserDB }
