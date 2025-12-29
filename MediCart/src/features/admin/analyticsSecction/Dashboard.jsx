
// src/pages/Home.jsx
import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
  LineChart, Line, BarChart, Bar, Tooltip, XAxis, YAxis, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts"
import StatCard from "./StatCard"
import analytics from "./analytics.json"; 
const PIE_COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444"]

export default function Dashboard() {
  const navigate = useNavigate()

  const [statRange, setStatRange] = useState("yearly")
  const [salesRange, setSalesRange] = useState("yearly")

  const yearlyStatsData = useMemo(() => {
    if (statRange === "yearly") {
      const src = analytics?.yearly?.lineCharts?.yearlyStats ?? []
      return src.map(d => ({ label: d.month, value: d.avgOrderValue }))
    }
    if (statRange === "monthly") {
      const src = analytics?.monthly?.lineCharts?.engagement ?? []
      return src.map(d => ({ label: d.week, value: d.activeUsers }))
    }

    const src = analytics?.weekly?.lineCharts?.yearlyStats ?? []
    return src.map(d => ({ label: d.day, value: d.value }))
  }, [statRange])

  
  const salesRevenueData = useMemo(() => {
    if (salesRange === "yearly") {
      const src = analytics?.yearly?.barCharts?.salesRevenue ?? []
      return src.map(d => ({ label: d.period, sales: d.totalSales, revenue: d.totalRevenue }))
    }
    if (salesRange === "monthly") {
      const src = analytics?.monthly?.barCharts?.ordersByHour ?? []
      return src.map(d => ({ label: d.hour, sales: d.orders })) 
    }
 
    const src = analytics?.weekly?.barCharts?.salesRevenue ?? []
    return src.map(d => ({ label: d.day, sales: d.sales, revenue: d.revenue }))
  }, [salesRange])

  
  const hasRevenueSeries = useMemo(
    () => salesRevenueData.some(d => typeof d.revenue === "number"),
    [salesRevenueData]
  )

 
  const weeklyPerformanceData = useMemo(
    () => (analytics?.lastWeek?.lineCharts?.salesPerformance ?? [])
      .map(d => ({ day: d.day, revenue: d.revenue })),
    []
  )
  const pieData = analytics?.lastWeek?.pieCharts?.salesByCategory ?? []
 



return (
  <div className="flex min-h-screen bg-gray-50">
    <div className="flex-1 flex flex-col">
      {/* Centered, constrained container on wide screens */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">

        {/* Header */}
        <div className=" flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-sm">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black p-2">Dashboard</h1>
            <p className="text-sm sm:text-red-500 text-slate-700 p-3">Overview of MediCart performance</p>
          </div>
        </div>

        {/* Stat Cards (always 2 per row, aligned heights) */}
        <div className="grid grid-cols-2 gap-6">
          <StatCard
            className="min-h-[120px]"  // 🔧 gives consistent card height
            label="New Orders"
            value={analytics.metrics.newOrders.value}
            trend={analytics.metrics.newOrders.trend}
            period="30 days"
            icon="shopping_bag"
            color="bg-violet-100 text-violet-700"
          />
          <StatCard
            className="min-h-[120px]"
            label="Total Income"
            value={analytics.metrics.totalIncome.value}
            trend={analytics.metrics.totalIncome.trend}
            period="Increased"
            icon="payments"
            color="bg-emerald-100 text-emerald-700"
          />
          <StatCard
            className="min-h-[120px]"
            label="Total Expense"
            value={analytics.metrics.totalExpense.value}
            trend={analytics.metrics.totalExpense.trend}
            period="Expense"
            icon="receipt_long"
            color="bg-rose-100 text-rose-700"
          />
          <StatCard
            className="min-h-[120px]"
            label="New Users"
            value={analytics.metrics.newUsers.value}
            trend={analytics.metrics.newUsers.trend}
            period="Earning"
            icon="person_add"
            color="bg-amber-100 text-amber-700"
          />
        </div>

        {/* Yearly Stats + Sales/Revenue (equal height cards) */}
        <div className="flex flex-wrap gap-2 justify-around ">
          {/* Yearly Stats card */}
          <div className="bg-[#16213E] rounded-2xl shadow-sm p-7 h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Yearly Stats</h2>
              <select
                className="border rounded-lg px-3 py-1.5 text-sm"
                value={statRange}
                onChange={(e) => setStatRange(e.target.value)}
              >
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>

            <div className="text-2x2 font-bold text-white mb-1">
              ₹{analytics.metrics.yearlyRevenue.toLocaleString()}
            </div>

            {/* Normalized chart area */}
            <div className="bg-[#16213E] h-80 w-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={yearlyStatsData}
                  margin={{ top: 10, right: 24, left: 8, bottom: 16 }} // 🔧 consistent margins
                >
                  <XAxis
                    dataKey="label"
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    tickMargin={8} // 🔧 prevents label overlap
                  />
                  <YAxis tick={{ fill: "#64748b", fontSize: 12 }} tickMargin={8} />
                  <Tooltip />
                  <Legend
                    verticalAlign="bottom"
                    height={24}
                    wrapperStyle={{ color: "#334155", fontSize: 12 }}
                  />
                  <Line
                    name="Trend"
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ r: 2 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sales/Revenue card */}
          <div className="bg-[#16213E] rounded-2xl shadow-sm p-7 h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Sales/Revenue</h2>
              <select
                className="border rounded-lg px-3 py-1.5 text-sm"
                value={salesRange}
                onChange={(e) => setSalesRange(e.target.value)}
              >
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            <div className="text-2x2 font-bold text-white mb-1">
              ₹{analytics.metrics.yearlyRevenue.toLocaleString()}
            </div>
            <div className="h-80 w-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesRevenueData}
                  margin={{ top: 10, right: 24, left: 8, bottom: 16 }} // 🔧 consistent margins
                  barSize={20}            // 🔧 consistent bar thickness
                  barCategoryGap="20%"    // 🔧 consistent gap
                >
                  <XAxis
                    dataKey="label"
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    tickMargin={8}
                  />
                  <YAxis tick={{ fill: "#64748b", fontSize: 12 }} tickMargin={8} />
                  <Tooltip />
                  <Legend
                    verticalAlign="bottom"
                    height={24}
                    wrapperStyle={{ color: "#334155", fontSize: 12 }}
                  />
                  <Bar name="Sales" dataKey="sales" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  {hasRevenueSeries && (
                    <Bar name="Revenue" dataKey="revenue" fill="#10b981" radius={[6, 6, 0, 0]} />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Weekly Performance + Sales by Category (equal height) */}
        <div className="flex flex-row flex-wrap gap-2 justify-around  ">
          {/* Weekly Performance */}
          <div className="bg-[#16213E] rounded-2xl shadow-sm p-7 h-full">
            <h2 className="text-lg font-semibold mb-4 text-white">Weekly Sales Performance</h2>
           
            <div className="h-80 w-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weeklyPerformanceData}
                  margin={{ top: 10, right: 24, left: 8, bottom: 16 }} // 🔧 consistent margins
                >
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    tickMargin={8}
                  />
                  <YAxis tick={{ fill: "#64748b", fontSize: 12 }} tickMargin={8} />
                  <Tooltip />
                  <Legend
                    verticalAlign="bottom"
                    height={24}
                    wrapperStyle={{ color: "#334155", fontSize: 12 }}
                  />
                  <Line
                    name="Revenue"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot={{ r: 2 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sales by Category */}
          <div className="bg-[#16213E] rounded-2xl shadow-sm h-full p-4">
            <h2 className="text-lg font-semibold mb-4 text-white p-3">Sales by Category</h2>
            {/* give a tiny bit more height for labels */}
            <div className="h-80 w-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart >
                  <Tooltip />
                  <Legend
                    verticalAlign="bottom"
                    height={24}
                    wrapperStyle={{ color: "#334155", fontSize: 12 }}
                  />
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={85}
                    innerRadius={40}
                    
                    

                    labelLine
                  >
                    {pieData.map((_, idx) => (
                      <Cell key={`cell-${idx}`} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);


}
