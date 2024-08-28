import { pool } from '../config/config.js'

const getUsersDB = async () => {
  let [data] = await pool.query(`
    SELECT * FROM users
    `)
  return data
}

export { getUsersDB }