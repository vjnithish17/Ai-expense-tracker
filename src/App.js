import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar";
import Dashboard from "./component/Dashboard";
import TransactionList from "./component/TransactionList";
import AddTransaction from "./component/AddTransaction";
import EditTransaction from "./component/EditTransaction";
import TransactionDetails from "./component/TransactionDetails";
import Analytics from "./component/Analytics";
import AIInsights from "./component/AIInsights";
// import ChatAssistant from "./component/ChatAssistant";
import NotFound from "./component/NotFound";
import { useEffect, useState } from "react";
import api from "./api/api";

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchtransactions();
  }, []);

  const fetchtransactions = async () => {
    try {
      const response = await api.get("/transactions");
      setTransactions(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard transactions={transactions} />} />

        <Route
          path="/transactions"
          element={
            <TransactionList
              transactions={transactions}
              setTransactions={setTransactions}
              fetchtransactions={fetchtransactions}
            />
          }
        />

        <Route
          path="/add"
          element={
            <AddTransaction
              transactions={transactions}
              setTransactions={setTransactions}
              fetchtransactions={fetchtransactions}
            />
          }
        />

        <Route
          path="/edit/:id"
          element={
            <EditTransaction
              transactions={transactions}
              setTransactions={setTransactions}
              fetchtransactions={fetchtransactions}
            />
          }
        />

        <Route
          path="/transactions/:id"
          element={<TransactionDetails transactions={transactions} />}
        />

        <Route
          path="/analytics"
          element={<Analytics transactions={transactions} />}
        />

        <Route
          path="/ai"
          element={<AIInsights transactions={transactions} />}
        />

        {/* <Route
          path="/chat"
          element={<ChatAssistant transactions={transactions} />}
        /> */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
