
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

import {
  // Wallet,
  // TrendingUp,
  // TrendingDown,
  // PiggyBank,
  ChartPie,
} from "lucide-react";

import "../css/analytics.css";

function Analytics({ transactions = [] }) {
  const totalIncome = transactions
    .filter((item) => item.type === "Income")
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const totalExpense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  // const totalBalance = totalIncome - totalExpense;

  const formatAmount = (amount) =>
    Number(amount).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });

  const pieData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense },
  ];

  const COLORS = ["#16a36a", "#ef4444"];

  const categoryMap = {};

  transactions
    .filter((item) => item.type === "Expense")
    .forEach((item) => {
      const category = item.category || "Other";

      categoryMap[category] =
        (categoryMap[category] || 0) + Number(item.amount || 0);
    });

  const barData = Object.keys(categoryMap)
    .map((key) => ({
      category: key,
      amount: categoryMap[key],
    }))
    .sort((a, b) => b.amount - a.amount);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="analytics-tooltip">
          <p>{label || payload[0].name}</p>
          <strong>
            ₹{formatAmount(payload[0].value)}
          </strong>
        </div>
      );
    }

    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="analytics-tooltip">
          <p>{payload[0].name}</p>
          <strong>₹{formatAmount(payload[0].value)}</strong>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="analytics-container">

      {/* HEADER */}
      <div className="analytics-header">
        <div>
          <p className="analytics-eyebrow">FINANCIAL INSIGHTS</p>
          <h1>Analytics</h1>

        </div>

        <div className="analytics-header-icon">
          <ChartPie size={27} />
        </div>
      </div>


      {/* CHARTS */}
      <div className="charts">

        {/* PIE CHART */}
        <div className="chart-card">

          <div className="chart-heading">
            <div>
              <h2>Income vs Expense</h2>
              <p>Compare your total income and spending</p>
            </div>

            <span className="chart-heading-icon">
              <ChartPie size={20} />
            </span>
          </div>

          {totalIncome === 0 && totalExpense === 0 ? (
            <div className="chart-empty">
              <ChartPie size={38} />
              <h3>No financial data yet</h3>
              <p>Add transactions to view your analytics.</p>
            </div>
          ) : (
            <>
              <div className="pie-chart-area">
                <ResponsiveContainer width="100%" height={290}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={105}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={COLORS[index]}
                        />
                      ))}
                    </Pie>

                    <Tooltip content={<CustomPieTooltip />} />
                    <Legend
                      verticalAlign="bottom"
                      iconType="circle"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="pie-total">
                <span>Total Transactions Value</span>
                <strong>
                  ₹{formatAmount(totalIncome + totalExpense)}
                </strong>
              </div>
            </>
          )}

        </div>

        {/* BAR CHART */}
        <div className="chart-card">

          <div className="chart-heading">
            <div>
              <h2>Expense by Category</h2>
              <p>See where your money is being spent</p>
            </div>

            <span className="chart-heading-icon expense-chart-icon">
              {/* <TrendingDown size={20} /> */}
            </span>
          </div>

          {barData.length === 0 ? (
            <div className="chart-empty">
              {/* <TrendingDown size={38} /> */}
              <h3>No expense data yet</h3>
              <p>Add expense transactions to view categories.</p>
            </div>
          ) : (
            <div className="bar-chart-area">
              <ResponsiveContainer width="100%" height={330}>
                <BarChart
                  data={barData}
                  margin={{
                    top: 15,
                    right: 12,
                    left: 5,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#edf1f7"
                  />

                  <XAxis
                    dataKey="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#8391a5", fontSize: 11 }}
                    interval={0}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#8391a5", fontSize: 11 }}
                    tickFormatter={(value) =>
                      value >= 1000
                        ? `₹${(value / 1000).toFixed(0)}k`
                        : `₹${value}`
                    }
                  />

                  <Tooltip content={<CustomTooltip />} />

                  <Bar
                    dataKey="amount"
                    name="Expense"
                    fill="#3478f6"
                    radius={[8, 8, 0, 0]}
                    maxBarSize={55}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

        </div>

      </div>

      {/* CATEGORY DETAILS */}
      <div className="category-section">

        <div className="category-header">
          <div>
            <h2>Expense Breakdown</h2>
            <p>Detailed view of your spending categories</p>
          </div>

          <span className="category-count">
            {barData.length} Categories
          </span>
        </div>

        {barData.length > 0 ? (
          <div className="category-list">
            {barData.map((item) => {
              const percentage =
                totalExpense > 0
                  ? (item.amount / totalExpense) * 100
                  : 0;

              return (
                <div className="category-item" key={item.category}>

                  <div className="category-info">
                    <strong>{item.category}</strong>
                    <span>₹{formatAmount(item.amount)}</span>
                  </div>

                  <div className="category-progress">
                    <div
                      className="category-progress-fill"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>

                  <span className="category-percentage">
                    {percentage.toFixed(1)}%
                  </span>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="category-empty">
            No expense categories available.
          </div>
        )}

      </div>

    </div>
  );
}

export default Analytics;
