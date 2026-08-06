import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./component/Navbar";
import Dashboard from "./component/Dashboard";
import TransactionList from "./component/TransactionList";
import AddTransaction from "./component/AddTransaction";
import EditTransaction from "./component/EditTransaction";
// import TransactionDetails from "./component/TransactionDetails";
import Analytics from "./component/Analytics";
import AIInsights from "./component/AIInsights";
import Login from "./component/Login";
// import ChatAssistant from "./component/ChatAssistant";
import NotFound from "./component/NotFound";
import Register from "./component/Register";
import { useEffect, useState } from "react";
import api from "./api/api";

import { Navigate } from "react-router-dom";

function App() {
  const [transactions, setTransactions] = useState([]);
  const location = useLocation();
  useEffect(() => {
    fetchtransactions();
  }, []);

  const fetchtransactions = async () => {
    try {
      const currentAdmin = localStorage.getItem("admin");
      const response = await api.get(`/transactions?owner=${currentAdmin}`);
      setTransactions(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const islogin = localStorage.getItem("islogin");

  return (
    <>
      {location.pathname !== "/" && location.pathname !== "/register" && (
          <Navbar />
        )}
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/Dashboard"
          element={
            islogin === "true" ? (
              <Dashboard transactions={transactions} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/transactions"
          element={
            islogin === "true" ? (
              <TransactionList
                transactions={transactions}
                setTransactions={setTransactions}
                fetchtransactions={fetchtransactions}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/add"
          element={
            islogin === "true" ? (
              <AddTransaction
                transactions={transactions}
                setTransactions={setTransactions}
                fetchtransactions={fetchtransactions}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/edit/:id"
          element={
            islogin === "true" ? (
              <EditTransaction
                transactions={transactions}
                setTransactions={setTransactions}
                fetchtransactions={fetchtransactions}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/analytics"
          element={
            islogin === "true" ? (
              <Analytics transactions={transactions} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/ai"
          element={
            islogin === "true" ? (
              <AIInsights transactions={transactions} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
