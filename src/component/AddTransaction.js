import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../css/addtransaction.css";

function AddTransaction({ fetchtransactions }) {
   const navigate = useNavigate();

   const currentAdmin = localStorage.getItem("admin");

  const [transaction, setTransaction] = useState({
    title: "",
    amount: "",
    type: "Expense",
    category: "",
    date: "",
    payment: "UPI",
    notes: "",
    receipt: "",
    owner:currentAdmin
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !transaction.title ||
      !transaction.amount ||
      !transaction.category ||
      !transaction.date
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const newTransaction = {
      ...transaction,
      owner: currentAdmin,
    };
      await api.post("/transactions", newTransaction);
      fetchtransactions();
      alert("Transaction Added Successfully");
      navigate("/transactions");
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="add-container">
      <h2>Add Transaction</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={transaction.title}
          onChange={handleChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={transaction.amount}
          onChange={handleChange}
        />

        <select name="type" value={transaction.type} onChange={handleChange}>
          <option>Income</option>
          <option>Expense</option>
        </select>

        <select
          name="category"
          value={transaction.category}
          onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="Salary">Salary</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Health">Health</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="date"
          name="date"
          value={transaction.date}
          onChange={handleChange}
        />

        <select
          name="payment"
          value={transaction.payment}
          onChange={handleChange}
        >
          <option value="upi">UPI</option>
          <option value="Cash">Cash</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>

        <textarea
          name="notes"
          placeholder="Notes"
          value={transaction.notes}
          onChange={handleChange}
        />

        <input
          type="text"
          name="receipt"
          placeholder="Receipt Image URL"
          value={transaction.receipt}
          onChange={handleChange}
        />

        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default AddTransaction;
