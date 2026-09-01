import cors from 'cors'
import express from 'express'
import userRoutes from './routes/user.route'
import categoryRoutes from './routes/category.route'
import productRoutes from './routes/product.route'
import stockMovementRoutes from './routes/stockMovement.route'
import orderRoutes from './routes/order.route'

const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/user",userRoutes)
app.use("/category",categoryRoutes)
app.use("/product", productRoutes)
app.use("/movement", stockMovementRoutes)
app.use('/order', orderRoutes)


export default app