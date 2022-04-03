import DB from "../db/conn";


export async function fetchUser(res, payload) {
    const { id } = payload;
    // check if user exists
    let q1 = `SELECT * FROM users WHERE id=$1`
    let qval = [id];
    const result1 = await DB.query(q1, qval);

    if (result1.rowCount === 0) {
        return res.status(404).json({ error: true, message: "User Not found" })
    }

    return res.status(200).json({ error: false, result: result1.rows })
}