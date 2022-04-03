import { Router } from "express";
import { fetchUser } from "../services/fetchUser";
import loginUser from "../services/login";
import registerUser from "../services/register";

const route = Router()

export const getUser = route.post("/user/get", async (req, res) => {
    const data = req.body;

    if (Object.entries(data).length === 0) {
        return res.status(400).json({ error: true, message: "Payload is required but got none" })
    }

    await fetchUser(res, data)
})


export const register = route.post("/auth/register", async (req, res) => {
    const data = req.body;

    if (Object.entries(data).length === 0) {
        return res.status(400).json({ error: true, message: "Payload is required but got none" })
    }

    await registerUser(res, data)
})

export const login = route.post("/auth/login", async (req, res) => {
    const data = req.body;

    if (Object.entries(data).length === 0) {
        return res.status(400).json({ error: true, message: "Payload is required but got none" })
    }

    await loginUser(res, data)
})




