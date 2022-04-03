import jwt from "jsonwebtoken"
import { ACCESS_SECRET } from "../config/config"
import crypto from "crypto"

export function refreshToken() {
    return crypto.randomBytes(30).toString("hex")
}

export function accessToken(payload) {
    return jwt.sign(payload, ACCESS_SECRET, {
        expiresIn: "10s"
    })
}