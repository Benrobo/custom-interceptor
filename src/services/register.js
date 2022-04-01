import DB from "../db/conn";
import {genSaltSync, hashSync } from "bcryptjs";
import { randomUUID } from "crypto"
import { refreshToken, accessToken } from "../helpers";


function genHash(text) {
    const salt = genSaltSync(10)
    return hashSync(text, salt)
}

export default async function registerUser(res, payload) {
    if (Object.entries(payload).length > 0) {

        try {
            const { name, email, password } = payload;

            // check if user exists
            let q1 = `SELECT * FROM users WHERE email=$1`
            let qval = [email];
            const result1 = await DB.query(q1, qval);

            if (result1.rowCount > 0) {
                return res.status(400).json({ error: true, message: "User with that email already exists" })
            }


            const hash = genHash(password)
            const id = randomUUID()
            const reftoken = refreshToken({ id })
            const q2 = `INSERT INTO users(id,name, email, hash, "refreshToken") VALUES($1,$2,$3,$4,$5)`
            const q2val = [id, name, email, hash, reftoken]
            await DB.query(q2, q2val);

            const sendData = {
                error: false,
                message: "user registered sucessfull"
            }

            res.status(200).json(sendData)
        } catch (err) {
            // console.log(err);
            return res.status(500).json({ error: true, message: err.message })
        }
    }
}

