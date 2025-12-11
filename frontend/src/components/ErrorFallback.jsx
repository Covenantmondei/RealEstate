import { Link } from "react-router-dom"

const ErrorFallback = ({ error, title = "Something went wrong", action = "Go Back" }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4 text-center">
      <div className="text-5xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-slate-600 mb-6 max-w-md">{error || "An unexpected error occurred. Please try again later."}</p>
      <Link to="/" className="btn-primary">
        {action}
      </Link>
    </div>
  )
}

export default ErrorFallback
