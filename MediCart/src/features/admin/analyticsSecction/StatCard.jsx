
// src/components/StatCard.jsx
export default function StatCard({ label, value, trend, period, icon, color }) {
  const isPositive = (trend ?? 0) >= 0
  const trendColor = isPositive ? "text-emerald-600" : "text-rose-600"
  const trendArrow = isPositive ? "arrow_upward" : "arrow_downward"
  const formatted =
    typeof value === "number" ? value.toLocaleString() : value

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex items-start gap-4">
      <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${color}`}>
        <span className="material-icons">{icon}</span>
      </div>
      <div className="flex-1">
        <div className="text-sm text-slate-1200">{label}</div>
        <div className="text-2xl font-semibold text-slate-900">{formatted}</div>
        <div className="flex items-center gap-2 mt-1">
          <span className={`material-icons text-sm ${trendColor}`}>{trendArrow}</span>
          <span className={`text-sm ${trendColor}`}>{Math.abs(trend).toFixed(2)}%</span>
          <span className="text-sm text-slate-400">({period})</span>
        </div>
      </div>
    </div>
  )
}
``
