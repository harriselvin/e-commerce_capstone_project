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


export { getUsersDB }