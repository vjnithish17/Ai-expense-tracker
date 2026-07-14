import "../css/dashboard.css";

function Dashboard({ transactions }) {

  const totalIncome = transactions.filter((item) => item.type === "Income")
    .reduce((total, item) => total + Number(item.amount), 0);
    // console.log(totalIncome);


  const totalExpense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((total, item) => total + Number(item.amount), 0);

  const totalBalance = totalIncome - totalExpense;

  const savings = totalBalance;

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="dashboard">

      <h1>Dashboard</h1>

      <div className="cards">

        <div className="card balance">
          <h2>Total Balance</h2>
          <h1>₹{totalBalance}</h1>
        </div>

        <div className="card income">
          <h2>Total Income</h2>
          <h1>₹{totalIncome}</h1>
        </div>

        <div className="card expense">
          <h2>Total Expense</h2>
          <h1>₹{totalExpense}</h1>
        </div>

        <div className="card savings">
          <h2>Savings</h2>
          <h1>₹{savings}</h1>
        </div>

      </div>

      <div className="recent">

        <h2>Recent Transactions</h2>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {recentTransactions.length > 0 ? (

                recentTransactions.map((item) => (

                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>₹{item.amount}</td>
                    <td>{item.type}</td>
                    <td>{item.date}</td>
                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="4">No Transactions Found</td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
