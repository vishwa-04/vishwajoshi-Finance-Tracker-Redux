import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTransContext } from "../Contexts/formValuesContext";
import "./css/style.css";

function FinanceTracker({ updateFormValue, isUpdate, index }) {
  // console.log(updateFormValue,"updateformValue");
  let initialValues;
  updateFormValue
    ? (initialValues = {
        transDate: updateFormValue.transDate,
        month: updateFormValue.month,
        transType: updateFormValue.transType,
        frmAcc: updateFormValue.frmAcc,
        toAcc: updateFormValue.toAcc,
        amount: updateFormValue.amount,
        filename: updateFormValue.filename,
        notes: updateFormValue.notes,
      })
    : (initialValues = {
        transDate: "",
        month: "",
        transType: "",
        frmAcc: "",
        toAcc: "",
        amount: "",
        filename: "",
        notes: "",
      });

  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);

  const { TransactionData, setTransactionData } = useTransContext();
  console.log(TransactionData, "this is context of create form");

  const validationSchema = yup.object().shape({
    transDate: yup.string().required("Date is a required field"),

    month: yup.string().required("Month is a required field"),

    transType: yup.string().required("Transaction Type is a required field"),

    frmAcc: yup
      .string()
      .notOneOf([yup.ref("toAcc"), null], "From and to account cannot be same")
      .required("From Account is a required field"),

    toAcc: yup
      .string()
      .notOneOf([yup.ref("frmAcc"), null], "From and to account cannot be same")
      .required("To Account is a required field"),

    amount: yup
      .number()
      .required()
      .typeError("Amount is required")
      .min(1, "Amount should be greater than 0"),

    filename: yup
      .mixed()
      .test("required", "Please select a file", (value) => {
        return value && value.length;
      })
      .test("size", "File is too big", (value) => {
        if (typeof value === "string") {
          return true;
        } else {
          return value[0].size <= 1024 * 1024 * 1;
        }
      }),

    notes: yup
      .string()
      .required()
      .max(250, "Notes cannot be greater than 250 characters"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  const convert2base64 = async (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    await new Promise((resolve) => (reader.onload = () => resolve()));
    return reader.result;
  };

  const onSubmit = async (data) => {
    if (data) {
      if (data.filename.length > 0) {
        if (typeof data.filename !== "string") {
          let imagePath = await convert2base64(data.filename[0]);
          data.filename = imagePath;
        }
        setFormValues(data);
        setIsSubmit(true);
      }
    }
  };
  console.log(formValues, "formVAlues");

  const { id } = useParams();
  useEffect(() => {
    if (isSubmit) {
      const login = JSON.parse(localStorage.getItem("login"));
      let data = TransactionData;
      console.log(data, "this is data");
      if (data !== null) {
        // const data = JSON.parse(localStorage.getItem(items));

        if (id) {
          for (const e in data) {
            if (parseInt(data[e].id) === parseInt(id)) {
              formValues["id"] = parseInt(id);
              data[e] = formValues;
            }
            console.log(e, "this is key");
          }
        } else {
          let previousId = data[data.length - 1].id;
          formValues["id"] = previousId + 1;
          data.push(formValues);
        }
        setTransactionData(data);
        // localStorage.setItem(items, JSON.stringify(data));
      } else {
        formValues["id"] = 1;
        setTransactionData([formValues]);
        console.log("this is form values", formValues);
        // localStorage.setItem(items, JSON.stringify([formValues]));
      }
      navigate("/showTable");
    }
    //eslint-disable-next-line
  }, [isSubmit]);

  const handelRemoveImage = () => {
    setFormValues({ ...formValues, filename: "" });
    setValue("filename", "");
  };

  const date = new Date();
  let year = date.getFullYear();

  return (
    <div className="App">
      {/* {console.table(formValues)} */}
      <div className="container">
        <h1>Finance Tracker</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form-control">
          <div className="container">
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>Transaction Date :</label>
                  </td>
                  <td>
                    <input
                      type="date"
                      name="transDate"
                      // value={formValues.transDate}

                      {...register("transDate")}
                    ></input>
                    <tr>
                      <td>
                        <div className="errors">
                          {errors.transDate?.message}
                        </div>
                      </td>
                    </tr>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Month Year</label>
                  </td>
                  <td>
                    <select
                      id="getmonth"
                      name="month"
                      // value={formValues.month}
                      {...register("month")}
                    >
                      <option value="">--Select Month--</option>
                      <option value={`Janaury ${year}`}>Janaury {year}</option>
                      <option value={`February ${year}`}>
                        February {year}
                      </option>
                      <option value={`March ${year}`}>March {year}</option>
                      <option value={`April ${year}`}>April {year}</option>
                      <option value={`May ${year}`}>May {year}</option>
                      <option value={`June ${year}`}>June {year}</option>
                      <option value={`July ${year}`}>July {year}</option>
                      <option value={`August ${year}`}>August {year}</option>
                      <option value={`September ${year}`}>
                        September {year}
                      </option>
                      <option value={`October ${year}`}>October {year}</option>
                      <option value={`November ${year}`}>
                        November {year}
                      </option>
                      <option value={`December ${year}`}>
                        December {year}
                      </option>
                    </select>
                    <div className="errors">{errors.month?.message}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Transaction Type</label>
                  </td>
                  <td>
                    <select
                      id="transactionType"
                      name="transType"
                      // value={formValues.transType}
                      {...register("transType")}
                    >
                      <option hidden disabled value="" selected>
                        --Select Transaction Type--
                      </option>
                      <option value="Home">Home</option>
                      <option value="Personal Expense">Personal Expense</option>
                      <option value="Income">Income</option>
                    </select>
                    <div className="errors">{errors.transType?.message}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>From Account</label>
                  </td>
                  <td>
                    <select
                      id="frmAcc"
                      name="frmAcc"
                      // value={formValues.frmAcc}
                      {...register("frmAcc")}
                    >
                      <option hidden disabled value="" selected>
                        --Select From Account--
                      </option>
                      <option value="Personal Account">Personal Account</option>
                      <option value="Real Living">Real Living</option>
                      <option value="My Dream House">My Dream House</option>
                      <option value="Full Circle">Full Circle</option>
                      <option value="Core Realtors">Core Realtors</option>
                      <option value="Big Block">Big Block</option>
                    </select>
                    <div className="errors">{errors.frmAcc?.message}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>To Account</label>
                  </td>
                  <td>
                    <select
                      id="toAcc"
                      name="toAcc"
                      // value={formValues.toAcc}
                      {...register("toAcc")}
                    >
                      <option hidden disabled value="" selected>
                        --Select To Account--
                      </option>
                      <option value="Personal Account">Personal Account</option>
                      <option value="Real Living">Real Living</option>
                      <option value="My Dream House">My Dream House</option>
                      <option value="Full Circle">Full Circle</option>
                      <option value="Core Realtors">Core Realtors</option>
                      <option value="Big Block">Big Block</option>
                    </select>
                    <div className="errors">{errors.toAcc?.message}</div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Amount</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="amount"
                      // value={formValues.amount}

                      {...register("amount")}
                    ></input>
                    <div className="errors">{errors.amount?.message}</div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label>Receipt</label>
                  </td>
                  <td>
                    {formValues.filename ? (
                      <>
                        <img
                          style={{ width: "200px" }}
                          alt="img"
                          src={formValues.filename}
                        />
                        <input
                          type="button"
                          value="remove"
                          onClick={() => handelRemoveImage()}
                        />
                      </>
                    ) : (
                      <input
                        type="file"
                        id="myFile"
                        // value={formValues.filename}
                        {...register("filename")}
                      />
                    )}
                  </td>
                  <div className="errors">{errors.filename?.message}</div>
                </tr>
                <tr>
                  <td>
                    <label>Notes</label>
                  </td>
                  <td>
                    <textarea
                      rows="5"
                      cols="20"
                      name="notes"
                      // value={formValues.notes}

                      {...register("notes")}
                    ></textarea>
                    <div className="errors">{errors.notes?.message}</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-primary"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
        <Link to={"/showTable"} className="btn btn-secondary">
          View Transaction
        </Link>
      </div>
    </div>
  );
}

export default FinanceTracker;
