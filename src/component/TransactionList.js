
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Printer,
  ArrowDownLeft,
  ArrowUpRight,
  Eye,
  Pencil,
  Trash2,
  CalendarDays,
  Tag,
  Wallet,
  Filter,
} from "lucide-react";

import api from "../api/api";
import "../css/transactionslist.css";
import TransactionPopup from "../component/TransactionPopup";

function TransactionList({ transactions = [], fetchtransactions }) {

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const formatAmount = (amount) =>
    Number(amount || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!ok) return;

    try {
      await api.delete(`/transactions/${id}`);
      fetchtransactions();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Unable to delete transaction.");
    }
  };

  const filtered = transactions.filter((item) => {
    const searchMatch = (item.title || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const typeMatch =
      typeFilter === "All" || item.type === typeFilter;

    const categoryMatch =
      categoryFilter === "All" || item.category === categoryFilter;

    return searchMatch && typeMatch && categoryMatch;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="list-container">

        {/* Header */}
        <div className="transactions-header">

          <div>
            <p className="transactions-label">FINANCIAL MANAGEMENT</p>
            <h1>Transactions</h1>
            <p className="transactions-subtitle">
              Manage and monitor all your financial activities.
            </p>
          </div>

          <button className="report-btn" onClick={handlePrint}>
            <Printer size={17} />
            Print Report
          </button>

        </div>

        {/* Print Header */}
        <div className="print-report-heading">
          <h1>AI Expense Tracker</h1>
          <h2>Transaction Report</h2>
          <p>Generated on: {new Date().toLocaleString("en-IN")}</p>
          <p>Total Transactions: {filtered.length}</p>
        </div>

        {/* Transaction Content */}
        <div className="transaction-content">

          <div className="transaction-section-header">

            <div>
              <h2>All Transactions</h2>
              <p>View and manage your financial activities</p>
            </div>

            <span className="result-count">
              {filtered.length} Results
            </span>

          </div>

          {/* Filters */}
          <div className="filters">

            <div className="search-box">
              <Search size={18} />

              <input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="filter-select">
              <Filter size={16} />

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>

            <div className="filter-select">
              <Tag size={16} />

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Salary">Salary</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Health">Health</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
            </div>

          </div>

          {/* Transaction Cards */}
          <div className="transaction-card-grid">

            {filtered.length > 0 ? (

              filtered.map((item) => (

                <div className="transaction-item-card" key={item.id}>

                  {/* Card Top */}
                  <div className="transaction-card-top">

                    <div className={`transaction-main-icon ${item.type.toLowerCase()}`}>
                      {item.type === "Income" ? (
                        <ArrowDownLeft size={23} />
                      ) : (
                        <ArrowUpRight size={23} />
                      )}
                    </div>

                    <span className={`transaction-type-label ${item.type.toLowerCase()}`}>
                      {item.type}
                    </span>

                  </div>

                  {/* Transaction Details */}
                  <div className="transaction-card-info">

                    <h3>{item.title}</h3>

                    <div className="transaction-card-amount">
                      <span>
                        {item.type === "Income" ? "+" : "-"}₹
                      </span>
                      {formatAmount(item.amount)}
                    </div>

                  </div>

                  {/* Metadata */}
                  <div className="transaction-card-meta">

                    <div>
                      <Tag size={15} />
                      <span>{item.category || "Other"}</span>
                    </div>

                    <div>
                      <CalendarDays size={15} />
                      <span>{item.date}</span>
                    </div>

                  </div>

                  {/* Actions */}

<div className="transaction-card-actions">

  <button
    type="button"
    className="card-action-btn view-action"
    onClick={() => setSelectedTransaction(item)}
    title="View Transaction"
  >
    <Eye size={16} strokeWidth={2.5} />
    <span className="b">View</span>
  </button>

  <Link
    to={`/edit/${item.id}`}
    className="card-action-btn edit-action"
    title="Edit Transaction"
  >
    <Pencil size={16} strokeWidth={2.5} />
    <span className="g">Edit</span>
  </Link>

  <button
    type="button"
    className="card-action-btn delete-action"
    onClick={() => handleDelete(item.id)}
    title="Delete Transaction"
  >
    <Trash2 size={16} strokeWidth={2.5} />
    <span>Delete</span>
  </button>

</div>


                </div>

              ))

            ) : (

              <div className="transaction-empty">

                <div className="empty-icon">
                  <Wallet size={32} />
                </div>

                <h3>No Transactions Found</h3>

                <p>
                  No transactions match your search or filter.
                </p>

              </div>

            )}

          </div>

          {/* Footer */}
          <div className="transaction-card-footer">
            Showing <strong>{filtered.length}</strong> of{" "}
            <strong>{transactions.length}</strong> transactions
          </div>

        </div>

      </div>

      {/* Transaction Popup */}
      {selectedTransaction && (
        <TransactionPopup
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}

    </>
  );
}

export default TransactionList;
