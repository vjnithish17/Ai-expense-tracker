import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import "../css/transactionslist.css";

function TransactionList({ transactions, fetchtransactions }) {

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");


  const handleDelete = async (id) => {
    const ok = window.confirm("Delete transaction?");
    if (!ok) return;
    await api.delete(`/transactions/${id}`);
    fetchtransactions();
  };

  const filtered = transactions.filter((item) => {

    const searchMatch =
      item.title.toLowerCase().includes(search.toLowerCase());

    const typeMatch =
      typeFilter === "All" || item.type === typeFilter;

    const categoryMatch =
      categoryFilter === "All" || item.category === categoryFilter;

    return searchMatch && typeMatch && categoryMatch;

  });

  return (

    <div className="list-container">

      <h2>Transactions</h2>

      <div className="filters">

        <input

          type="text"

          placeholder="Search Title"

          value={search}

          onChange={(e) => setSearch(e.target.value)}

        />

        <select

          value={typeFilter}

          onChange={(e) => setTypeFilter(e.target.value)}

        >

          <option value="All">All</option>

          <option value="Income">Income</option>

          <option value="Expense">Expense</option>

        </select>

        <select

          value={categoryFilter}

          onChange={(e) => setCategoryFilter(e.target.value)}

        >

          <option value="All">All</option>
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
<div className="table-wrapper">
      <table >

        <thead>

          <tr>

            <th>Title</th>

            <th>Amount</th>

            <th>Type</th>

            <th>Category</th>

            <th>Date</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>
          {filtered.length >0 ? (
          filtered.map((item) => (

            <tr key={item.id}>
              <td>{item.title}</td>
              <td>₹{item.amount}</td>
              <td>{item.type}</td>
              <td>{item.category}</td>
              <td>{item.date}</td>
              <td className="actions">
                <Link to={`/transactions/${item.id}`} className="view-btn">
                  View
                </Link>
                <Link to={`/edit/${item.id}`} className="edit-btn">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>))
            ):(
                <tr>
                <td className="not" colSpan="6">
                  Not Found
                </td>
              </tr>
            )}

        </tbody>
      </table>
      </div>
    </div>
  );

}

export default TransactionList;
