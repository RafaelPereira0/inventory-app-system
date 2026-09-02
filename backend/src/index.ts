import 'dotenv/config'
import app from './app'
import { connectRedis } from './config/redis'


connectRedis()
app.listen(3001, () => {
    console.log("rodando porta 3001")
})