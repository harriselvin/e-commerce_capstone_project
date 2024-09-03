import { pool } from '../config/config.js'

const getUsersDB = async () => {
  try {
    let [data] = await pool.query(`
      SELECT * FROM users
    `);
    return data;
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
};

const getUserDB = async (id) => {
  try {
    let [[data]] = await pool.query(`
      SELECT * FROM users
      WHERE userID = ?
    `, [id]);
    return data;
  } catch (error) {
    console.error('Error retrieving user:', error);
    throw error;
  }
};

const addUserDB = async (firstName, lastName, age, gender, country, userRole, email, password, userProfile) => {
  try {
    await pool.query(`
      INSERT INTO users (firstName, lastName, age, gender, country, userRole, email, password, userProfile)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [firstName, lastName, age, gender, country, userRole, email, password, userProfile]);
    } catch (error) {
      console.error('Error adding user:', error);
      throw error
    }
}

const deleteUserDB = async (id) => {
  try {
    await pool.query(`
      DELETE FROM users
      WHERE userID = ?
      `, [id])
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

const updateUserDB = async (firstName, lastName, age, gender, country, userRole, email, password, userProfile, id) => {
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
      `, [firstName, lastName, age, gender, country, userRole, email, password, userProfile, id])
  } catch (error) {
    console.error('Error updating user:', error);
    throw error
  }
}

const loginUserDB = async (email) => {
  try {
    let [[data]] = await pool.query(`
      SELECT * FROM users
      WHERE email = ?
      `, [email])
    return data
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error
  }
}

export { getUsersDB, getUserDB, addUserDB, deleteUserDB, updateUserDB, loginUserDB }
