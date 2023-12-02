
import jwt from "jsonwebtoken"
import env from "./validateEnv"

export const generateToken = (payload: string) => {
    return jwt.sign(payload, env.TOKEN_SECRET, {
        expiresIn: "12h"
    })
}
