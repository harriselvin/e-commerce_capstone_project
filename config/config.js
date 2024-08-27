import { createPool } from "mysql2/promise";
import { config } from "dotenv";

config()

const pool = createPool({
    host: "",
    database: "",
    user: "",
    password: "",
})

export default pool