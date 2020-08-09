import React, { useState, useCallback, useEffect } from "react";

import TransactionTable from "./TransactionTable";
import AddTransactionModal from "./AddTransactionModal";

export default () => {
  const [visible, setVisibility] = useState(false);
  const [data, setData] = useState([]);
  console.log("####data", data);

  const toggleModal = useCallback(() => {
    setVisibility(!visible);
  }, [setVisibility, visible]);

  const getData = useCallback(() => {
    let body = {
      params: {
        table: "transaction"
      }
    };
    fetch("http://127.0.0.1:5000/find", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(({ result }) => setData(result));
  }, []);

  const onTransactionAdd = useCallback(() => {
    getData();
    toggleModal();
  }, [getData, toggleModal]);

  useEffect(getData, []);

  return (
    <div className="screens-container">
      <TransactionTable data={data} toggleModal={toggleModal} />
      <AddTransactionModal visible={visible} toggleModal={toggleModal} onTransactionAdd={onTransactionAdd} />
    </div>
  );
};
