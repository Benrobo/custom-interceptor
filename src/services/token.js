import DB from "../db/conn";
import { accessToken, refreshToken } from "../helpers";

export async function refresh(res, payload) {
    if (Object.entries(payload).length > 0) {
        try {
            const { token } = payload;

            // check if refreshtoken exists
            const checkquery = `SELECT * FROM users WHERE "refreshToken"=$1`
            const checkVal = [token]
            const checkres = await DB.query(checkquery,checkVal);
            
            if (checkres.rowCount === 0) {
                return res.status(403).json({
                    error: true,
                    message: "Invalid refresh token."
                })
            }
            // else go ahead and generate a new one
            const acct = accessToken({ id: checkres.rows[0].id });
            const reftoken = refreshToken();
            // update token in db
            const q3 = `UPDATE users SET "refreshToken"=$1 WHERE email=$2`
            const q3val = [reftoken, checkres.rows[0].email];
            await DB.query(q3, q3val)
            return res.status(200).json({
                error: false,
                message: "token generation successfull",
                accessTokens: acct,
                refreshTokens: reftoken
            })
        } catch (err) {
            return res.status(403).json({
                error: true,
                message: err.message
            })
        }
    }
}


