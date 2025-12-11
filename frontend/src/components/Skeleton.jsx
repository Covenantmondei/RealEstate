const Skeleton = ({ className = "" }) => {
  return <div className={`skeleton ${className}`}></div>
}

export const PropertyCardSkeleton = () => (
  <div className="card animate-pulse">
    <Skeleton className="h-48 rounded-lg mb-4 w-full" />
    <Skeleton className="h-6 w-3/4 mb-2" />
    <Skeleton className="h-4 w-full mb-3" />
    <div className="flex gap-4 mb-4">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-16" />
    </div>
    <Skeleton className="h-10 w-full" />
  </div>
)

export default Skeleton
