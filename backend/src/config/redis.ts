import { createClient } from "redis";

const redis = createClient({
    url: "redis://localhost:6379"
})


redis.on("error", (err) => {
    console.log("redis" + err)
})

export async function connectRedis() {
    await redis.connect()
    console.log("redis conectado")
}

export default redis
