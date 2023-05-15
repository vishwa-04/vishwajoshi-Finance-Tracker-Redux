import { useParams } from "react-router-dom";
import "../user/showTable.css";

import { useSelector } from "react-redux";

const ViewTransaction = () => {
  const { id } = useParams();
  const transaction_redux = useSelector((state) =>
    state.transaction.find((ele) => ele.id == id)
  );

  console.log(id, "iddd");
  const login = JSON.parse(localStorage.getItem("login"));

  return (
    <>
      {[transaction_redux].map((data, index) => {
        console.log(transaction_redux[data], "data");
        return (
          <div className="container">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Details</h5>

                <div>
                  <label>Trans Date:</label>
                  <span class="card-text">{data.transDate}</span>
                </div>
                <br />

                <div>
                  <label>Month:</label>
                  <span class="card-text">{data.month}</span>
                </div>
                <br />
                <div>
                  <label>Trans Type:</label>
                  <span class="card-text">{data.transType}</span>
                </div>
                <br />
                <div>
                  <label>From Account:</label>
                  <span class="card-text">{data.frmAcc}</span>
                </div>
                <br />
                <div>
                  <label>To Account:</label>
                  <span class="card-text">{data.toAcc}</span>
                </div>
                <br />
                <div>
                  <label>Amount:</label>
                  <span class="card-text">{data.amount}</span>
                </div>
                <br />
                <div>
                  <label>Reciept:</label>
                  <img
                    src={data.filename}
                    alt="img"
                    height="70px"
                    width="70px"
                  ></img>
                </div>
                <br />
                <div>
                  <label>Notes:</label>
                  <span class="card-text">{data.notes}</span>
                </div>
                <br />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default ViewTransaction;
