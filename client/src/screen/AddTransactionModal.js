import React, { useState, useCallback } from "react";

import Form from "./TransactionForm";

const AddTransactionModal = props => {
  const { visible, toggleModal, onTransactionAdd } = props;
  const [formData, setFormData] = useState({ card: "credit" });

  const submit = useCallback(
    e => {
      let { amount, description, card } = formData;
      console.log("....", formData);

      if (amount && description && card) {
        let body = {
          params: {
            table: "transaction",
            data: {...formData, date: Date.now()}
          }
        };
        fetch("http://127.0.0.1:5000/insert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        })
          .then(response => response.json())
          .then(onTransactionAdd);
      }

      return null;
    },
    [formData]
  );
  if (visible)
    return (
      <div className="modal-backdrop">
        <div className="modal">
          <div className="modal-header">
            New Transaction
            <button className="button-close" onClick={toggleModal}>
              x
            </button>
          </div>
          <div className="modal-body">
            <Form formData={formData} setFormData={setFormData} />
          </div>
          <div className="modal-footer">
            <button className="button-save" onClick={submit}>
              SAVE
            </button>
            <button className="button-cancel" onClick={toggleModal}>
              CANCEL
            </button>
          </div>
        </div>
      </div>
    );
  return null;
};

export default AddTransactionModal;
