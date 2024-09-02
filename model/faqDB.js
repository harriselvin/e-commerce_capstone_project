import { pool } from '../config/config.js'

const getFaqDB = async () => {
  try {
    let [data] = await pool.query(`
    SELECT * FROM FAQ
    `);
    return data;
  } catch (error) {
    console.error('Error retrieving faq:', error);
    throw error;
  }
};

export { getFaqDB }
