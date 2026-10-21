import express from "express"
import bcrypt from "bcryptjs"
import pool from "./db.js"
import cors from "cors"

const PORT = 3000
const app = express()


app.use(express.json())
app.use(cors())



app.post("/register", async (req, res) =>{
    const {email, senha} = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(senha, salt)

    const NovoUsuario = await pool.query("INSERT INTO usuarios (email, senha) VALUES ($1, $2) RETURNING *", [email, hashedPassword])
    res.json(NovoUsuario)
})


app.post("/login", async (req, res) =>{
    const {email, senha} = req.body
    
    const querytext = "SELECT * FROM usuarios WHERE email = $1"
    const result = await pool.query(querytext, [email])
    const user = result.rows[0]
    const isPasswordValid = await bcrypt.compare(senha, user.senha)

    if(!isPasswordValid){
        return res.status(401).json({error : "Credenciais invalidas"})
    }
    res.json("logado com suceso")
})

app.listen(PORT, () =>{
    console.log("Servidor rodando em http://localhost:3000")
})
