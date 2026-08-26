import cors from 'cors'
import express from 'express'
import userRoutes from './routes/user.route'
import categoryRoutes from './routes/category.route'

const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/user",userRoutes)
app.use("/category",categoryRoutes)


export default app