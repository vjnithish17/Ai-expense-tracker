import { useEffect, useState } from "react";
import "../css/allinsights.css";
import { generateReport } from "../api/Groq";
import ReactMarkdown from "react-markdown";

function AIInsights({ transactions }) {
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);

   useEffect(() => {
    const runAI = async () => {
      try {
        setLoading(true);
        const aiText = await generateReport(transactions);
        setReport(aiText);

      } catch (error) {
        setReport("Groq AI Error");
         console.log(error.response?.data);
  setReport("Groq AI Error: " + (error.response?.data?.error?.message || error.message));
      } finally {
        setLoading(false);
      }

    };
    if (transactions.length > 0) runAI();
  }, [transactions]);


 const totalIncome = transactions
    .filter(item => item.type === "Income")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const totalExpense = transactions
    .filter(item => item.type === "Expense")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const savings = totalIncome - totalExpense;



  return (

    <div className="ai-container">

      <h1>AI Financial Insights</h1>

      <div className="ai-grid">

        <div className="ai-card">

          <h2>Total Income</h2>

          <p>₹{totalIncome}</p>

        </div>

        <div className="ai-card">

          <h2>Total Expense</h2>

          <p>₹{totalExpense}</p>

        </div>

        <div className="ai-card">

          <h2>Savings</h2>

          <p>₹{savings}</p>

        </div>

        <div className="ai-card full-width">

          <h2>Groq AI Report</h2>

          <div className="ai-report">

            {loading ? (

              <p className="ai">AI is analyzing your expenses...</p>

            ) : (

              <ReactMarkdown>{report}</ReactMarkdown>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}

export default AIInsights;
