import * as LoginController from "../controller/login"
import express from "express"

const router = express.Router()

router.post("/", LoginController.login)

export default router
