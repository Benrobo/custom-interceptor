import { Pool } from "pg"
import { DB_NAME, DB_HOST, DB_PWD, DB_USER } from "../config/config"

const DB = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PWD,
})

export default DB