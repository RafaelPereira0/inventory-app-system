import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../generated/prisma/enums";

export const roleMiddeware = (...allowedRoles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const hasPermition = allowedRoles.includes(req.user!.role as UserRole)

        if(!hasPermition){
            return res.status(403).json({error: "Acesso Negado!"})
        }

        return next()
    }
}