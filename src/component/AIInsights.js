
import { useEffect, useState } from "react";
import {
  // Wallet,
  // TrendingUp,
  // TrendingDown,
  // PiggyBank,
  BrainCircuit,
  Sparkles,
  RefreshCw,
  AlertCircle,
  FileText,
} from "lucide-react";

import "../css/allinsights.css";
import { generateReport } from "../api/Groq";
import ReactMarkdown from "react-markdown";

function AIInsights({ transactions = [] }) {
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!transactions.length) {
      setReport("");
      setError("");
      return;
    }

    let cancelled = false;

    const runAI = async () => {
      try {
        setLoading(true);
        setError("");

        const aiText = await generateReport(transactions);

        if (!cancelled) {
          setReport(aiText);
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err.response?.data?.error?.message || err.message;

          setError(message || "Unable to generate AI report.");
          setReport("");
          console.error("Groq AI Error:", err.response?.data || err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    runAI();

    return () => {
      cancelled = true;
    };
  }, [transactions]);

  // const totalIncome = transactions
  //   .filter((item) => item.type === "Income")
  //   .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  // const totalExpense = transactions
  //   .filter((item) => item.type === "Expense")
  //   .reduce((sum, item) => sum + Number(item.amount || 0), 0);

  // const savings = totalIncome - totalExpense;

  // const formatAmount = (amount) =>
  //   Number(amount).toLocaleString("en-IN", {
  //     maximumFractionDigits: 2,
  //   });

  const handleRefresh = async () => {
    if (!transactions.length || loading) return;

    try {
      setLoading(true);
      setError("");

      const aiText = await generateReport(transactions);
      setReport(aiText);
    } catch (err) {
      const message =
        err.response?.data?.error?.message || err.message;

      setError(message || "Unable to generate AI report.");
      setReport("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-container">

      {/* HEADER */}
      <div className="ai-header">
        <div>
          <p className="ai-eyebrow">SMART FINANCIAL ASSISTANT</p>
          <h1>AI Financial Insights</h1>
          {/* <p className="ai-subtitle">
            Understand your spending habits with intelligent AI analysis.
          </p> */}
        </div>

        <div className="ai-header-icon">
          <BrainCircuit size={30} />
          <Sparkles className="ai-sparkle" size={15} />
        </div>
      </div>

      {/* SUMMARY CARDS */}
      {/* <div className="ai-grid">

        <div className="ai-card ai-income">
          <div className="ai-card-top">
            <div className="ai-icon">
              <TrendingUp size={23} />
            </div>
            <span> TOTAL INCOME</span>
          </div>

          <h2>₹{formatAmount(totalIncome)}</h2>
          <p>Money received</p>
          <div className="ai-card-decoration">
            <TrendingUp size={90} />
          </div>
        </div>

        <div className="ai-card ai-expense">
          <div className="ai-card-top">
            <div className="ai-icon">
              <TrendingDown size={23} />
            </div>
            <span>TOTAL EXPENSE</span>
          </div>

          <h2>₹{formatAmount(totalExpense)}</h2>
          <p>Money spent</p>
          <div className="ai-card-decoration">
            <TrendingDown size={90} />
          </div>
        </div>

        <div className="ai-card ai-savings">
          <div className="ai-card-top">
            <div className="ai-icon">
              <PiggyBank size={23} />
            </div>
            <span>NET SAVINGS</span>
          </div>

          <h2>₹{formatAmount(savings)}</h2>
          <p>Income minus expenses</p>
          <div className="ai-card-decoration">
            <Wallet size={90} />
          </div>
        </div>

      </div> */}

      {/* AI REPORT */}
      <div className="ai-report-card">

        <div className="ai-report-header">
          <div className="ai-report-title">
            <div className="ai-report-icon">
              <BrainCircuit size={24} />
            </div>

            <div>
              <h2>Groq AI Financial Report</h2>
              <p>Your personalized financial analysis</p>
            </div>
          </div>

          <div className="ai-report-actions">
            <span className="ai-powered">
              <span className="ai-status-dot"></span>
              AI POWERED
            </span>

            <button
              className="ai-refresh-btn"
              onClick={handleRefresh}
              disabled={loading || !transactions.length}
              title="Generate report again"
            >
              <RefreshCw
                size={16}
                className={loading ? "refresh-spinning" : ""}
              />
              Refresh
            </button>
          </div>
        </div>

        <div className="ai-report-body">

          {loading ? (
            <div className="ai-loading">
              <div className="ai-loading-icon">
                <BrainCircuit size={35} />
                <span className="loading-pulse"></span>
              </div>

              <h3>AI is analyzing your finances...</h3>
              <p>
                Reviewing your income, expenses and spending patterns.
              </p>

              <div className="ai-loading-bar">
                <span></span>
              </div>
            </div>
          ) : error ? (
            <div className="ai-error">
              <AlertCircle size={35} />
              <h3>Unable to generate report</h3>
              <p>{error}</p>

              <button onClick={handleRefresh}>
                <RefreshCw size={15} />
                Try Again
              </button>
            </div>
          ) : report ? (
            <div className="ai-report">
              <ReactMarkdown>{report}</ReactMarkdown>
            </div>
          ) : (
            <div className="ai-empty">
              <div className="ai-empty-icon">
                {transactions.length === 0 ? (
                  <FileText size={35} />
                ) : (
                  <Sparkles size={35} />
                )}
              </div>

              <h3>
                {transactions.length === 0
                  ? "No transaction data available"
                  : "Preparing your financial insights"}
              </h3>

              <p>
                {transactions.length === 0
                  ? "Add transactions to generate your personalized AI financial report."
                  : "Your AI report will appear here shortly."}
              </p>
            </div>
          )}

        </div>

        <div className="ai-report-footer">
          <Sparkles size={15} />
          <span>Insights generated using Groq AI</span>
        </div>

      </div>

    </div>
  );
}

export default AIInsights;
