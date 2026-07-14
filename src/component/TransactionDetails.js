import { useParams, Link } from "react-router-dom";

import "../css/transactionsdetail.css";

function TransactionDetails({ transactions }) {

  const { id } = useParams();

  const transaction = transactions.find(
    (item) => item.id == id
  );

  if (!transaction) {
    return <h2>Transaction Not Found</h2>;
  }

  return (

    <div className="details-container">
      <div className="detail-card">

        <h2>Transaction Details</h2>
        <p><strong>Title:</strong> {transaction.title}</p>
        <p><strong>Amount:</strong> ₹{transaction.amount}</p>
        <p><strong>Type:</strong> {transaction.type}</p>
        <p><strong>Category:</strong> {transaction.category}</p>
        <p><strong>Date:</strong> {transaction.date}</p>
        <p><strong>Payment:</strong> {transaction.payment}</p>
        <p><strong>Notes:</strong> {transaction.notes}</p>

        {transaction.receipt && (
          <div className="receipt">
            <strong>Receipt:</strong>
            <img
              src={transaction.receipt}
              alt="Receipt"
            />
          </div>
        )}

        <Link to="/transactions" className="back-btn">
          Back
        </Link>

      </div>

    </div>

  );

}

export default TransactionDetails;

