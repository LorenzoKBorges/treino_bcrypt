import {Pool} from "pg"

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "senai",
    database: "treino_bcrypt",
    port: 5432
})

export default pool