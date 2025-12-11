const LoadingSpinner = ({ size = "md", fullScreen = false }) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  }

  const spinner = (
    <div className={`${sizeClasses[size]} border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin`} />
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">{spinner}</div>
    )
  }

  return <div className="flex items-center justify-center">{spinner}</div>
}

export default LoadingSpinner
