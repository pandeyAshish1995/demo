import React from "react";

let runningBallance = 0;

const formatDate = date => {
  const dateObject = new Date(date);
  return `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
};

const TransactionTable = props => {
  let { data = [], toggleModal } = props;
  // let a = { date: "", description: "hhjljlkhhhhhhhhhhhhhhh", credit: "1234", debit: "ghjj", runningBalance: "12344" };
  // data = [a, a, a, a, a];

  return (
    <table>
      <tr>
        <td className="table-title">Office Transactions</td>
        <td></td>
        <td></td>
        <td></td>
        <button className="action-cell" onClick={toggleModal}>
          + Add Transaction
        </button>
      </tr>
      <tr className="empty-row">
        <td />
        <td />
        <td />
        <td />
        <td />
      </tr>
      <tr>
        <th>Date</th>
        <th>Description</th>
        <th>Credit</th>
        <th>Debit</th>
        <th>Running Balance</th>
      </tr>
      {data.map(value => (
        <TableRow data={value} />
      ))}
    </table>
  );
};

const TableRow = ({ data }) => {
  const credit = data.card === "credit" ? data.amount : "-";
  const debit = data.card === "debit" ? data.amount : "-";
  let ballance = runningBallance;
  if (data.card === "credit") ballance += parseInt(data.amount, 10);
  else ballance -= parseInt(data.amount, 10);
  runningBallance = ballance;
  return (
    <tr>
      <td>{data?.date ? formatDate(data.date) : "-"}</td>
      <td>{data?.description || "-"}</td>
      <td>{credit}</td>
      <td>{debit}</td>
      <td>{ballance || "0"}</td>
    </tr>
  );
};

export default TransactionTable;
