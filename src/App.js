
import "./App.css";
import {
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom";

import Navbar from "./component/Navbar";
import Dashboard from "./component/Dashboard";
import TransactionList from "./component/TransactionList";
import AddTransaction from "./component/AddTransaction";
import EditTransaction from "./component/EditTransaction";
import Analytics from "./component/Analytics";
import AIInsights from "./component/AIInsights";
import Login from "./component/Login";
import NotFound from "./component/NotFound";
import Register from "./component/Register";

import { useEffect, useState, useCallback } from "react";
import api from "./api/api";

function App() {
  const [transactions, setTransactions] = useState([]);
  const location = useLocation();

  const islogin = localStorage.getItem("islogin");
  const currentAdmin = localStorage.getItem("admin");

  // Fetch only the logged-in user's transactions
  const fetchtransactions = useCallback(async () => {
    try {
      const loggedIn = localStorage.getItem("islogin");
      const admin = localStorage.getItem("admin");

      // No user logged in
      if (loggedIn !== "true" || !admin) {
        setTransactions([]);
        return;
      }

      // Clear previous data before fetching new user data
      setTransactions([]);

      const response = await api.get("/transactions", {
        params: {
          owner: admin
        }
      });

      setTransactions(response.data);
    } catch (err) {
      console.log("Fetch Transactions Error:", err.message);
      setTransactions([]);
    }
  }, []);

  // Refresh data when navigation changes
  useEffect(() => {
    fetchtransactions();
  }, [location.pathname, fetchtransactions]);

  return (
    <>
      {location.pathname !== "/" &&
        location.pathname !== "/register" && (
          <Navbar />
        )}

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/Dashboard"
          element={
            islogin === "true" && currentAdmin ? (
              <Dashboard transactions={transactions} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/transactions"
          element={
            islogin === "true" && currentAdmin ? (
              <TransactionList
                transactions={transactions}
                setTransactions={setTransactions}
                fetchtransactions={fetchtransactions}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/add"
          element={
            islogin === "true" && currentAdmin ? (
              <AddTransaction
                transactions={transactions}
                setTransactions={setTransactions}
                fetchtransactions={fetchtransactions}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/edit/:id"
          element={
            islogin === "true" && currentAdmin ? (
              <EditTransaction
                transactions={transactions}
                setTransactions={setTransactions}
                fetchtransactions={fetchtransactions}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/analytics"
          element={
            islogin === "true" && currentAdmin ? (
              <Analytics transactions={transactions} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/ai"
          element={
            islogin === "true" && currentAdmin ? (
              <AIInsights transactions={transactions} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
