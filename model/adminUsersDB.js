import { pool } from '../config/config.js'

const getAdminUsersDB = async () => {
    try {
      let [data] = await pool.query(`
        SELECT * FROM adminUsers
      `);
      return data;
    } catch (error) {
      console.error('Error retrieving admin users:', error);
      throw new Error(`Failed to retrieve admin users: ${error.message}`);
    }
  };
  
  const getAdminUserDB = async (id) => {
    if (!id) {
      throw new Error('Admin user ID is required');
    }
    try {
      const [[data]] = await pool.query(`
        SELECT * FROM adminUsers
        WHERE userID = ?
      `, [id]);
      if (!data) {
        throw new Error(`Admin user with ID ${id} not found`);
      }
      return data;
    } catch (error) {
      console.error('Error retrieving admin user:', error);
      throw new Error(`Failed to retrieve admin user with ID ${id}: ${error.message}`);
    }
  };
  
  const addAdminUserDB = async (firstName, lastName, age, gender, userRole, email, password, userProfile) => {
    if (!firstName || !lastName ||!age || !gender || !userRole ||!email || !password) {
      throw new Error('All admin user fields are required');
    }
    try {
      await pool.query(`
        INSERT INTO adminUsers (firstName, lastName, age, gender, userRole, email, password, userProfile)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [firstName, lastName, age, gender, userRole, email, password, userProfile || 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=']);
    } catch (error) {
      console.error('Error adding admin user:', error);
      throw new Error(`Failed to add admin user: ${error.message}`);
    }
  };
  
  const deleteAdminUserDB = async (id) => {
    if (!id) {
      throw new Error('Admin user ID is required');
    }
    try {
      await pool.query(`
        DELETE FROM adminUsers
        WHERE userID = ?
        `, [id]);
    } catch (error) {
      console.error('Error deleting admin user:', error);
      throw new Error(`Failed to delete admin user with ID ${id}: ${error.message}`);
    }
  };
  
  const updateAdminUserDB = async (firstName, lastName, age, gender, userRole, email, password, userProfile, id) => {
    if (!id) {
      throw new Error('Admin user ID is required');
    }
    if (!firstName || !lastName || !age || !gender || !userRole || !email || !password || !userProfile) {
      throw new Error('All admin user fields are required');
    }
    try {
      await pool.query(`
        UPDATE users
        SET firstName = ?,
        lastName = ?,
        age = ?,
        gender = ?,
        userRole = ?,
        email = ?,
        password = ?,
        userProfile = ?
        WHERE userID = ?
        `, [firstName, lastName, age, gender, userRole, email, password, userProfile, id]);
    } catch (error) {
      console.error('Error updating admin user:', error);
      throw new Error(`Failed to update admin user with ID ${id}: ${error.message}`);
    }
  };

  const loginAdminUserDB = async (email) => {
    if (!email) {
      throw new Error('Email is required');
    }
    try {
      const [[data]] = await pool.query(`
        SELECT * FROM adminUsers
        WHERE email = ?
        `, [email]);
      if (!data) {
        throw new Error(`Admin user with email ${email} not found`);
      }
      return data;
    } catch (error) {
      console.error('Error logging in admin user:', error);
      throw new Error(`Failed to log in admin user with email ${email}: ${error.message}`);
    }
  };
  
  export { getAdminUsersDB, getAdminUserDB, addAdminUserDB, deleteAdminUserDB, updateAdminUserDB, loginAdminUserDB }
  