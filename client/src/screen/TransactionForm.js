import React, { useCallback } from "react";

const Form = ({ formData, setFormData }) => {
  const onInput = useCallback(
    e => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    },
    [setFormData, formData]
  );
  const onSelect = useCallback(
    e => {
      const { value } = e.target;
      setFormData({ ...formData, card: value });
    },
    [setFormData, formData]
  );
  return (
    <>
      <div className="form-item">
        <label for="type">Transaction Type</label>
        <select name="transactionType" id="type" onChange={onSelect}>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
      </div>
      <div className="form-item">
        <label for="amount">Amount</label>
        <input
          onChange={onInput}
          value={formData.amount}
          type="number"
          id="amount"
          name="amount"
          style={{ "border-width": "0px 0px 1px", marginBottom: 10 }}
        />
      </div>
      <div className="form-item">
        <label for="description">Description</label>
        <textarea
          onChange={onInput}
          value={formData.description}
          type="text"
          id="description"
          name="description"
          multiple
          style={{ "border-width": "0px 0px 1px", marginBottom: 10 }}
        />
      </div>
    </>
  );
};

export default Form;
