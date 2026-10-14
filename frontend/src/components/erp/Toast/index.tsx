import "./styles.css"

interface ToastProps {
    message: string
    type: "success" | "error" | "warning"
}

export default function Toast({
    message,
    type
}: ToastProps) {

    return (
        <div className={`toast toast-${type}`}>
            <span className="toast-icon">
                {type === "success" && "✓"}
                {type === "error" && "!"}
                {type === "warning" && "⚠"}
            </span>

            <span>{message}</span>
        </div>
    )
}