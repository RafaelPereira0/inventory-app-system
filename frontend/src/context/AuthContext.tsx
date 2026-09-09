import { createContext, useEffect, useState } from "react";
import type { User, AuthContextData } from "../types/auth";
import type { Login } from "../types/login";
import { setAccessToken } from "../api/token";
import { authLogin } from "../api/auth.api";
import { api } from "../api/axios";


export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const isAuthenticated = !!token

    const login = async (credentials: Login) => {
        const response = await authLogin(credentials)

        const { accessToken, user } = response

        setUser(user)
        setToken(accessToken)
        setAccessToken(accessToken)
    }

    const logout = async () => {
        await api.post("/login/logout")

        setUser(null)
        setToken(null)
        setAccessToken(null)
    }

    async function restore() {
        try {
            const response = await api.post('login/refresh')

            const { accessToken, user } = response.data

            setToken(accessToken)
            setAccessToken(accessToken)
            setUser(user)
        } catch {

            setUser(null)
            setToken(null)
            setAccessToken(null)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        restore()
    })

    return(
        <AuthContext.Provider
            value = {{
                user,
                token,
                loading,
                isAuthenticated,
                login,
                logout
            }}>
        </AuthContext.Provider>
    )
}
