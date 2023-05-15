import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../user/showTable.css";
import { useTransContext } from "../Contexts/formValuesContext";
import { Transaction } from "./transactiontable";

const months = [
  "January 2023",
  "February 2023",
  "March 2023",
  "April 2023",
  "May 2023",
  "June 2023",
  "July 2023",
  "August 2023",
  "September 2023",
  "October 2023",
  "November 2023",
  "December 2023",
];
const ShowTable = () => {
  const { TransactionData, setTransactionData } = useTransContext();
  const [data, setData] = useState(TransactionData);
  const [groupData, setGroupData] = useState([]);
  const [getData, setgetData] = useState(TransactionData);
  const navigate = useNavigate();

  useEffect(() => {
    setgetData(TransactionData);
  }, [TransactionData]);

  const [groupValue, setGroupValue] = useState("");
  const [isGrouped, setIsGrouped] = useState(false);

  useEffect(() => {
    if (isGrouped === true) {
      handleChange(groupValue);
      console.log(isGrouped, "this is group value of useeffect");
    }
  }, [getData]);

  function handleChange(e) {
    let storeResult = {};
    let array = [...getData];
    setIsGrouped(true);
    if (e.target) {
      let Groupvalue = e.target.value;
      setGroupValue(Groupvalue);
      if (Groupvalue !== "") {
        array.forEach((item) => {
          let result = item[Groupvalue];
          storeResult[result] = storeResult[result] ?? [];
          storeResult[result].push(item);
        });
        setGroupData(storeResult);
      } else {
        setIsGrouped(false);
        setGroupData([]);
      }
    } else {
      if (e) {
        array.forEach((item) => {
          let result = item[e];
          storeResult[result] = storeResult[result] ?? [];
          storeResult[result].push(item);
        });
        setGroupData(storeResult);
      } else {
        setIsGrouped(false);
        setGroupData([]);
      }
    }
  }
  function handleLogout() {
    localStorage.removeItem("login");
    navigate("/login");
  }

  debugger;
  console.log(getData, "LsxLJX>>>>>>>>");
  return (
    <>
      <div>
        <input type="button" onClick={handleLogout} value="Logout" />
      </div>

      <>
        {getData ? (
          <>
            <tr>
              <td>
                <label>Transaction Type</label>
              </td>
              <td>
                <select
                  id="transactionType"
                  name="transType"
                  onChange={handleChange}
                >
                  <option value="groupby">--Group By--</option>
                  <option value="none">None</option>
                  <option value="month">Month Year</option>
                  <option value="transType">Transaction Type</option>
                  <option value="frmAcc">From Account</option>
                  <option value="toAcc">To Account</option>
                </select>
              </td>

              {/* eslint-disable-next-line */}
            </tr>
            <Transaction getData={getData} months={months}></Transaction>

            {groupData.length !== 0 &&
              Object.keys(groupData).map(
                (data) =>
                  data !== "undefined" && (
                    <>
                      <h2>{data}</h2>

                      <>
                        <Transaction
                          getData={groupData[data]}
                          months={months}
                        ></Transaction>
                      </>
                    </>
                  )
              )}
          </>
        ) : (
          <span>No data found</span>
        )}
      </>

      <Link to={"create"} className="btn btn-secondary">
        Create Transaction
      </Link>
    </>
  );
};
export default ShowTable;
