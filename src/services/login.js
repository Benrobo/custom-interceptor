import DB from "../db/conn";
import { compareSync} from "bcryptjs";
import { refreshToken, accessToken } from "../helpers";


export default async function loginUser(res, payload) {
    if (Object.entries(payload).length > 0) {

        try {
            const { email, password } = payload;

            // check if user exists
            let q1 = `SELECT * FROM users WHERE email=$1`
            let qval = [email];
            const result1 = await DB.query(q1, qval);

            if (result1.rowCount === 0) {
                return res.status(404).json({ error: true, message: "User with that email doesnt exists" })
            }


            if (!compareSync(password, result1.rows[0].hash)) {
                return res.status(404).json({ error: true, message: "password is incorrect" })
            }
            
            const reftoken = result1.rows[0].refreshToken
            const accToken = accessToken({ id: result1.rows[0].id})

            const sendData = {
                error: false,
                message: "user logged in sucessfull",
                accessToken: accToken,
                refreshToken: reftoken
            }

            res.status(200).json(sendData)
        } catch (err) {
            // console.log(err);
            return res.status(500).json({ error: true, message: err.message })
        }
    }
}

