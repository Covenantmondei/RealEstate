const StatsCard = ({ label, value, icon, trend }) => {
  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-slate-600 text-sm mb-1">{label}</p>
          <h3 className="text-3xl font-bold">{value}</h3>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
      {trend && (
        <p className={`text-sm ${trend > 0 ? "text-green-600" : "text-red-600"}`}>
          {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% from last month
        </p>
      )}
    </div>
  )
}

export default StatsCard
