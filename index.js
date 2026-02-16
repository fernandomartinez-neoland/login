// importaciones
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// configuracion de la app
dotenv.config()

const tokenKey = process.env.tokenKey
const api = express();

api.use(express.json());
api.use(cors());
const PORT = 3000;


// apis
api.get('/', (req, res) => {
    res.send("holi")

})

api.post('/token', async (peticion, respuesta) => {
    try {
        // const salt = bcrypt.genSalt(10);
        const email = peticion.body.email;
        let pass = peticion.body.password.toString();

       const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(pass, salt)
        // pass = hashedpass;
        const token = jwt.sign({ email, hash }, tokenKey)
        respuesta.status(200).json({
            success: true,
            message: "Login",
            token
        })
    } catch (e) {
        respuesta.status(400).send(e.message)
    }
})

api.post('/login', (req, res)=>{

    const password=req.body.password.toString();
    const hash="$2b$10$jIvTFTjdjEZOrqPFYvvuCudY7RHI9AHbQmPdQWP5A3VR.CtSmgEQ."
    const passOK=bcrypt.compareSync(password,hash)
    res.send(passOK)
})

api.post('/validatetoken', (req, res) => {
    const token = req.body.token;
    const validated = jwt.verify(token, tokenKey)
    res.status(200).send(validated)
})

api.listen(PORT, () => {
    console.log(`conectado a la url http://localhost:${PORT}`)
})