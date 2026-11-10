
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Plus,
  ArrowRight,
  ArrowUpRight,
  ArrowDownLeft,
  // CalendarDays,
} from "lucide-react";
import "../css/dashboard.css";

function Dashboard({ transactions = [] }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const totalIncome = transactions
    .filter((item) => item.type === "Income")
    .reduce((total, item) => total + Number(item.amount || 0), 0);

  const totalExpense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((total, item) => total + Number(item.amount || 0), 0);

  const totalBalance = totalIncome - totalExpense;
  const savings = totalBalance;

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const formatAmount = (amount) =>
    Number(amount).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });

  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <p className="welcome-text">FINANCIAL OVERVIEW</p>
          <h1>Dashboard</h1>
          <p className="dashboard-subtitle">
            {/* Track your income, expenses and savings. */}
          </p>
        </div>

        <div className="dashboard-actions">
          <div className="live-clock">
            <span className="clock-dot"></span>
            <div>
              <h3>
                {currentTime.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </h3>
              <p>
                {currentTime.toLocaleDateString("en-IN", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <button
            className="add-transaction-btn"
            onClick={() => navigate("/add")}
          >
            <Plus size={18} />
            Add Transaction
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="cards">

        <div className="card balance">
          <div className="card-top">
            <div className="card-icon">
              <Wallet size={23} />
            </div>
            <span className="card-label">TOTAL BALANCE</span>
          </div>
          <h2>₹{formatAmount(totalBalance)}</h2>
          <p>Your available balance</p>
          <div className="card-decoration">
            <Wallet size={100} />
          </div>
        </div>

        <div className="card income">
          <div className="card-top">
            <div className="card-icon">
              <TrendingUp size={23} />
            </div>
            <span className="card-label">TOTAL INCOME</span>
          </div>
          <h2>₹{formatAmount(totalIncome)}</h2>
          <p>Money received</p>
          <div className="card-decoration">
            <TrendingUp size={100} />
          </div>
        </div>

        <div className="card expense">
          <div className="card-top">
            <div className="card-icon">
              <TrendingDown size={23} />
            </div>
            <span className="card-label">TOTAL EXPENSE</span>
          </div>
          <h2>₹{formatAmount(totalExpense)}</h2>
          <p>Money spent</p>
          <div className="card-decoration">
            <TrendingDown size={100} />
          </div>
        </div>

        <div className="card savings">
          <div className="card-top">
            <div className="card-icon">
              <PiggyBank size={23} />
            </div>
            <span className="card-label">SAVINGS</span>
          </div>
          <h2>₹{formatAmount(savings)}</h2>
          <p>Income minus expenses</p>
          <div className="card-decoration">
            <PiggyBank size={100} />
          </div>
        </div>

      </div>

      {/* RECENT TRANSACTIONS */}
      <div className="recent">

        <div className="recent-header">
          <div>
            <h2>Recent Transactions</h2>
            {/* <p>Monitor your latest financial activities</p> */}
          </div>

          <button
            className="view-all-btn"
            onClick={() => navigate("/transactions")}
          >
            View All
            <ArrowRight size={16} />
          </button>
        </div>

        {/* INCOME / EXPENSE SUMMARY */}
        {/* <div className="transaction-summary">

          <div>
            <span className="summary-dot income-dot"></span>
            <span>Income</span>
            <strong>₹{formatAmount(totalIncome)}</strong>
          </div>

          <div>
            <span className="summary-dot expense-dot"></span>
            <span>Expense</span>
            <strong>₹{formatAmount(totalExpense)}</strong>
          </div>

        </div> */}

        {/* TRANSACTION LIST */}
        <div className="recent-list">

          {recentTransactions.length > 0 ? (
            recentTransactions.map((item) => (
              <div className="recent-item" key={item.id}>

                <div className={`recent-icon ${item.type.toLowerCase()}`}>
                  {item.type === "Income" ? (
                    <ArrowDownLeft size={22} />
                  ) : (
                    <ArrowUpRight size={22} />
                  )}
                </div>

                <div className="recent-info">
                  <h3>{item.title}</h3>
                  <p>
                    {item.type} · {item.date}
                  </p>
                </div>

                <div className="recent-amount">
                  <strong className={item.type.toLowerCase()}>
                    {item.type === "Income" ? "+" : "-"}₹
                    {formatAmount(item.amount)}
                  </strong>

                  <span className={`recent-status ${item.type.toLowerCase()}`}>
                    {item.type}
                  </span>
                </div>

              </div>
            ))
          ) : (
            <div className="recent-empty">
              {/* <div className="empty-icon">
                <CalendarDays size={35} />
              </div> */}

              <h3>No transactions yet</h3>
              {/* <p>
                Start tracking your money by adding your first transaction.
              </p> */}

              <button
                onClick={() => navigate("/add")}
                className="empty-add-btn"
              >
                <Plus size={16} />
                Add Transaction
              </button>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

export default Dashboard;
