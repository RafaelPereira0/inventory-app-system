
import type { Login } from "../types/login";

export interface User {
    id: number;
    name: string;
    email: string;
    role: "MANAGER" | "CUSTOMER" | "ADMIN";
}

export interface AuthContextData {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;

    login(credentials: Login): Promise<void>;
    logout(): void;
}