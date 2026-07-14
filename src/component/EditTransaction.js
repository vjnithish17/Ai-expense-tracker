import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

function EditTransaction({ transactions, fetchtransactions }) {

  const { id } = useParams();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState({
    title: "",
    amount: "",
    type: "Expense",
    category: "",
    date: "",
    payment: "UPI",
    notes: "",
    receipt: "",
  });

  useEffect(() => {

    const existing = transactions.find(
      (item) => item.id === id
    );

    if (existing) {
      setTransaction(existing);
    }
  }, [id, transactions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction({
      ...transaction,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.put(`/transactions/${id}`, transaction);
    fetchtransactions();
    navigate("/transactions");
  };

  return (

    <div className="add-container">
      <h2>Edit Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={transaction.title}
          onChange={handleChange}
          placeholder="Title"
        />

        <input
          type="number"
          name="amount"
          value={transaction.amount}
          onChange={handleChange}
          placeholder="Amount"
        />

        <select
          name="type"
          value={transaction.type}
          onChange={handleChange}
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <input
          type="text"
          name="category"
          value={transaction.category}
          onChange={handleChange}
          placeholder="Category"
        />

        <input
          type="date"
          name="date"
          value={transaction.date}
          onChange={handleChange}
        />

        <button type="submit">
          Update Transaction
        </button>
      </form>
    </div>
  );

}

export default EditTransaction;
