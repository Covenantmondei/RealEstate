import { Link } from "react-router-dom"

const EmptyState = ({ icon = "📭", title, description, actionText, actionLink }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-slate-600 mb-6 max-w-md">{description}</p>
      {actionLink && actionText && (
        <Link to={actionLink} className="btn-primary">
          {actionText}
        </Link>
      )}
    </div>
  )
}

export default EmptyState
