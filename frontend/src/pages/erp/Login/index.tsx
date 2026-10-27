import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import './styles.css'
import { useAuth } from "../../../hooks/useAuth";
import { loginSchema, type LoginFormData } from "../../../schemas/login.schema";


export default function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    async function onSubmit(data: LoginFormData) {
        try {
            const user = await login(data)

            if (user?.role === "ADMIN" || user?.role === "MANAGER") {
                navigate('/erp/dashboard')
            } else {
                navigate('/')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Inventory System</h1>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-group">
                        <label>E-mail</label>
                        <input
                            type="text"
                            placeholder="seu@email.com"
                            {...register("email")}
                        />

                        {errors.email && (
                            <p className="error">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Senha</label>
                        <input
                            type="password"
                            placeholder="******"
                            {...register("password")}
                        />

                        {errors.password && (
                            <p className="error">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <button type="submit">
                        Entrar
                    </button>

                </form>
            </div>
        </div>
    )
}