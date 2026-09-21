import {
    createContext,
    useCallback,
    useState
} from "react"

import Toast from "../components/Toast"

interface ToastData {
    id: number
    message: string
    type: "success" | "error" | "warning"
}

interface ToastContextData {
    showToast: (
        message: string,
        type?: ToastData["type"]
    ) => void
}

export const ToastContext =
    createContext({} as ToastContextData)

export function ToastProvider({
    children
}: {
    children: React.ReactNode
}) {

    const [toasts, setToasts] = useState<ToastData[]>([])

    const showToast = useCallback(
        (
            message: string,
            type: ToastData["type"] = "success"
        ) => {

            const id = Date.now()

            setToasts((prev) => [
                ...prev,
                {
                    id,
                    message,
                    type
                }
            ])

            setTimeout(() => {
                setToasts((prev) =>
                    prev.filter(
                        (toast) => toast.id !== id
                    )
                )
            }, 3000)
        },
        []
    )

    return (
        <ToastContext.Provider value={{ showToast }}>

            {children}

            <div className="toast-container">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                    />
                ))}
            </div>

        </ToastContext.Provider>
    )
}