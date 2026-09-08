import 'dotenv/config'
import app from './app'
import { connectRedis } from './config/redis'


async function start() {
    await connectRedis()
    app.listen(3001, () => {
        console.log("rodando porta 3001")
    })
}

start()