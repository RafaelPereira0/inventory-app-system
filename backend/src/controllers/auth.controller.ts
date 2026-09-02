import { Request, Response } from 'express'
import authService from '../services/auth.service'

class AuthController {

    async login(req: Request, res: Response) {
        try {
            const user = await authService.login(req.body)

            res.cookie('refreshToken', user.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            return res.status(200).json({message: "Login efetuado com sucesso", accessToken: user.accessToken, user: user.user})
        } catch (err: any) {
            return res.status(401).json({ error: err.message })
        }
    }

    async refresh(req: Request, res: Response){
        try{    
            const refreshToken = req.cookies.refreshToken

            if(!refreshToken){
                return res.status(401).json({message: "Sessão expirada"})
            }

            const user = await authService.refresh(refreshToken)

            return res.status(200).json({accessToken: user.newAccessToken, user: user.user})
        }catch(err: any){
            return res.status(401).json({error: err.message})
        }
    }
}

export default new AuthController()