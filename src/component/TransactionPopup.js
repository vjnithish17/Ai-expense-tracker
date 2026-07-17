import "../css/transactionpopup.css";

function TransactionPopup({ transaction, onClose }) {
  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <button className="close-btn" onClick={onClose}>✖</button>

        <h2>Transaction Details</h2>

        <p><strong>Title:</strong> {transaction.title}</p>
        <p><strong>Amount:</strong> ₹{transaction.amount}</p>
        <p><strong>Type:</strong> {transaction.type}</p>
        <p><strong>Category:</strong> {transaction.category}</p>
        <p><strong>Date:</strong> {transaction.date}</p>
        <p><strong>Payment:</strong> {transaction.payment}</p>
        <p><strong>Notes:</strong> {transaction.notes}</p>

        {transaction.receipt && (
          <img
            src={transaction.receipt}
            alt="Receipt"
            className="popup-img"
          />
        )}
      </div>
    </div>
  );
}

export default TransactionPopup;
