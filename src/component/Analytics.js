import {

  PieChart,

  Pie,

  Cell,

  BarChart,

  Bar,

  XAxis,

  YAxis,

  Tooltip,

  ResponsiveContainer

} from "recharts";

import "../css/analytics.css";

function Analytics({ transactions }) {

  const totalIncome = transactions
    .filter((item) => item.type === "Income")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const totalExpense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const pieData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense }
  ];

  const COLORS = ["#16a34a", "#dc2626"];

  const categoryMap = {};

  transactions

    .filter((item) => item.type === "Expense")

    .forEach((item) => {

      categoryMap[item.category] =

        (categoryMap[item.category] || 0) + Number(item.amount);

    });

  const barData = Object.keys(categoryMap).map((key) => ({

    category: key,

    amount: categoryMap[key]

  }));

  return (

    <div className="analytics-container">

      <h1>Analytics</h1>

      <div className="charts">

        <div className="chart-card">

          <h2>Income vs Expense</h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie

                data={pieData}

                cx="50%"

                cy="50%"

                outerRadius={100}

                dataKey="value"

                label

              >

                {pieData.map((entry, index) => (

                  <Cell

                    key={index}

                    fill={COLORS[index % COLORS.length]}

                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="chart-card">

          <h2>Expense by Category</h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={barData}>

              <XAxis dataKey="category" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="amount" fill="#2563eb" />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );

}

export default Analytics;
