import { UserRole } from "../../generated/prisma/enums"

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number
                role: UserRole
            }
        }
    }
}

export {}