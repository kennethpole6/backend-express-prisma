import * as UsersController from "../controller/users"
import express from "express"

const router = express.Router()

router.get("/", UsersController.getUsers)
router.get("/:id", UsersController.getUsersId)
router.post("/", UsersController.createUsers)
router.put("/:id", UsersController.updateUsers)
router.delete("/:id", UsersController.deleteUsers)

export default router
