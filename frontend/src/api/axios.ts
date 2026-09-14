import axios from 'axios'
import { getAccessToken, setAccessToken } from './token'

export const api = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true
})

api.interceptors.request.use((config) => {
    const token = getAccessToken()

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

api.interceptors.response.use(
    response => response,

    async error => {
        const originalRequest = error.config

        if(error.response.status === 401 && !originalRequest._retry && !originalRequest.url?.includes("/login/refresh")){
            originalRequest._retry = true

            try{
                const response = await api.post('/login/refresh')

                const newToken = response.data.accessToken

                setAccessToken(newToken)

                originalRequest.headers.Authorization = `Bearer ${newToken}`

                return api(originalRequest)
            }catch{
                return Promise.reject(error)
            }
            
        }
        return Promise.reject(error)
    }
)