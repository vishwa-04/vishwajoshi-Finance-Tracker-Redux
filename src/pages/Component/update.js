import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FinanceTracker from "../user";
// import { updateTransaction } from "../Redux/Transactionduck";

export default function UpdateTransaction() {
  const { id } = useParams();
  const transaction_redux = useSelector((state) =>
    state.transaction.find((ele) => ele.id == id)
  );
  const login = JSON.parse(localStorage.getItem("login"));
  return (
    <div>
      {
        <FinanceTracker
          id={id}
          updateFormValue={transaction_redux}
          isUpdate={true}
        />
      }
    </div>
  );
}
