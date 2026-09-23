export type UserRole =
    | "ADMIN"
    | "MANAGER"
    | "CUSTOMER"


export interface UserType {
    id: number
    name: string
    email: string
    role: UserRole
}

export interface CreateUserType{
    name: string,
    email: string,
    role: UserRole,
    password: string
}

export interface UpdateUserType{
    name?: string,
    email?: string,
    role?: string,
    password?: string
}

export interface UserTypeProps {
    user: UserType
    onView: (user: UserType) => void
}



export interface UserModelProps {
    user?: UserType
    close: () => void
}


export interface UserFormType {
    name: string
    email: string
    password: string
    role: UserRole
}