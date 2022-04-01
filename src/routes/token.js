import { Router } from "express";

const route = Router()

export const newToken = route.post("/refresh", async (req, res) => {
    const data = req.body;

    if (Object.entries(data).length === 0) {
        return res.status(400).json({ error: true, message: "Payload is required but got none" })
    }

    // await newToken(res, data)
})




