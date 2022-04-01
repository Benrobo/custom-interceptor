import jwt, { verify } from "jsonwebtoken"
import { ACCESS_SECRET, REFRESH_SECRET } from "../config/config"

export function checkAuth(req, res, next) {
    let token = req.headers["authorization"]
    if (!token || token === undefined) {
        return res.status(401).json({ message: "Authorization is required" })
    }

    try {
        let bearer = token.split(" ")[1]
        if (bearer === "") {
            res.status(401).json({ message: "Authorization is required" })
        }

        // verify token
        const verify = jwt.verify(bearer, "dsvcdsf43t5e3gfwer3rt435")

        res.json(verify)

        console.log(verify);

        let decoded = jwt.decode(bearer)
        // if (decoded) {
            
        // }
        console.log(bearer);
    } catch (err) {
        return res.status(401).json({ message: "Authorization is invalid" })
    }
}
