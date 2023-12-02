import express, { Request, Response, NextFunction } from "express"
import "dotenv/config"
import morgan from "morgan"
import createHttpError, { isHttpError } from "http-errors"
import cors from "cors"
import env from "./utils/validateEnv"
import noteRoutes from "./routes/notes"
import userRoutes from "./routes/users"

const app = express()
const port = env.PORT
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("Connected...")
})

app.use("/api/notes", noteRoutes)
app.use("/api/users", userRoutes)

app.listen(port, () => {
    console.log("Server is running on port " + port)
})

//if no routes is defined
app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"))
})

//error handler
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});



export default app

