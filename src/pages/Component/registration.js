import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { userRegister } from "../Redux/userduck";
function Registration() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const user_redux = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    username: yup.string().required("User Name is required"),

    email: yup
      .string()
      .email()
      .required("Email is required")
      .test("emailExist", "This email already exist", (value) => {
        for (const e in user_redux) {
          if (user_redux[e].email === value) {
            return false;
          } else {
            return true;
          }
        }
      }),

    password: yup.string().required("Password is required").min(3).max(6),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });
  // function submitHandle(e) {
  //   e.preventDefault();
  //   setFormErrors(validate(formValues));
  //   setIsSubmit(true);
  // }
  const onSubmit = async (data) => {
    if (data) {
      setFormValues(data);
      setIsSubmit(true);
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const { id } = useParams();
  useEffect(() => {
    console.log(isSubmit, "issubmit");
    if (isSubmit) {
      const data = user_redux;
      if (data !== null) {
        if (id) {
          for (const e in data) {
            if (parseInt(data[e].id) === parseInt(id)) {
              formValues["id"] = id;
              data[e] = formValues;
            }
          }
        } else {
          let previousId = data[data.length - 1].id;
          formValues["id"] = previousId + 1;
        }

        dispatch(userRegister(formValues));
      } else {
        formValues["id"] = 1;
        dispatch(userRegister([formValues]));
      }
      navigate("/login");
    }
    //eslint-disable-next-line
  }, [isSubmit]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="vh-100" style={{ "background-color": "#DBDBDB" }}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong">
                  <div className="card-body p-5 text-center">
                    <h3 className="mb-5">Registration</h3>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="typeEmailX-2">
                        Username
                      </label>
                      <input
                        type="text"
                        id="typeEmailX-2"
                        className="form-control form-control-lg"
                        name="username"
                        onChange={handleChange}
                        {...register("username")}
                      />
                      <div className="errors">{errors.username?.message}</div>
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="typeEmailX-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="typeEmailX-2"
                        className="form-control form-control-lg"
                        name="email"
                        onChange={handleChange}
                        {...register("email")}
                        // autoComplete="off"
                      />
                      <div className="errors">{errors.email?.message}</div>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="typePasswordX-2">
                        Password
                      </label>
                      <input
                        type="password"
                        id="typePasswordX-2"
                        className="form-control form-control-lg"
                        name="password"
                        onChange={handleChange}
                        {...register("password")}
                      />
                      <div className="errors">{errors.password?.message}</div>
                    </div>

                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      Register
                    </button>

                    <div>
                      <p className="mb-0">
                        Already have an account?{" "}
                        <Link to={"/login"}>Login</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
}
export default Registration;
